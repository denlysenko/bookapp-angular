import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class UploadPlatformService {
  private progress = new BehaviorSubject<number>(0);

  get progress$() {
    return this.progress.asObservable();
  }

  upload(file: File | Blob, name: string = 'file'): Observable<string> {
    return of('');
  }
}
