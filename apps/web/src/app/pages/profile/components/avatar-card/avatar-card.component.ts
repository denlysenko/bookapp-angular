import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AvatarSelectorComponent } from '../avatar-selector/avatar-selector.component';

@Component({
  selector: 'ba-avatar-card',
  templateUrl: './avatar-card.component.html',
  styleUrls: ['./avatar-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarCardComponent {
  constructor(private dialog: MatDialog) {}

  showSelector() {
    const dialogRef = this.dialog.open(AvatarSelectorComponent, {
      width: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
