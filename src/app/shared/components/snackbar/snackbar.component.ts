import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SnackbarService, SnackbarMessage } from './snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snackbarState', [
      state('void', style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => visible', animate('300ms ease-out')),
      transition('visible => void', animate('300ms ease-in'))
    ])
  ]
})
export class SnackbarComponent implements OnInit, OnDestroy {
  currentSnackbar: SnackbarMessage | null = null;
  private snackbarSubscription!: Subscription;
  private timer: any;

  constructor(private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.snackbarSubscription = this.snackbarService.snackbarState$.subscribe(
      (state) => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.currentSnackbar = state;
        if (state) {
          this.timer = setTimeout(() => {
            this.close();
          }, state.duration);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.snackbarSubscription) {
      this.snackbarSubscription.unsubscribe();
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  get icon(): string {
    if (!this.currentSnackbar) return '';
    switch (this.currentSnackbar.type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'info': return 'info';
    }
  }

  get colorClass(): string {
    if (!this.currentSnackbar) return '';
    switch (this.currentSnackbar.type) {
      case 'success': return 'border-success';
      case 'error': return 'border-destructive';
      case 'info': return 'border-secondary';
    }
  }

  close(): void {
    this.snackbarService.hide();
  }
}
