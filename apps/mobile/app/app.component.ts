import { Component, NgZone } from '@angular/core';
import { AppShortcuts } from 'nativescript-app-shortcuts';
import { RouterExtensions } from '@bookapp-angular/core';

@Component({
  selector: 'ba-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private routerExtensions: RouterExtensions,
    private zone: NgZone
  ) {
    new AppShortcuts().setQuickActionCallback(shortcutItem => {
      if (shortcutItem.type === 'reading') {
        return this.deeplink('/books/read');
      }

      if (shortcutItem.type === 'browse') {
        return this.deeplink('/books/browse');
      }

      if (shortcutItem.type === 'buy') {
        return this.deeplink('/books/buy');
      }
    });
  }

  private deeplink(to: string) {
    this.zone.run(() => {
      this.routerExtensions.navigate([to], {
        animated: false
      });
    });
  }
}
