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
  selector: 'ba-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMenuComponent extends MenuBaseComponent {
  @Input() navItems: MenuItem[];
  @Input() categoryItems: MenuItem[];
  @Input() selectedPage: string;

  @Output() itemSelected = new EventEmitter<MenuItem>();
}
