import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { Book, BookRateEvent, BookService, BooksResponse } from '@bookapp-angular/books-core';
import { BaseComponent, FILTER_KEYS, LIMIT, StoreService } from '@bookapp-angular/core';
import { FREE_BOOKS_QUERY } from '@bookapp-angular/graphql';
import { Apollo, QueryRef } from 'apollo-angular';
import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';
import { SegmentedBarItem } from 'ui/segmented-bar';

import { BookSearchComponent } from '../../components/book-search/book-search.component';

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
  isLoading: boolean;

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

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalDialogService,
    private storeService: StoreService,
    private apollo: Apollo,
    private bookService: BookService
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
        filter: null,
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

    const { sortValue, skip } = this;

    this.bookQueryRef.refetch({
      paid: false,
      filter: null,
      skip,
      first: LIMIT,
      orderBy: sortValue
    });
  }

  rate(event: BookRateEvent) {
    const { sortValue, skip } = this;
    const variables = {
      paid: false,
      filter: null,
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
}
