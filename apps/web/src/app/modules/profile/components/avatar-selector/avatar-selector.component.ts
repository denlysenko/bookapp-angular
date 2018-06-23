import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material';

import { User } from '@bookapp-angular/auth-core';
import { ProfileForm } from '@bookapp-angular/profile-core';
import { ImageSelectorComponent } from '@web/ui/image-selector';

@Component({
  selector: 'ba-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarSelectorComponent {
  @Input() user: User;
  @Output() avatarSaved = new EventEmitter<ProfileForm>();

  constructor(private dialog: MatDialog) {}

  showSelector() {
    const dialogRef = this.dialog.open(ImageSelectorComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(avatar => {
      if (avatar) {
        this.avatarSaved.emit({ id: this.user.id, user: { avatar } });
      }
    });
  }
}
