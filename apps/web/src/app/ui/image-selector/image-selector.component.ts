import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs';

import { dataURIToBlob } from '@bookapp-angular/utils';
import { FileSelectorBaseComponent } from '@web/modules/core/base';
import { UploadService } from '@web/modules/core/services';

@Component({
  selector: 'ba-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss'],
  providers: [UploadService]
})
export class ImageSelectorComponent extends FileSelectorBaseComponent {
  croppedImage: string;
  cropperReady = false;
  progress$: Observable<number>;
  maintainAspectRatio = true;

  constructor(
    protected uploadService: UploadService,
    private dialogRef: MatDialogRef<ImageSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    super();
    this.progress$ = this.uploadService.progress$;
    if (this.data && 'maintainAspectRatio' in this.data) {
      this.maintainAspectRatio = data.maintainAspectRatio;
    }
  }

  onLoadImageFail() {
    this.error = 'INVALID_IMG_ERR';
    this.cropperReady = false;
    this.imageChangedEvent = null;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  save() {
    if (!this.croppedImage) {
      return;
    }

    this.upload(dataURIToBlob(this.croppedImage)).subscribe(
      res => {
        this.dialogRef.close(res.publicUrl);
      },
      () => (this.cropperReady = false)
    );
  }
}
