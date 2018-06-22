import { Injectable } from '@angular/core';

import { CREATE_BOOK_MUTATION } from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

import { Book } from '../models/book.model';

@Injectable()
export class BookService {
  constructor(private apollo: Apollo) {}

  create(book: Book) {
    return this.apollo.mutate({
      mutation: CREATE_BOOK_MUTATION,
      variables: {
        book
      }
    });
  }
}
