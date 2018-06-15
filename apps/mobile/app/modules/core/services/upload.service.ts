import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AUTH_TOKEN, environment, StoragePlatformService, UploadResponse } from '@bookapp-angular/core';
import { ProgressEventData, Request, ResultEventData, session } from 'nativescript-background-http';

const s = session('image-upload');

@Injectable()
export class UploadService {
  private progress = new BehaviorSubject<number>(0);

  get progress$() {
    return this.progress.asObservable();
  }

  constructor(private storageService: StoragePlatformService) {}

  upload(fileUrl: string, name: string = 'file'): Promise<UploadResponse> {
    return new Promise((resolve, reject) => {
      const token = this.storageService.getItem(AUTH_TOKEN);

      const request: Request = {
        url: environment.uploadUrl,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        description: 'uploading'
      };

      const params = [{ name: name, filename: fileUrl, mimeType: 'image/png' }];

      const task = s.multipartUpload(params, request);

      task.on('progress', (e: ProgressEventData) => {
        this.progress.next(Math.round(e.currentBytes * 100 / e.totalBytes));
      });

      task.on('error', err => {
        reject(err);
      });

      task.on('responded', (e: ResultEventData) => {
        resolve(JSON.parse(e.data));
      });
    });
  }
}
