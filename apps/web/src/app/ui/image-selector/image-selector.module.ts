import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatProgressBarModule } from '@angular/material';

import { DndModule } from '@web/ui/dnd';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ImageSelectorComponent } from './image-selector.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    DndModule,
    ImageCropperModule
  ],
  exports: [MatDialogModule, ImageSelectorComponent],
  declarations: [ImageSelectorComponent]
})
export class ImageSelectorModule {}
