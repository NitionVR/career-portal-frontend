import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent } from '../../shared/components/custom-select/custom-select.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomSelectComponent,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterPage implements OnInit {
  signupForm: FormGroup;
  role: string = 'talent';

  genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  raceOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  disabilityOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' },
  ];

  industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'other', label: 'Other' },
  ];
  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      race: ['', Validators.required],
      disability: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      alternativeContact: [''],
      companyName: [''],
      industry: [''],
      contactPerson: [''],
    });
    this.updateFormVisibility();
  }

  ngOnInit(): void {}

  setRole(role: string): void {
    this.role = role;
    this.updateFormVisibility();
  }

  private updateFormVisibility(): void {
    const { username, firstName, lastName, gender, race, disability, email, contactNumber, alternativeContact, companyName, industry, contactPerson } = this.signupForm.controls;

    // Reset all controls first
    username.clearValidators();
    firstName.clearValidators();
    lastName.clearValidators();
    gender.clearValidators();
    race.clearValidators();
    disability.clearValidators();
    email.clearValidators();
    contactNumber.clearValidators();
    alternativeContact.clearValidators();
    companyName.clearValidators();
    industry.clearValidators();
    contactPerson.clearValidators();

    username.setValue('');
    firstName.setValue('');
    lastName.setValue('');
    gender.setValue('');
    race.setValue('');
    disability.setValue('');
    email.setValue('');
    contactNumber.setValue('');
    alternativeContact.setValue('');
    companyName.setValue('');
    industry.setValue('');
    contactPerson.setValue('');

    // Set validators based on role
    username.setValidators(Validators.required);
    email.setValidators([Validators.required, Validators.email]);
    contactNumber.setValidators(Validators.required);

    if (this.role === 'talent') {
      firstName.setValidators(Validators.required);
      lastName.setValidators(Validators.required);
      gender.setValidators(Validators.required);
      race.setValidators(Validators.required);
      disability.setValidators(Validators.required);
    } else if (this.role === 'employer') {
      companyName.setValidators(Validators.required);
      industry.setValidators(Validators.required);
      contactPerson.setValidators(Validators.required);
    }

    // Update validity for all controls
    username.updateValueAndValidity();
    firstName.updateValueAndValidity();
    lastName.updateValueAndValidity();
    gender.updateValueAndValidity();
    race.updateValueAndValidity();
    disability.updateValueAndValidity();
    email.updateValueAndValidity();
    contactNumber.updateValueAndValidity();
    alternativeContact.updateValueAndValidity();
    companyName.updateValueAndValidity();
    industry.updateValueAndValidity();
    contactPerson.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      // Add your form submission logic here (e.g., API call)
    }
  }
}