import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
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
    MatRadioModule,
    MatIconModule
  ],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-bold mb-2">Bulk Actions</h2>
      <p class="text-muted-foreground mb-6">Apply actions to {{ data.count }} selected candidates</p>
      
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-2">Select Action</label>
          <div class="space-y-3">
            <div class="flex items-center">
              <input type="radio" id="status" name="actionType" value="status" [(ngModel)]="selectedAction" class="mr-2">
              <label for="status">Update Status</label>
            </div>
            <div *ngIf="selectedAction === 'status'" class="ml-6">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>New Status</mat-label>
                <mat-select [(ngModel)]="selectedStatus">
                  <mat-option *ngFor="let status of data.statusOptions" [value]="status">
                    {{ status }}
                  </mat-option>
                </mat-select>
              </mat-form-field>
            </div>
            
            <div class="flex items-center">
              <input type="radio" id="tag" name="actionType" value="tag" [(ngModel)]="selectedAction" class="mr-2">
              <label for="tag">Add Tags</label>
            </div>
            <div *ngIf="selectedAction === 'tag'" class="ml-6">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Tags (comma separated)</mat-label>
                <input matInput [(ngModel)]="tagsInput" placeholder="e.g. Potential, Follow-up, Urgent">
              </mat-form-field>
            </div>
            
            <div class="flex items-center">
              <input type="radio" id="export" name="actionType" value="export" [(ngModel)]="selectedAction" class="mr-2">
              <label for="export">Export Data</label>
            </div>
            <div *ngIf="selectedAction === 'export'" class="ml-6">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Export Format</mat-label>
                <mat-select [(ngModel)]="exportFormat">
                  <mat-option value="csv">CSV</mat-option>
                  <mat-option value="pdf">PDF</mat-option>
                  <mat-option value="excel">Excel</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end gap-3 mt-8">
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" [disabled]="!isFormValid()" (click)="onApply()">Apply to {{ data.count }} Candidates</button>
      </div>
    </div>
  `
})
export class BulkActionDialogComponent {
  selectedAction: string = 'status';
  selectedStatus: string = '';
  tagsInput: string = '';
  exportFormat: string = 'csv';
  
  constructor(
    private dialogRef: MatDialogRef<BulkActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { count: number, statusOptions: string[] }
  ) {
    if (data.statusOptions.length > 0) {
      this.selectedStatus = data.statusOptions[0];
    }
  }
  
  isFormValid(): boolean {
    if (this.selectedAction === 'status') {
      return !!this.selectedStatus;
    } else if (this.selectedAction === 'tag') {
      return !!this.tagsInput;
    } else if (this.selectedAction === 'export') {
      return !!this.exportFormat;
    }
    return false;
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
  
  onApply(): void {
    let result: any = { action: this.selectedAction };
    
    if (this.selectedAction === 'status') {
      result.value = this.selectedStatus;
    } else if (this.selectedAction === 'tag') {
      result.value = this.tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    } else if (this.selectedAction === 'export') {
      result.value = this.exportFormat;
    }
    
    this.dialogRef.close(result);
  }
}