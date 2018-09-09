import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { MenuItem } from '@bookapp-angular/core';

@Component({
  moduleId: module.id,
  selector: 'ba-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
  @Input()
  items: MenuItem[];

  @Output()
  onLogout = new EventEmitter<void>();
}
