import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { UploadService } from '../services/upload.service';

export abstract class FileSelectorBaseComponent<T> {
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

  upload(file: File | Blob) {
    this.isLoading = true;

    return this.uploadService.upload(file).pipe(
      tap(() => {
        this.isLoading = false;
      }),
      map(response => JSON.parse(response)),
      catchError(err => {
        this.isLoading = false;
        this.imageChangedEvent = null;
        this.handleError(JSON.parse(err));
        return throwError(err);
      })
    );
  }

  private handleError(err: any) {
    if (err.errors && err.errors.length) {
      const errorObj = err.errors[err.errors.length - 1];
      this.error = errorObj.code;
    }
  }
}
