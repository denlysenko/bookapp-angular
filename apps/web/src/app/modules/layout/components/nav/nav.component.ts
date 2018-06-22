import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '@bookapp-angular/auth-core';
import { ADMIN_ROLE, categories, navs } from '@bookapp-angular/core';

@Component({
  selector: 'ba-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
  navs = navs;
  categories = categories;
  isAdmin: boolean;

  @Input()
  set user(value: User) {
    if (value) {
      this.isAdmin = value.roles.includes(ADMIN_ROLE);
    }
  }
}
