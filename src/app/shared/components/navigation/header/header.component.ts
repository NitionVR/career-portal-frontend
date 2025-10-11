import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() openSignInModal = new EventEmitter<Event>();

  onOpenSignInModal(event: Event): void {
    this.openSignInModal.emit(event);
  }
}
