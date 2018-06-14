import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'ba-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSelectorComponent {
  constructor(private dialogRef: MatDialogRef<FileSelectorComponent>) {}
}
