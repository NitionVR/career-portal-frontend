import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'; // Keep MatIconModule for now, will replace icons in HTML

@Component({
  selector: 'app-invite-recruiter-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule // Keep MatIconModule for now
  ],
  templateUrl: './invite-recruiter-dialog.component.html'
})
export class InviteRecruiterDialogComponent {
  @Input() isVisible: boolean = false;
  @Output() confirm = new EventEmitter<{ emails: string[], message: string }>();
  @Output() cancel = new EventEmitter<void>();

  inviteForm: FormGroup;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private fb = inject(FormBuilder);

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
      this.confirm.emit({
        emails,
        message: this.inviteForm.get('message')?.value
      });
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}