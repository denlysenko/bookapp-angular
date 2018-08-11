import { OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import {
  Book,
  BookRateEvent,
  BookService,
  BooksResponse
} from '@bookapp-angular/books-core';
import {
  BaseComponent,
  FILTER_KEYS,
  LIMIT,
  RouterExtensions,
  StoreService
} from '@bookapp-angular/core';
import {
  FREE_BOOKS_QUERY,
  PAID_BOOKS_QUERY,
  RATE_BOOK_MUTATION
} from '@bookapp-angular/graphql';

import { Apollo, QueryRef } from 'apollo-angular';
import {
  ModalDialogOptions,
  ModalDialogService
} from 'nativescript-angular/modal-dialog';
import { takeUntil } from 'rxjs/operators';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { SegmentedBarItem } from 'ui/segmented-bar';

import { LoaderService } from '~/modules/core/services/loader.service';

import { BookListComponent } from '../../books/components/book-list/book-list.component';
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

  @ViewChild(BookListComponent)
  bookListView: BookListComponent;

  protected abstract paid: boolean;

  protected abstract viewContainerRef: ViewContainerRef;
  protected abstract modalService: ModalDialogService;
  protected abstract storeService: StoreService;
  protected abstract apollo: Apollo;
  protected abstract bookService: BookService;
  protected abstract loaderService: LoaderService;
  protected abstract routerExtensions: RouterExtensions;

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

  ngOnInit() {
    this.sortItems = this.genSortItems();
    this.setInitialSorting();

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

  async onSearchButtonTap() {
    const options: ModalDialogOptions = {
      context: { paid: this.paid },
      fullscreen: true,
      animated: false,
      viewContainerRef: this.viewContainerRef
    };

    const book = await this.modalService.showModal(
      BookSearchComponent,
      options
    );

    if (book) {
      // wait when modal close
      setTimeout(() => {
        this.routerExtensions.navigateByUrl(
          book.paid
            ? `/buy/${book.url}?bookId=${book.id}`
            : `/browse/${book.url}?bookId=${book.id}`
        );
      });
    }
  }

  onSelectedIndexChange(args) {
    this.selectedOption = args.object.selectedIndex;
    this.skip = 0;

    const { value } = this.sortOptions[this.selectedOption];
    this.sortValue = value;
    const { sortValue, skip, paid } = this;

    this.storeService.set(FILTER_KEYS[paid ? 'BUY_BOOKS' : 'BROWSE_BOOKS'], {
      sortValue: value
    });

    this.bookQueryRef.refetch({
      skip,
      orderBy: sortValue
    });

    this.bookListView.scrollToIndex(0);
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

    const { bookId, rate } = event;
    const query = paid ? PAID_BOOKS_QUERY : FREE_BOOKS_QUERY;

    this.apollo
      .mutate({
        mutation: RATE_BOOK_MUTATION,
        variables: {
          bookId,
          rate
        },
        update: (store, { data: { rateBook } }) => {
          const data: BooksResponse = store.readQuery({
            query,
            variables
          });

          const updatedBook = data.books.rows.find(({ id }) => id === bookId);
          updatedBook.rating = rateBook.rating;
          updatedBook.total_rates = rateBook.total_rates;
          updatedBook.total_rating = rateBook.total_rating;

          store.writeQuery({
            query,
            variables,
            data
          });
        }
      })
      .subscribe();
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
        this.bookListView.updateLoadOnDemandMode(this.hasMoreItems());
      });
  }

  private hasMoreItems(): boolean {
    return this.books.length < this.count;
  }
}
