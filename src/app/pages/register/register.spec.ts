import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, User, Mail, ArrowRight } from 'lucide-angular';
import { RegisterPage } from './register';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RegisterPage,
        LucideAngularModule.pick({ User, Mail, ArrowRight }),
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

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('should require first name, last name, and email', () => {
    const firstName = component.registerForm.get('firstName');
    const lastName = component.registerForm.get('lastName');
    const email = component.registerForm.get('email');

    firstName?.setValue('');
    lastName?.setValue('');
    email?.setValue('');

    expect(firstName?.hasError('required')).toBeTruthy();
    expect(lastName?.hasError('required')).toBeTruthy();
    expect(email?.hasError('required')).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });
    expect(component.registerForm.valid).toBeTruthy();
  });
});
