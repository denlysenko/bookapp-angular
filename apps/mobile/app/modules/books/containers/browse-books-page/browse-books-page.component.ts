import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { Book, BookRateEvent, BookService, BooksResponse } from '@bookapp-angular/books-core';
import { BaseComponent, FILTER_KEYS, StoreService } from '@bookapp-angular/core';
import { FREE_BOOKS_QUERY } from '@bookapp-angular/graphql';
import { Apollo, QueryRef } from 'apollo-angular';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { SegmentedBarItem } from 'ui/segmented-bar';
import { LoaderService } from '~/modules/core/services/loader.service';

import { BookSearchComponent } from '../../components/book-search/book-search.component';

const LIMIT = 2;

@Component({
  moduleId: module.id,
  selector: 'ba-browse-books-page',
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent extends BaseComponent implements OnInit {
  books: Book[];
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
    const filter = this.storeService.get(FILTER_KEYS.BROWSE_BOOKS);

    if (filter) {
      const { sortValue } = filter;
      this.sortValue = sortValue;
      const idx = this.sortOptions.findIndex(opt => opt.value === sortValue);
      this.selectedOption = idx !== -1 ? idx : 0;
    } else {
      this.selectedOption = 0;
    }

    this.bookQueryRef = this.apollo.watchQuery<BooksResponse>({
      query: FREE_BOOKS_QUERY,
      variables: {
        paid: false,
        skip: this.skip,
        first: LIMIT,
        orderBy: this.sortValue
      }
    });

    this.bookQueryRef.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ data, loading }) => {
        this.isLoading = loading;
        if (loading) {
          return;
        }

        this.books = data.books.rows;
        this.count = data.books.count;
      });
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
    this.isLoading = true;

    this.bookQueryRef.refetch({
      paid: false,
      skip,
      first: LIMIT,
      orderBy: sortValue
    });
  }

  loadMore() {
    console.log('load more event');
    if (this.isLoading) {
      return;
    }

    if (this.hasMoreItems()) {
      this.skip = this.books.length;

      const { skip } = this;
      this.isLoading = true;

      return this.bookQueryRef.fetchMore({
        variables: {
          skip
        },
        updateQuery: (previousResult, { fetchMoreResult, variables }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }

          const { rows, count } = fetchMoreResult.books;

          return {
            books: {
              count,
              rows: [...previousResult.books.rows, ...rows],
              // rows: [],
              __typename: 'BookResponse'
            }
          };
        }
      });
    }
  }

  rate(event: BookRateEvent) {
    const { sortValue, skip } = this;
    const variables = {
      paid: false,
      skip,
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

  private hasMoreItems(): boolean {
    return this.books.length < this.count;
  }
}
