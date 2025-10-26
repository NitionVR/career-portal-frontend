import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeDto } from '../../../../api/models';
import { MatIconModule } from '@angular/material/icon';
import { RadioCardComponent } from '../../../../shared/components/radio-card/radio-card.component';

@Component({
  selector: 'app-choose-cv-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, RadioCardComponent],
  templateUrl: './choose-cv-modal.component.html',
  styleUrls: ['./choose-cv-modal.component.css']
})
export class ChooseCvModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() resumes: ResumeDto[] = [];
  @Output() confirm = new EventEmitter<File | ResumeDto>();
  @Output() cancel = new EventEmitter<void>();

  selectedResume: ResumeDto | 'new' = 'new';

  ngOnInit(): void {
    if (this.resumes.length > 0) {
      this.selectedResume = this.resumes[0];
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.confirm.emit(file);
    }
  }

  handleSelection(value: any): void {
    if (value === 'new') {
      document.getElementById('new-cv-input-modal')?.click();
    } else {
      this.selectedResume = value;
    }
  }

  confirmSelection(): void {
    if (this.selectedResume !== 'new') {
      this.confirm.emit(this.selectedResume);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}