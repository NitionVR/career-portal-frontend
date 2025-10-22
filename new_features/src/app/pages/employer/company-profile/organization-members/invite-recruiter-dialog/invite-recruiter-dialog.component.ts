import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-invite-recruiter-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule
  ],
  templateUrl: './invite-recruiter-dialog.component.html'
})
export class InviteRecruiterDialogComponent {
  inviteForm: FormGroup;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<InviteRecruiterDialogComponent>);

  constructor() {
    this.inviteForm = this.fb.group({
      emails: this.fb.array([this.createEmailControl()]),
      message: ['', []]
    });
  }

  get emailsArray(): FormArray {
    return this.inviteForm.get('emails') as FormArray;
  }

  createEmailControl() {
    return this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]);
  }

  addEmailField() {
    this.emailsArray.push(this.createEmailControl());
  }

  removeEmailField(index: number) {
    if (this.emailsArray.length > 1) {
      this.emailsArray.removeAt(index);
    }
  }

  onSubmit() {
    if (this.inviteForm.valid) {
      const emails = this.emailsArray.controls.map(control => control.value);
      this.dialogRef.close({ 
        emails,
        message: this.inviteForm.get('message')?.value
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}