import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './certificate.html',
  styleUrls: ['./certificate.css']
})
export class CertificateComponent {
  @Input() certificateFormGroup!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  onRemove(): void {
    this.remove.emit();
  }
}
