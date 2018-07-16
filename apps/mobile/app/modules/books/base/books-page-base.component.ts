import { OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { Book, BookRateEvent, BookService, BooksResponse } from '@bookapp-angular/books-core';
import { BaseComponent, FILTER_KEYS, LIMIT, StoreService } from '@bookapp-angular/core';
import { FREE_BOOKS_QUERY, PAID_BOOKS_QUERY } from '@bookapp-angular/graphql';
import { Apollo, QueryRef } from 'apollo-angular';
import { Color } from 'color';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ListViewLoadOnDemandMode } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { isIOS } from 'platform';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { SegmentedBarItem } from 'ui/segmented-bar';
import { LoaderService } from '~/modules/core/services/loader.service';

import { BookSearchComponent } from '../components/book-search/book-search.component';

export abstract class BooksPageBaseComponent extends BaseComponent
  implements OnInit {
  books: ObservableArray<Book>;
  count: number;
  sortItems: Array<SegmentedBarItem>;
  selectedOption: number;

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

  @ViewChild('listView') listViewComponent: RadListViewComponent;

  private sortOptions = [
    {
      value: 'id_desc',
      label: 'All books'
    },
    {
      value: 'createdAt_desc',
      label: 'Most recents'
    },
    {
      value: 'views_desc',
      label: 'Most popular'
    }
  ];

  protected abstract paid: boolean;

  protected abstract viewContainerRef: ViewContainerRef;
  protected abstract modalService: ModalDialogService;
  protected abstract storeService: StoreService;
  protected abstract apollo: Apollo;
  protected abstract bookService: BookService;
  protected abstract loaderService: LoaderService;

  private skip = 0;
  private sortValue = this.sortOptions[0].value;
  private bookQueryRef: QueryRef<BooksResponse>;
  private _loading: boolean;

  ngOnInit() {
    this.sortItems = this.genSortItems();
    this.setInitialSorting();

    this.listViewComponent.listView.loadOnDemandBufferSize = 1;

    this.bookQueryRef = this.apollo.watchQuery<BooksResponse>({
      query: this.paid ? PAID_BOOKS_QUERY : FREE_BOOKS_QUERY,
      variables: {
        paid: this.paid,
        skip: this.skip,
        first: LIMIT,
        orderBy: this.sortValue
      },
      notifyOnNetworkStatusChange: true
    });

    this.subscribeToBookQuery();
  }

  onItemLoading(args) {
    if (isIOS) {
      const newcolor = new Color('#eeeeee');
      args.ios.backgroundView.backgroundColor = newcolor.ios;
    }
  }

  async onSearchButtonTap() {
    const options: ModalDialogOptions = {
      context: { paid: this.paid },
      fullscreen: true,
      animated: false,
      viewContainerRef: this.viewContainerRef
    };

    const result = await this.modalService.showModal(
      BookSearchComponent,
      options
    );

    if (result) {
      // TODO navigate to BookView page
      console.log(result);
    }
  }

  onSelectedIndexChange(args) {
    this.selectedOption = args.object.selectedIndex;
    this.skip = 0;

    const { value } = this.sortOptions[this.selectedOption];
    const { sortValue, skip, paid } = this;

    this.sortValue = value;
    this.storeService.set(FILTER_KEYS[paid ? 'BUY_BOOKS' : 'BROWSE_BOOKS'], {
      sortValue: value
    });

    this.bookQueryRef.refetch({
      paid,
      skip,
      first: LIMIT,
      orderBy: sortValue
    });

    this.listViewComponent.listView.scrollToIndex(0);
  }

  loadMore() {
    if (this.isLoading) {
      return;
    }

    if (this.hasMoreItems()) {
      this.skip = this.books.length;

      const { skip } = this;

      return this.bookQueryRef.fetchMore({
        variables: {
          skip
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          const { rows, count } = fetchMoreResult.books;

          return {
            books: {
              count,
              rows: [...previousResult.books.rows, ...rows],
              __typename: 'BookResponse'
            }
          };
        }
      });
    }
  }

  rate(event: BookRateEvent) {
    const { sortValue, paid } = this;
    const variables = {
      paid,
      skip: 0, // as in initial query
      first: LIMIT,
      orderBy: sortValue
    };

    this.bookService.rate(
      event,
      paid ? PAID_BOOKS_QUERY : FREE_BOOKS_QUERY,
      variables
    );
  }

  private genSortItems(): SegmentedBarItem[] {
    return this.sortOptions.map(opt => {
      const item = new SegmentedBarItem();
      item.title = opt.label;
      return item;
    });
  }

  private setInitialSorting() {
    const filter = this.storeService.get(
      FILTER_KEYS[this.paid ? 'BUY_BOOKS' : 'BROWSE_BOOKS']
    );

    if (filter) {
      const { sortValue } = filter;
      this.sortValue = sortValue;
      const idx = this.sortOptions.findIndex(opt => opt.value === sortValue);
      this.selectedOption = idx !== -1 ? idx : 0;
    } else {
      this.selectedOption = 0;
    }
  }

  private subscribeToBookQuery() {
    this.bookQueryRef.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data, loading }) => {
        this.isLoading = loading;

        if (loading) {
          return;
        }

        this.books = new ObservableArray(data.books.rows);
        this.count = data.books.count;

        this.updateLoadOnDemandMode();
        this.listViewComponent.listView.notifyLoadOnDemandFinished();
      });
  }

  private hasMoreItems(): boolean {
    return this.books.length < this.count;
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
