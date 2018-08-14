import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '@bookapp-angular/auth-core';
import { ADMIN_ROLE, categories, navs } from '@bookapp-angular/core';
import { Log, LOG_ACTIONS } from '@bookapp-angular/history-core';

@Component({
  selector: 'ba-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
  readonly navs = navs;
  readonly categories = categories;
  readonly actions = LOG_ACTIONS;

  isAdmin: boolean;

  @Input()
  set user(value: User) {
    if (value) {
      this.isAdmin = value.roles.includes(ADMIN_ROLE);
    }
  }

  @Input()
  logs: Log[];
}
