import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interest',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './interest.html',
  styleUrls: ['./interest.css']
})
export class InterestComponent {
  @Input() interestFormGroup!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }
}
