import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { UploadResponse } from '@bookapp-angular/core';

import { UploadService } from '../services/upload.service';

export abstract class FileSelectorBaseComponent {
  isLoading = false;
  imageChangedEvent: any;
  error: string;

  protected abstract uploadService: UploadService;

  onFileChange(event: any) {
    this.error = null;
    this.imageChangedEvent = event;
  }

  onFileDrop(event: any) {
    this.error = null;
    this.imageChangedEvent = { target: { files: event.dataTransfer.files } };
  }

  upload(file: File | Blob): Observable<UploadResponse> {
    this.isLoading = true;

    return this.uploadService.upload(file).pipe(
      tap(() => {
        this.isLoading = false;
      }),
      map(response => JSON.parse(response)),
      catchError(err => {
        this.isLoading = false;
        this.imageChangedEvent = null;
        const error = JSON.parse(err);
        this.error = error.message;
        return throwError(error);
      })
    );
  }
}
