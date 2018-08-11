import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BookmarksPageBaseComponent } from '@bookapp-angular/books-core';

import { Apollo } from 'apollo-angular';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

import { LoaderService } from '~/modules/core/services/loader.service';
import { BookListComponent } from '../../components/book-list/book-list.component';

@Component({
  moduleId: module.id,
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.scss']
})
export class BookmarksPageComponent extends BookmarksPageBaseComponent {
  protected type: string;

  @ViewChild(BookListComponent)
  bookListView: BookListComponent;

  set isLoading(value: boolean) {
    this._loading = value;
    if (this._loading) {
      this.loaderService.start();
    } else {
      this.loaderService.stop();
    }
  }
  get isLoading(): boolean {
    return this._loading;
  }

  private _loading: boolean;

  constructor(
    protected apollo: Apollo,
    private route: ActivatedRoute,
    protected loaderService: LoaderService
  ) {
    super();
    this.type = this.route.snapshot.data.type;
  }

  protected handleBookmarksChanges({ data, loading }) {
    this.isLoading = loading;
    if (loading) {
      return;
    }

    this.bookmarks = data.bookmarks.rows;
    this.books = new ObservableArray(
      this.bookmarks.map(bookmark => bookmark.book)
    );
    this.count = data.bookmarks.count;
    this.bookListView.updateLoadOnDemandMode(this.hasMoreItems());
  }
}
