import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { AuthenticationControllerService } from '../../api/services/authentication-controller.service';
import { RegistrationRequest } from '../../api/models/registration-request';
import { CandidateRegistrationDto } from '../../api/models/candidate-registration-dto';
import { HiringManagerRegistrationDto } from '../../api/models/hiring-manager-registration-dto';
import { Login$Params } from '../../api/fn/authentication-controller/login';
import { ValidateRegistrationToken$Params } from '../../api/fn/authentication-controller/validate-registration-token';
import { CompleteCandiateRegistration$Params } from '../../api/fn/authentication-controller/complete-candiate-registration';
import { CompleteHiringManagerRegistration$Params } from '../../api/fn/authentication-controller/complete-hiring-manager-registration';
import { Verify$Params } from '../../api/fn/authentication-controller/verify';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'jwt_token';

  constructor(
    private http: HttpClient,
    private authenticationControllerService: AuthenticationControllerService
  ) {}

  initiateRegistration(email: string, role: 'CANDIDATE' | 'HIRING_MANAGER'): Observable<{
    [key: string]: string;
  }> {
    const body: RegistrationRequest = { email, role };
    return this.authenticationControllerService.initiateRegistration({ body });
  }

  validateRegistrationToken(token: string): Observable<{
    [key: string]: any;
  }> {
    const params: ValidateRegistrationToken$Params = { token };
    return this.authenticationControllerService.validateRegistrationToken(params).pipe(
      switchMap(response => {
        return new Observable<{[key: string]: any;}>(observer => {
          (response as Blob).text().then(text => {
            try {
              const json = JSON.parse(text) as { [key: string]: any; }; // Explicit cast here
              observer.next(json);
              observer.complete();
            } catch (e) {
              observer.error(e);
            }
          }).catch(e => observer.error(e));
        });
      })
    );
  }

  completeCandidateRegistration(token: string, body: CandidateRegistrationDto): Observable<{
    [key: string]: string;
  }> {
    const params: CompleteCandiateRegistration$Params = { token, body };
    return this.authenticationControllerService.completeCandiateRegistration(params).pipe(
      tap(response => {
        if (response['token']) {
          this.setToken(response['token']);
        }
      })
    );
  }

  completeHiringManagerRegistration(token: string, body: HiringManagerRegistrationDto): Observable<{
    [key: string]: string;
  }> {
    const params: CompleteHiringManagerRegistration$Params = { token, body };
    return this.authenticationControllerService.completeHiringManagerRegistration(params).pipe(
      tap(response => {
        if (response['token']) {
          this.setToken(response['token']);
        }
      })
    );
  }

  login(email: string): Observable<string> {
    const params: Login$Params = { body: { email } };
    return this.authenticationControllerService.login(params);
  }

  verify(token: string): Observable<{
    [key: string]: string;
  }> {
    const params: Verify$Params = { token };
    return this.authenticationControllerService.verify(params).pipe(
      tap(response => {
        if (response['token']) {
          this.setToken(response['token']);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.removeToken();
    // Optionally, navigate to login page or home page
  }
}