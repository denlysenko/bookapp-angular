import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { User } from '@bookapp-angular/auth-core';
import { userMenu } from '@bookapp-angular/core';

@Component({
  selector: 'ba-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  title = 'Book App';
  userMenu = userMenu;

  @Input() isMobile: boolean;
  @Input() user: User;

  @Output() onToggleSidenav = new EventEmitter<void>();
  @Output() onLogout = new EventEmitter<void>();

  toggleSidenav() {
    this.onToggleSidenav.emit();
  }

  logout() {
    this.onLogout.emit();
  }
}
