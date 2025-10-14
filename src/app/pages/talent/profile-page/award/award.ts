import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-award',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './award.html',
  styleUrls: ['./award.css']
})
export class AwardComponent {
  @Input() awardFormGroup!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }
}
