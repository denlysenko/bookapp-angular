import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { FileSelectorComponent } from '@bookapp-angular/ui';

@Component({
  selector: 'ba-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarSelectorComponent {
  constructor(private dialog: MatDialog) {}

  showSelector() {
    const dialogRef = this.dialog.open(FileSelectorComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
