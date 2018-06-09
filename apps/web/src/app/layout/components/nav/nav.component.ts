import { ChangeDetectionStrategy, Component } from '@angular/core';

import { categories, navs } from '@bookapp-angular/core';

@Component({
  selector: 'ba-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
  navs = navs;
  categories = categories;
}
