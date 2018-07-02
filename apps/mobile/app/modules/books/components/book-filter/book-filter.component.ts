import { Component, OnInit } from '@angular/core';

import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  moduleId: module.id,
  selector: 'ba-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss']
})
export class BookFilterComponent implements OnInit {
  constructor(private params: ModalDialogParams) {}

  ngOnInit() {}
}
