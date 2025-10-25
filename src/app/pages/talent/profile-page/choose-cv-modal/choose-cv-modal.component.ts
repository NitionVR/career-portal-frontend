import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResumeDto } from '../../../../api/models';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ChooseCvModalData {
  resumes: ResumeDto[];
}

@Component({
  selector: 'app-choose-cv-modal',
  standalone: true,
  imports: [CommonModule, MatRadioModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './choose-cv-modal.component.html',
  styleUrls: ['./choose-cv-modal.component.css']
})
export class ChooseCvModalComponent implements OnInit {
  selectedResume: ResumeDto | 'new' = 'new';
  resumes: ResumeDto[] = [];

  constructor(
    public dialogRef: MatDialogRef<ChooseCvModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChooseCvModalData
  ) {}

  ngOnInit(): void {
    this.resumes = this.data.resumes || [];
    // Default selection
    if (this.resumes.length > 0) {
      this.selectedResume = this.resumes[0];
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // A file was selected, close the dialog and return the file object
      this.dialogRef.close(file);
    }
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  confirmSelection(): void {
    if (this.selectedResume === 'new') {
      // This case is handled by the file input directly, but as a fallback:
      this.dialogRef.close('new');
    } else {
      // An existing resume was selected
      this.dialogRef.close(this.selectedResume);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
