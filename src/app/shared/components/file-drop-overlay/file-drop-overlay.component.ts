import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-file-drop-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-drop-overlay.component.html',
  styleUrls: ['./file-drop-overlay.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition(':enter, :leave', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class FileDropOverlayComponent {
  @Input() isVisible: boolean = false;
}
