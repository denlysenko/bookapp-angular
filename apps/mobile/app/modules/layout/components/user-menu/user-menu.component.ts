import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { MenuItem } from '@bookapp-angular/core';
import { MenuBaseComponent } from '~/modules/core/base/MenuBaseComponent';

@Component({
  moduleId: module.id,
  selector: 'ba-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent extends MenuBaseComponent {
  @Input() items: MenuItem[];
  @Input() selectedPage: string;

  @Output() itemSelected = new EventEmitter<MenuItem>();
  @Output() onLogout = new EventEmitter<void>();

  logout() {
    this.onLogout.emit();
  }
}
