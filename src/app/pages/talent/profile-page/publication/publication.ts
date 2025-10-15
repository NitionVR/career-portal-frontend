import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './publication.html',
  styleUrls: ['./publication.css']
})
export class PublicationComponent {
  @Input() publicationFormGroup!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }
}
