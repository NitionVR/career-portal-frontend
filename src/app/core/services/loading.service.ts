import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> = this._isLoading.asObservable();

  constructor() { }

  startLoading(): void {
    this._isLoading.next(true);
  }

  stopLoading(): void {
    this._isLoading.next(false);
  }
}
