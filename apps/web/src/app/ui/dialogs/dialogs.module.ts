import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatDividerModule } from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatDividerModule, MatButtonModule],
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent]
})
export class DialogsModule {}
