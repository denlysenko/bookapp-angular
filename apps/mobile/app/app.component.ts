import { Component, NgZone, OnInit } from '@angular/core';

import { RouterExtensions } from '@bookapp-angular/core';

import { AppShortcuts } from 'nativescript-app-shortcuts';
import * as application from 'tns-core-modules/application';

@Component({
  moduleId: module.id,
  selector: 'ba-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
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

  ngOnInit() {
    application.on(application.exitEvent, () => {
      this.unsubscribeAll();
    });
  }

  private deeplink(to: string) {
    this.zone.run(() => {
      this.routerExtensions.navigate([to], {
        animated: false
      });
    });
  }

  private unsubscribeAll() {
    application.off(application.suspendEvent);
    application.off(application.exitEvent);
  }
}
