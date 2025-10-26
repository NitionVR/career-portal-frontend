import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-radio-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <style>
      :host mat-icon {
        font-family: 'Material Symbols Outlined';
      }
    </style>
    <div 
      (click)="select()" 
      class="p-4 border rounded-lg flex items-center justify-between w-full cursor-pointer transition-all duration-200"
      [class.border-primary]="selected"
      [class.ring-2]="selected"
      [class.ring-primary]="selected"
    >
      <div class="flex items-center">
        <mat-icon class="mr-3">{{ icon }}</mat-icon>
        <div class="text-left">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `
})
export class RadioCardComponent {
  @Input() value: any;
  @Input() selectedValue: any;
  @Input() icon: string = 'description';
  @Output() selectionChange = new EventEmitter<any>();

  get selected(): boolean {
    return this.value === this.selectedValue;
  }

  select(): void {
    this.selectionChange.emit(this.value);
  }
}
