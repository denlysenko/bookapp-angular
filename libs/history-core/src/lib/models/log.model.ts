import { Book } from '@bookapp-angular/books-core';
import { ListResponse } from '@bookapp-angular/core';

export interface Log {
  id: string;
  action: string;
  createdAt: string;
  book: Book;
}

export interface LogsResponse {
  logs: ListResponse<Log>;
}
