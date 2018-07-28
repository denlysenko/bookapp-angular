import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';

import { Book, BookService } from '@bookapp-angular/books-core';
import { BaseComponent } from '@bookapp-angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import * as application from 'tns-core-modules/application';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { SearchBar } from 'ui/search-bar';

@Component({
  moduleId: module.id,
  selector: 'ba-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent extends BaseComponent implements OnInit {
  books: ObservableArray<Book>;

  private searchText$ = new Subject<string>();

  constructor(
    private params: ModalDialogParams,
    private bookService: BookService
  ) {
    super();
  }

  ngOnInit() {
    this.searchText$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchValue =>
          this.bookService.getBooks(this.params.context.paid, {
            field: 'title',
            search: searchValue
          })
        ),
        map(res => res.rows),
        takeUntil(this.destroy$)
      )
      .subscribe(books => (this.books = new ObservableArray<Book>(books)));
  }

  onSearchLoaded(args) {
    const sb = <SearchBar>args.object;
    if (application.ios) {
      sb.focus();
      sb.ios.showsCancelButton = true;
    }
  }

  onClear() {
    this.params.closeCallback(null);
  }

  onTextChanged(args) {
    const searchValue = args.object.text;
    this.searchText$.next(searchValue);
  }

  onItemSelect(args) {
    this.params.closeCallback(this.books.getItem(args.index));
  }

  onSubmit() {
    this.params.closeCallback(null);
  }
}
