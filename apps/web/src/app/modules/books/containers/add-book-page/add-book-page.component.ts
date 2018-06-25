import { Component, OnInit } from '@angular/core';

import { Book } from '@bookapp-angular/books-core/src';

@Component({
  templateUrl: './add-book-page.component.html',
  styleUrls: ['./add-book-page.component.scss']
})
export class AddBookPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  save(event: Book) {
    console.log(event);
  }
}
