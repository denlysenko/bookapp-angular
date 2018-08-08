import { OnInit, ViewChild } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { Book, Bookmark, BookmarksResponse, BookRateEvent } from '@bookapp-angular/books-core';
import { BaseComponent, LIMIT } from '@bookapp-angular/core';
import { BOOKMARKS_QUERY, RATE_BOOK_MUTATION } from '@bookapp-angular/graphql';
import { Apollo, QueryRef } from 'apollo-angular';
import { Color } from 'color';
import { ListViewLoadOnDemandMode } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { isIOS } from 'platform';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { LoaderService } from '~/modules/core/services/loader.service';

export abstract class BookmarksPageBaseComponent extends BaseComponent
  implements OnInit {
  bookmarks: Bookmark[];
  books: ObservableArray<Book>;
  count: number;

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

  @ViewChild('listView')
  listViewComponent: RadListViewComponent;

  protected abstract type: string;
  protected abstract apollo: Apollo;
  protected abstract loaderService: LoaderService;

  private bookmarksQueryRef: QueryRef<BookmarksResponse>;
  private skip = 0;
  private _loading: boolean;

  ngOnInit() {
    const { type, skip } = this;

    this.listViewComponent.listView.loadOnDemandBufferSize = 1;

    this.bookmarksQueryRef = this.apollo.watchQuery<BookmarksResponse>({
      query: BOOKMARKS_QUERY,
      variables: {
        type,
        skip,
        first: LIMIT
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true
    });

    this.subscribeToBookmarksQuery();
  }

  onItemLoading(args) {
    if (isIOS) {
      const newcolor = new Color('#eeeeee');
      args.ios.backgroundView.backgroundColor = newcolor.ios;
    }
  }

  loadMore() {
    if (this.isLoading) {
      return;
    }

    if (this.hasMoreItems()) {
      this.skip = this.bookmarks.length;

      const { skip } = this;

      return this.bookmarksQueryRef.fetchMore({
        variables: {
          skip
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          const { rows, count } = fetchMoreResult.bookmarks;

          return {
            bookmarks: {
              count,
              rows: [...previousResult.bookmarks.rows, ...rows],
              __typename: 'BookmarksResponse'
            }
          };
        }
      });
    }
  }

  rate(event: BookRateEvent) {
    const { skip, type } = this;
    const variables = {
      type,
      skip,
      first: LIMIT
    };

    const { bookId, rate } = event;

    this.apollo
      .mutate({
        mutation: RATE_BOOK_MUTATION,
        variables: {
          bookId,
          rate
        },
        update: (store, { data: { rateBook } }) => {
          const data: BookmarksResponse = store.readQuery({
            query: BOOKMARKS_QUERY,
            variables
          });

          const updatedBookmark = data.bookmarks.rows.find(
            ({ book }) => book.id === bookId
          );
          updatedBookmark.book.rating = rateBook.rating;
          updatedBookmark.book.total_rates = rateBook.total_rates;
          updatedBookmark.book.total_rating = rateBook.total_rating;

          store.writeQuery({
            query: BOOKMARKS_QUERY,
            variables,
            data
          });
        }
      })
      .subscribe();
  }

  private hasMoreItems(): boolean {
    return this.bookmarks.length < this.count;
  }

  private subscribeToBookmarksQuery() {
    this.bookmarksQueryRef.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data, loading }) => {
        this.isLoading = loading;
        if (loading) {
          return;
        }

        this.bookmarks = data.bookmarks.rows;
        this.books = new ObservableArray(
          this.bookmarks.map(bookmark => bookmark.book)
        );
        this.count = data.bookmarks.count;

        this.updateLoadOnDemandMode();
        this.listViewComponent.listView.notifyLoadOnDemandFinished();
      });
  }

  private updateLoadOnDemandMode() {
    if (this.hasMoreItems()) {
      this.listViewComponent.listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.Auto];
    } else {
      this.listViewComponent.listView.loadOnDemandMode =
        ListViewLoadOnDemandMode[ListViewLoadOnDemandMode.None];
    }
  }
}
