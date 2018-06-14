// depends on @angular/material dialog
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';

import { DndModule } from '../dnd';
import { FileSelectorComponent } from './file-selector.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    DndModule
  ],
  exports: [MatDialogModule, FileSelectorComponent],
  declarations: [FileSelectorComponent],
  providers: []
})
export class FileSelectorModule {}
