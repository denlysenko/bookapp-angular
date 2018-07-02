import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { ModalDialogOptions, ModalDialogService } from 'nativescript-angular/modal-dialog';

import { BookFilterComponent } from '../../components/book-filter/book-filter.component';

@Component({
  moduleId: module.id,
  selector: 'ba-browse-books-page',
  templateUrl: './browse-books-page.component.html',
  styleUrls: ['./browse-books-page.component.scss']
})
export class BrowseBooksPageComponent implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalDialogService
  ) {}

  ngOnInit() {}

  async onFilterButtonTap() {
    const options: ModalDialogOptions = {
      context: {},
      fullscreen: true,
      viewContainerRef: this.viewContainerRef
    };

    const result = await this.modalService.showModal(
      BookFilterComponent,
      options
    );

    if (result) {
      console.log(result);
    }
  }
}
