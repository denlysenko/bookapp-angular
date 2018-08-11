import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookmarksPageBaseComponent } from '@bookapp-angular/books-core';

import { Apollo } from 'apollo-angular';

@Component({
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent extends BookmarksPageBaseComponent {
  title: string;
  protected type: string;

  constructor(protected apollo: Apollo, private route: ActivatedRoute) {
    super();
    this.type = this.route.snapshot.data.type;
    this.title = this.route.snapshot.data.title;
  }

  protected handleBookmarksChanges({ data, loading }) {
    this.isLoading = loading;
    if (loading) {
      return;
    }

    this.bookmarks = data.bookmarks.rows;
    this.books = this.bookmarks.map(bookmark => bookmark.book);
    this.count = data.bookmarks.count;
  }
}
