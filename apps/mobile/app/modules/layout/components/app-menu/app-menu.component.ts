import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { MenuItem } from '@bookapp-angular/core';
import { Log, LOG_ACTIONS } from '@bookapp-angular/history-core';

import { MenuBaseComponent } from '~/modules/core/base/MenuBaseComponent';

@Component({
  moduleId: module.id,
  selector: 'ba-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMenuComponent extends MenuBaseComponent {
  readonly actions = LOG_ACTIONS;

  @Input()
  navItems: MenuItem[];

  @Input()
  categoryItems: MenuItem[];

  @Input()
  selectedPage: string;

  @Input()
  logs: Log[];

  @Output()
  itemSelected = new EventEmitter<MenuItem>();
}
