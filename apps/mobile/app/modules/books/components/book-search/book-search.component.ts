import { Component, OnInit } from '@angular/core';

import { of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';

import { BaseComponent } from '@bookapp-angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import * as application from 'tns-core-modules/application';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { SearchBar } from 'ui/search-bar';

const arrayItems: Array<any> = [
  {
    id: '1',
    title: 'test book',
    author: 'test author',
    description: '',
    coverUrl:
      'https://s3.eu-central-1.amazonaws.com/bookapp-nodejs/bf15b496-94e7-48d9-8f19-b620d8669a49.png',
    epubUrl: ''
  },
  {
    id: '2',
    title: 'test book 2',
    author: 'test author',
    description: '',
    coverUrl:
      'https://s3.eu-central-1.amazonaws.com/bookapp-nodejs/bf15b496-94e7-48d9-8f19-b620d8669a49.png',
    epubUrl: ''
  },
  {
    id: '3',
    title: 'test book 3',
    author: 'test author',
    description: '',
    coverUrl:
      'https://s3.eu-central-1.amazonaws.com/bookapp-nodejs/bf15b496-94e7-48d9-8f19-b620d8669a49.png',
    epubUrl: ''
  },
  {
    id: '4',
    title: 'test book 4',
    author: 'test author',
    description: '',
    coverUrl:
      'https://s3.eu-central-1.amazonaws.com/bookapp-nodejs/bf15b496-94e7-48d9-8f19-b620d8669a49.png',
    epubUrl: ''
  },
  {
    id: '5',
    title: 'test book 5',
    author: 'test author',
    description: '',
    coverUrl:
      'https://s3.eu-central-1.amazonaws.com/bookapp-nodejs/bf15b496-94e7-48d9-8f19-b620d8669a49.png',
    epubUrl: ''
  },
  {
    id: '6',
    title: 'test book 6',
    author: 'test author',
    description: '',
    coverUrl:
      'https://s3.eu-central-1.amazonaws.com/bookapp-nodejs/bf15b496-94e7-48d9-8f19-b620d8669a49.png',
    epubUrl: ''
  }
];

@Component({
  moduleId: module.id,
  selector: 'ba-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent extends BaseComponent implements OnInit {
  books: ObservableArray<any>; // TODO add Book type later

  private searchText$ = new Subject<string>();

  constructor(private params: ModalDialogParams) {
    super();
  }

  ngOnInit() {
    this.searchText$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchValue => {
          // this will be replaced by query to server
          const filteredBooks = arrayItems.filter(item =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          );

          return of(filteredBooks);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(books => (this.books = new ObservableArray<any>(books)));
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
    this.params.closeCallback(this.books.getItem(args.index).id);
  }

  onSubmit() {
    this.params.closeCallback(null);
  }
}
