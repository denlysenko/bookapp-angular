import { OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';

export abstract class BaseComponent implements OnDestroy {
  protected destroy$: Subject<any> = new Subject();

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
