import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() isVisible = false;
  @Input() title: string = 'Are you sure?';
  @Input() message: string = 'This action cannot be undone.';
  @Input() confirmButtonText: string = 'Confirm';
  @Input() confirmButtonClass: string = 'bg-primary text-primary-foreground hover:bg-primary-hover';

  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  currentStep: 'confirm' | 'reason' = 'confirm';
  feedbackForm: FormGroup;

  reasons = [
    { value: 'ACCEPTED_OTHER_OFFER', label: 'I accepted another offer' },
    { value: 'SALARY_EXPECTATIONS', label: 'The salary expectations were not met' },
    { value: 'RELOCATING', label: 'I am relocating to a different area' },
    { value: 'PROCESS_TOO_LONG', label: 'The application process is taking too long' },
    { value: 'NOT_INTERESTED_ANYMORE', label: 'I am no longer interested in the position' },
    { value: 'OTHER', label: 'Other' }
  ];

  constructor(private fb: FormBuilder) {
    this.feedbackForm = this.fb.group({
      reason: [null],
      otherText: ['']
    });
  }

  ngOnInit(): void {
    this.feedbackForm.get('reason')?.valueChanges.subscribe(value => {
      const otherTextField = this.feedbackForm.get('otherText');
      if (value === 'OTHER') {
        otherTextField?.setValidators([Validators.required]);
      } else {
        otherTextField?.clearValidators();
      }
      otherTextField?.updateValueAndValidity();
    });
  }

  proceedToReasonStep(): void {
    this.currentStep = 'reason';
  }

  onConfirm(): void {
    if (this.currentStep === 'confirm') {
      this.proceedToReasonStep();
    } else {
      if (this.feedbackForm.valid) {
        this.confirm.emit(this.feedbackForm.value);
      }
    }
  }

  onCancel(): void {
    this.currentStep = 'confirm'; // Reset step
    this.cancel.emit();
  }

  isSubmitDisabled(): boolean {
    return this.currentStep === 'reason' && this.feedbackForm.invalid;
  }
}
