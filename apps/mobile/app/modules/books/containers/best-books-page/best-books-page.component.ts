import { Component, ViewChild } from '@angular/core';

import { BestBooksPageBaseComponent } from '@bookapp-angular/books-core';

import { Apollo } from 'apollo-angular';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';

import { LoaderService } from '~/modules/core/services/loader.service';
import { BookListComponent } from '../../components/book-list/book-list.component';

@Component({
  moduleId: module.id,
  templateUrl: './best-books-page.component.html',
  styleUrls: ['./best-books-page.component.scss']
})
export class BestBooksPageComponent extends BestBooksPageBaseComponent {
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

  private _loading: boolean;

  constructor(protected apollo: Apollo, private loaderService: LoaderService) {
    super();
  }

  protected handleBooksChanges({ data, loading }) {
    this.isLoading = loading;
    if (loading) {
      return;
    }

    this.books = new ObservableArray(data.bestBooks.rows);
    this.count = data.bestBooks.count;
    this.bookListView.updateLoadOnDemandMode(this.hasMoreItems());
  }
}
