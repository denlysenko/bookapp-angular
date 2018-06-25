import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { AUTH_TOKEN, environment, StoragePlatformService } from '@bookapp-angular/core';

@Injectable()
export class UploadService {
  private progress = new BehaviorSubject<number>(0);

  get progress$() {
    return this.progress.asObservable();
  }

  constructor(private storageService: StoragePlatformService) {}

  upload(file: File | Blob, name: string = 'file'): Observable<string> {
    return Observable.create(observer => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append(name, file);

      if (xhr.upload) {
        xhr.upload.addEventListener(
          'progress',
          (e: ProgressEvent) => {
            if (e.lengthComputable) {
              this.progress.next(Math.round(e.loaded * 100 / e.total));
            }
          },
          false
        );
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          this.progress.next(0);

          if (xhr.status === 200 || xhr.status === 201) {
            observer.next(xhr.response);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      const token = this.storageService.getItem(AUTH_TOKEN);

      xhr.open('POST', `${environment.uploadUrl}`, true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
    });
  }

  deleteFile(key: string): Observable<string> {
    return Observable.create(observer => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 201) {
            observer.next(xhr.response);
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      const token = this.storageService.getItem(AUTH_TOKEN);

      xhr.open('DELETE', `${environment.uploadUrl}/${key}`, true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send();
    });
  }
}
