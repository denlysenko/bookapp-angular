import { Component, ViewContainerRef } from '@angular/core';

import { BookService } from '@bookapp-angular/books-core';
import { RouterExtensions, StoreService } from '@bookapp-angular/core';
import { Apollo } from 'apollo-angular';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { LoaderService } from '~/modules/core/services/loader.service';

import { BooksPageBaseComponent } from '../../base/books-page-base.component';

@Component({
  moduleId: module.id,
  selector: 'ba-browse-books-page',
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent extends BooksPageBaseComponent {
  protected paid = false;

  constructor(
    protected viewContainerRef: ViewContainerRef,
    protected modalService: ModalDialogService,
    protected storeService: StoreService,
    protected apollo: Apollo,
    protected bookService: BookService,
    protected loaderService: LoaderService,
    protected routerExtensions: RouterExtensions
  ) {
    super();
  }
}
