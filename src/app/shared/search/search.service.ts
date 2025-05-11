import {DestroyRef, inject, Injectable, signal} from '@angular/core';
import {takeUntilDestroyed, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {debounceTime} from "rxjs";

@Injectable({providedIn: 'root'})
export class SearchService {
  private destroyRef = inject(DestroyRef);
  private _search = signal('');
  readonly search = this._search;

  debouncedSearch = toSignal(
    toObservable(this.search).pipe(
      debounceTime(300),
      takeUntilDestroyed(this.destroyRef)
    ),
    {initialValue: ''}
  );

  set(value: string) {
    this._search.set(value);
  }

  reset() {
    this._search.set('');
  }
}
