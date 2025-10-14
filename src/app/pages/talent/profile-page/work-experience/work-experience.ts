import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './work-experience.html',
  styleUrls: ['./work-experience.css']
})
export class WorkExperienceComponent {
  @Input() workFormGroup!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }
}
