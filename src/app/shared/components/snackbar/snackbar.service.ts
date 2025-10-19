import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type SnackbarType = 'success' | 'error' | 'info';

export interface SnackbarMessage {
  message: string;
  type: SnackbarType;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackbarSubject = new BehaviorSubject<SnackbarMessage | null>(null);
  snackbarState$: Observable<SnackbarMessage | null> = this.snackbarSubject.asObservable();

  show(message: string, type: SnackbarType = 'info', duration: number = 5000): void {
    this.snackbarSubject.next({ message, type, duration });
  }

  success(message: string, duration: number = 5000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration: number = 7000): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration: number = 5000): void {
    this.show(message, 'info', duration);
  }

  hide(): void {
    this.snackbarSubject.next(null);
  }
}
