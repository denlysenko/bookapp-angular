import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatDividerModule, MatProgressBarModule } from '@angular/material';

import { DndModule } from '@web/ui/dnd';

import { FileSelectorComponent } from './file-selector.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressBarModule,
    MatButtonModule,
    DndModule
  ],
  declarations: [FileSelectorComponent],
  exports: [MatDialogModule, FileSelectorComponent]
})
export class FileSelectorModule {}
