import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filtersSubject = new BehaviorSubject<any>({});
  filters$: Observable<any> = this.filtersSubject.asObservable();

  constructor() { }

  updateFilters(filters: any): void {
    this.filtersSubject.next(filters);
  }
}
