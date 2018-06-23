import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

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

  constructor(
    protected uploadService: UploadService,
    private dialogRef: MatDialogRef<ImageSelectorComponent>
  ) {
    super();
    this.progress$ = this.uploadService.progress$;
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

    this.upload(dataURIToBlob(this.croppedImage)).subscribe(res => {
      this.dialogRef.close(res.Location);
    }, () => (this.cropperReady = false));
  }
}
