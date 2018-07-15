import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { Book, BookRateEvent, BookService, BooksResponse } from '@bookapp-angular/books-core';
import { BaseComponent, FILTER_KEYS, LIMIT, StoreService } from '@bookapp-angular/core';
import { FREE_BOOKS_QUERY } from '@bookapp-angular/graphql';
import { Apollo, QueryRef } from 'apollo-angular';
import { Color } from 'color';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { ListViewLoadOnDemandMode } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { isIOS } from 'platform';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { SegmentedBarItem } from 'ui/segmented-bar';
import { LoaderService } from '~/modules/core/services/loader.service';

import { BookSearchComponent } from '../../components/book-search/book-search.component';

@Component({
  moduleId: module.id,
  selector: 'ba-browse-books-page',
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent extends BaseComponent implements OnInit {
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

  private skip = 0;
  private sortValue = this.sortOptions[0].value;
  private bookQueryRef: QueryRef<BooksResponse>;
  private _loading: boolean;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalDialogService,
    private storeService: StoreService,
    private apollo: Apollo,
    private bookService: BookService,
    private loaderService: LoaderService
  ) {
    super();
    this.sortItems = this.genSortItems();
  }

  ngOnInit() {
    this.setInitialSorting();

    this.listViewComponent.listView.loadOnDemandBufferSize = 2;

    this.bookQueryRef = this.apollo.watchQuery<BooksResponse>({
      query: FREE_BOOKS_QUERY,
      variables: {
        paid: false,
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
      context: { paid: false },
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
    const { value } = this.sortOptions[this.selectedOption];

    this.sortValue = value;
    this.storeService.set(FILTER_KEYS.BROWSE_BOOKS, {
      sortValue: value
    });

    this.skip = 0;
    const { sortValue, skip } = this;

    this.bookQueryRef.refetch({
      paid: false,
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
    const { sortValue } = this;
    const variables = {
      paid: false,
      skip: 0, // as in initial query
      first: LIMIT,
      orderBy: sortValue
    };

    this.bookService.rate(event, FREE_BOOKS_QUERY, variables);
  }

  private genSortItems(): SegmentedBarItem[] {
    return this.sortOptions.map(opt => {
      const item = new SegmentedBarItem();
      item.title = opt.label;
      return item;
    });
  }

  private setInitialSorting() {
    const filter = this.storeService.get(FILTER_KEYS.BROWSE_BOOKS);

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
