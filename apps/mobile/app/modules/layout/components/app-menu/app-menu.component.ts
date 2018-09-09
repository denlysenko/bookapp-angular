import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MenuItem } from '@bookapp-angular/core';
import { Log, LOG_ACTIONS } from '@bookapp-angular/history-core';

@Component({
  moduleId: module.id,
  selector: 'ba-app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMenuComponent {
  readonly actions = LOG_ACTIONS;

  @Input()
  navItems: MenuItem[];

  @Input()
  categoryItems: MenuItem[];

  @Input()
  logs: Log[];
}
