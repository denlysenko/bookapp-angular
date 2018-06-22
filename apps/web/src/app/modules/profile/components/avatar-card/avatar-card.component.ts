import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatDialog } from '@angular/material';

import { User } from '@bookapp-angular/auth-core';
import { ProfileForm } from '@bookapp-angular/profile-core';

import { AvatarSelectorComponent } from '../avatar-selector/avatar-selector.component';

@Component({
  selector: 'ba-avatar-card',
  templateUrl: './avatar-card.component.html',
  styleUrls: ['./avatar-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarCardComponent {
  @Input() user: User;
  @Output() avatarSaved = new EventEmitter<ProfileForm>();

  constructor(private dialog: MatDialog) {}

  showSelector() {
    const dialogRef = this.dialog.open(AvatarSelectorComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(avatar => {
      this.avatarSaved.emit({ id: this.user.id, user: { avatar } });
    });
  }
}
