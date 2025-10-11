import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProfileCreate } from './profile-create';
import { AuthService } from '../../core/services/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { JwtDecoderService } from '../../core/services/jwt-decoder.service';

describe('ProfileCreate', () => {
  let component: ProfileCreate;
  let fixture: ComponentFixture<ProfileCreate>;
  let authService: AuthService;
  let router: Router;
  let route: ActivatedRoute;
  let jwtDecoderService: JwtDecoderService;
  let jwtDecodeSpy: jasmine.Spy;
  let routeGetSpy: jasmine.Spy;

  const candidateToken = 'candidate-token';
  const hiringManagerToken = 'hm-token';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ProfileCreate,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: jasmine.createSpy('get'),
              },
            },
          },
        },
        {
          provide: JwtDecoderService,
          useValue: {
            decode: jasmine.createSpy('decode'),
          },
        },
        AuthService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileCreate);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    jwtDecoderService = TestBed.inject(JwtDecoderService);

    routeGetSpy = route.snapshot.queryParamMap.get as jasmine.Spy;
    jwtDecodeSpy = jwtDecoderService.decode as jasmine.Spy;
  });

  describe('Initialization and Token Handling', () => {
    it('should set error message if token is missing', () => {
      routeGetSpy.and.returnValue(null);
      component.ngOnInit();
      expect(component.errorMessage).toBe('Registration token missing.');
    });

    it('should set error message if token is invalid', () => {
      routeGetSpy.and.returnValue('invalid-token');
      jwtDecodeSpy.and.throwError('Invalid token');
      component.ngOnInit();
      expect(component.errorMessage).toBe('Invalid registration token.');
    });

    it('should initialize candidate form for CANDIDATE role', () => {
      routeGetSpy.and.returnValue(candidateToken);
      jwtDecodeSpy.and.returnValue({ role: 'CANDIDATE' });
      component.ngOnInit();
      expect(component.userRole).toBe('CANDIDATE');
      expect(component.profileForm.get('firstName')).toBeDefined();
      expect(component.profileForm.get('companyName')).toBeNull();
    });

    it('should initialize hiring manager form for HIRING_MANAGER role', () => {
      routeGetSpy.and.returnValue(hiringManagerToken);
      jwtDecodeSpy.and.returnValue({ role: 'HIRING_MANAGER' });
      component.ngOnInit();
      expect(component.userRole).toBe('HIRING_MANAGER');
      expect(component.profileForm.get('companyName')).toBeDefined();
      expect(component.profileForm.get('firstName')).toBeNull();
    });
  });

  describe('Form Validation', () => {
    beforeEach(() => {
      routeGetSpy.and.returnValue(candidateToken);
      jwtDecodeSpy.and.returnValue({ role: 'CANDIDATE' });
      component.ngOnInit();
    });

    it('candidate form should be invalid when empty', () => {
      expect(component.profileForm.valid).toBeFalsy();
    });

    it('candidate form should be valid when filled correctly', () => {
      component.profileForm.setValue({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        gender: 'Male',
        race: 'Human',
        disability: 'None',
        contactNumber: '1234567890',
        alternateContactNumber: '',
      });
      expect(component.profileForm.valid).toBeTruthy();
    });

    it('hiring manager form should be invalid when empty', () => {
      jwtDecodeSpy.and.returnValue({ role: 'HIRING_MANAGER' });
      component.ngOnInit();
      expect(component.profileForm.valid).toBeFalsy();
    });

    it('hiring manager form should be valid when filled correctly', () => {
      jwtDecodeSpy.and.returnValue({ role: 'HIRING_MANAGER' });
      component.ngOnInit();
      component.profileForm.setValue({
        username: 'hmuser',
        companyName: 'Test Inc.',
        industry: 'IT',
        contactPerson: 'HR',
        contactNumber: '0987654321',
      });
      expect(component.profileForm.valid).toBeTruthy();
    });
  });

  describe('Form Submission', () => {
    it('should set error message if form is invalid', () => {
      routeGetSpy.and.returnValue(candidateToken);
      jwtDecodeSpy.and.returnValue({ role: 'CANDIDATE' });
      component.ngOnInit();
      component.onSubmit();
      expect(component.errorMessage).toBe('Please fill in all required fields.');
    });

    it('should call completeCandidateRegistration and navigate on success', () => {
      routeGetSpy.and.returnValue(candidateToken);
      jwtDecodeSpy.and.returnValue({ role: 'CANDIDATE' });
      component.ngOnInit();
      component.profileForm.setValue({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        gender: 'Male',
        race: 'Human',
        disability: 'None',
        contactNumber: '1234567890',
        alternateContactNumber: '',
      });
      const spy = spyOn(authService, 'completeCandidateRegistration').and.returnValue(of({ message: 'success' }));
      component.onSubmit();
      expect(spy).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should set error message on failed candidate registration', () => {
      routeGetSpy.and.returnValue(candidateToken);
      jwtDecodeSpy.and.returnValue({ role: 'CANDIDATE' });
      component.ngOnInit();
      component.profileForm.setValue({
        username: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        gender: 'Male',
        race: 'Human',
        disability: 'None',
        contactNumber: '1234567890',
        alternateContactNumber: '',
      });
      const spy = spyOn(authService, 'completeCandidateRegistration').and.returnValue(throwError(() => new Error('fail')));
      spyOn(console, 'error');
      component.onSubmit();
      expect(spy).toHaveBeenCalled();
      expect(component.errorMessage).toContain('Candidate registration failed');
    });

    it('should call completeHiringManagerRegistration and navigate on success', () => {
        routeGetSpy.and.returnValue(hiringManagerToken);
        jwtDecodeSpy.and.returnValue({ role: 'HIRING_MANAGER' });
        component.ngOnInit();
        component.profileForm.setValue({
          username: 'hmuser',
          companyName: 'Test Inc.',
          industry: 'IT',
          contactPerson: 'HR',
          contactNumber: '0987654321',
        });
        const spy = spyOn(authService, 'completeHiringManagerRegistration').and.returnValue(of({ message: 'success' }));
        component.onSubmit();
        expect(spy).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
  });
});
