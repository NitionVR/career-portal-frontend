import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bulk-action-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './bulk-action-dialog.component.html'
})
export class BulkActionDialogComponent {
  actionForm: FormGroup;
  
  constructor(
    private dialogRef: MatDialogRef<BulkActionDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { count: number, statusOptions: string[] }
  ) {
    this.actionForm = this.fb.group({
      actionType: ['status', Validators.required],
      newStatus: [this.data.statusOptions.length > 0 ? this.data.statusOptions[0] : ''],
      sendNotification: [false],
      tagsInput: [''],
      exportFormat: ['csv'],
      includeContact: [false],
      includeSkills: [false],
      includeNotes: [false],
      includeScores: [false]
    });
  }
  
  isFormValid(): boolean {
    const actionType = this.actionForm.get('actionType')?.value;
    if (actionType === 'status') {
      return !!this.actionForm.get('newStatus')?.value;
    } else if (actionType === 'tags') {
      return !!this.actionForm.get('tagsInput')?.value;
    } else if (actionType === 'export') {
      return !!this.actionForm.get('exportFormat')?.value;
    }
    return false;
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
  onApply(): void {
    if (this.actionForm.valid) {
      const actionType = this.actionForm.get('actionType')?.value;
      let result: any = { action: actionType };

      if (actionType === 'status') {
        result.value = this.actionForm.get('newStatus')?.value;
        result.sendNotification = this.actionForm.get('sendNotification')?.value;
      } else if (actionType === 'tags') {
        const tagsInput = this.actionForm.get('tagsInput')?.value || '';
        result.value = tagsInput.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag);
      } else if (actionType === 'export') {
        result.value = this.actionForm.get('exportFormat')?.value;
        result.includeContact = this.actionForm.get('includeContact')?.value;
        result.includeSkills = this.actionForm.get('includeSkills')?.value;
        result.includeNotes = this.actionForm.get('includeNotes')?.value;
        result.includeScores = this.actionForm.get('includeScores')?.value;
      }

      this.dialogRef.close(result);
    }
  }
}