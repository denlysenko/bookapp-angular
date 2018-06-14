import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs';

import { FileSelectorBaseComponent, UploadService } from '@bookapp-angular/core';
import { dataURIToBlob } from '@bookapp-angular/utils';

@Component({
  selector: 'ba-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
  providers: [UploadService]
})
export class AvatarSelectorComponent extends FileSelectorBaseComponent {
  croppedImage: string;
  cropperReady = false;
  progress$: Observable<number>;

  constructor(
    protected uploadService: UploadService,
    private dialogRef: MatDialogRef<AvatarSelectorComponent>
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
