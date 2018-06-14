import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { FileSelectorBaseComponent, UploadService } from '@bookapp-angular/core';
import { dataURIToBlob } from '@bookapp-angular/utils';

@Component({
  selector: 'ba-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
  providers: [UploadService]
})
export class AvatarSelectorComponent extends FileSelectorBaseComponent<
  AvatarSelectorComponent
> {
  croppedImage: string;
  cropperReady = false;
  progress$: Observable<number>;

  constructor(protected uploadService: UploadService) {
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

    super.upload(dataURIToBlob(this.croppedImage)).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
