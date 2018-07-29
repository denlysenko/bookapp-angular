import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookPageBaseComponent, BookService } from '@bookapp-angular/books-core';
import { Apollo } from 'apollo-angular';
import * as application from 'tns-core-modules/application';
import { isIOS } from 'tns-core-modules/platform';
import { TabView } from 'ui/tab-view/tab-view';

@Component({
  moduleId: module.id,
  selector: 'ba-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent extends BookPageBaseComponent {
  selectedIndex = 0;

  constructor(
    protected route: ActivatedRoute,
    protected apollo: Apollo,
    protected bookService: BookService
  ) {
    super();

    if (
      isIOS &&
      application.ios.window.safeAreaInsets &&
      application.ios.window.safeAreaInsets.bottom > 0
    ) {
      application.addCss(`
        GridLayout { margin-bottom: -${
          application.ios.window.safeAreaInsets.bottom
        } }
        `);
    }
  }

  onIndexChanged(args) {
    const tabView = <TabView>args.object;
    this.selectedIndex = tabView.selectedIndex;
  }
}
