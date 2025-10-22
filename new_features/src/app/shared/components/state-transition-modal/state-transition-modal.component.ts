import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-state-transition-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './state-transition-modal.component.html',
  styleUrls: ['./state-transition-modal.component.css']
})
export class StateTransitionModalComponent {
  @Input() isVisible = false;
  @Input() currentState: string = '';
  @Input() possibleNextStates: string[] = [];
  @Output() stateChange = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  selectedState: string = '';

  constructor() { }

  onConfirm(): void {
    if (this.selectedState) {
      this.stateChange.emit(this.selectedState);
    }
  }
}
