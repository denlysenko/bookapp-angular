import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { DEFAULT_SORT_VALUE, LIMIT } from '@bookapp-angular/core';
import {
  CREATE_BOOK_MUTATION,
  FREE_BOOKS_QUERY,
  PAID_BOOKS_QUERY,
  RATE_BOOK_MUTATION,
  UPDATE_BOOK_MUTATION,
} from '@bookapp-angular/graphql';
import { Apollo } from 'apollo-angular';

import { Book, BookFilterInput, BookRateEvent, BooksResponse, CreateBookResponse } from '../models';

@Injectable()
export class BookService {
  constructor(private apollo: Apollo) {}

  create(book: Book) {
    return this.apollo.mutate<CreateBookResponse>({
      mutation: CREATE_BOOK_MUTATION,
      variables: {
        book
      }
    });
  }

  update(id: string, book: Book) {
    return this.apollo.mutate<CreateBookResponse>({
      mutation: UPDATE_BOOK_MUTATION,
      variables: {
        id,
        book
      }
    });
  }

  rate(event: BookRateEvent, query: any, variables: any) {
    const { bookId, rate } = event;

    this.apollo
      .mutate({
        mutation: RATE_BOOK_MUTATION,
        variables: {
          bookId,
          rate
        },
        update: (store, { data: { rateBook } }) => {
          const data: BooksResponse = store.readQuery({
            query,
            variables
          });

          const updatedBook = data.books.rows.find(({ id }) => id === bookId);
          updatedBook.rating = rateBook.rating;
          updatedBook.total_rates = rateBook.total_rates;
          updatedBook.total_rating = rateBook.total_rating;

          store.writeQuery({
            query,
            variables,
            data
          });
        }
      })
      .subscribe();
  }

  getBooks(
    paid: boolean,
    filter: BookFilterInput,
    orderBy = DEFAULT_SORT_VALUE,
    skip = 0,
    first = LIMIT
  ) {
    return this.apollo
      .query<BooksResponse>({
        query: paid ? PAID_BOOKS_QUERY : FREE_BOOKS_QUERY,
        variables: {
          paid,
          filter,
          skip,
          first,
          orderBy
        }
      })
      .pipe(map(res => res.data.books));
  }
}
