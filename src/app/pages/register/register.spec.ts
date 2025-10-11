import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterPage } from './register';
import { AuthService } from '../../core/services/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RegisterPage,
        HttpClientTestingModule,
      ],
      providers: [
        provideAnimations(),
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
        AuthService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should require email', () => {
    const email = component.signupForm.get('email');
    email?.setValue('');
    expect(email?.hasError('required')).toBeTruthy();
  });

  it('should have a valid form when email is filled correctly', () => {
    component.signupForm.setValue({
      email: 'test@example.com',
    });
    expect(component.signupForm.valid).toBeTruthy();
  });

  it('should set the role', () => {
    component.setRole('hiring-manager');
    expect(component.role).toBe('hiring-manager');
  });

  it('should call authService.initiateRegistration on submit with valid form', () => {
    spyOn(authService, 'initiateRegistration').and.returnValue(of({ message: 'success' }));
    component.signupForm.setValue({ email: 'test@example.com' });
    component.onSubmit();
    expect(authService.initiateRegistration).toHaveBeenCalledWith('test@example.com', 'CANDIDATE');
  });

  it('should set registrationState to "sent" on successful registration', () => {
    spyOn(authService, 'initiateRegistration').and.returnValue(of({ message: 'success' }));
    component.signupForm.setValue({ email: 'test@example.com' });
    component.onSubmit();
    expect(component.registrationState).toBe('sent');
  });

  it('should set registrationState to "error" on failed registration', () => {
    spyOn(authService, 'initiateRegistration').and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'error');
    component.signupForm.setValue({ email: 'test@example.com' });
    component.onSubmit();
    expect(component.registrationState).toBe('error');
    expect(console.error).toHaveBeenCalled();
  });

  it('should reset the state', () => {
    component.resetState();
    expect(component.registrationState).toBe('input');
    expect(component.errorMessage).toBeNull();
    expect(component.signupForm.value.email).toBeNull();
    expect(component.role).toBe('talent');
  });
});
