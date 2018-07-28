import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '@bookapp-angular/auth-core';
import { BookViewBaseComponent } from '@bookapp-angular/books-core';

@Component({
  selector: 'ba-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookViewComponent extends BookViewBaseComponent {
  @Input()
  set user(value: User) {
    if (value) {
      this._isAdmin = value.roles.includes('admin');
    }
  }

  private _isAdmin: boolean;

  get isAdmin(): boolean {
    return this._isAdmin;
  }
}
