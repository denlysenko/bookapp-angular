import { User } from '@bookapp-angular/auth-core';
import { ListResponse } from '@bookapp-angular/core';

export interface Book {
  id?: string;
  title: string;
  author: string;
  coverUrl: string;
  epubUrl: string;
  description: string;
  slug?: string;
  url?: string;
  total_rating?: number;
  total_rates?: number;
  rating?: number;
  views?: number;
  paid: boolean;
  price?: number;
  comments?: BookComment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BookComment {
  id: string;
  bookId: string;
  author: User;
  text: string;
}

export interface CreateBookResponse {
  createBook: Book;
}

export interface BookResponse {
  book: Book;
}

export interface BooksResponse {
  books: ListResponse<Book>;
}

export interface BestBooksResponse {
  bestBooks: ListResponse<Book>;
}
