import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Mail, ArrowRight, CheckCircle } from 'lucide-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPage } from './login';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LoginPage,
        LucideAngularModule.pick({ Mail, ArrowRight, CheckCircle }),
        HttpClientTestingModule,
      ],
      providers: [
        provideAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should have an email field that is required', () => {
    const email = component.loginForm.get('email');
    email?.setValue('');
    expect(email?.hasError('required')).toBeTruthy();
  });

  it('should have an email field that validates email format', () => {
    const email = component.loginForm.get('email');
    email?.setValue('not-an-email');
    expect(email?.hasError('email')).toBeTruthy();
  });

  it('should have a valid form when email is valid', () => {
    const email = component.loginForm.get('email');
    email?.setValue('test@example.com');
    expect(component.loginForm.valid).toBeTruthy();
  });
});
