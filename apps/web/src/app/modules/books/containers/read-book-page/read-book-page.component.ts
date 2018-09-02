import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Reading, UserSelfResponse } from '@bookapp-angular/auth-core';
import { BaseComponent } from '@bookapp-angular/core';
import { ME_QUERY, UPDATE_USER_MUTATION } from '@bookapp-angular/graphql';

import { Apollo } from 'apollo-angular';
import { map, takeUntil } from 'rxjs/operators';

import { BookReaderComponent } from '../../components/book-reader/book-reader.component';

@Component({
  templateUrl: './read-book-page.component.html',
  styleUrls: ['./read-book-page.component.scss']
})
export class ReadBookPageComponent extends BaseComponent implements OnInit {
  epubUrl: string;
  bookmark: string;

  @ViewChild(BookReaderComponent)
  private reader: BookReaderComponent;

  private userId: string;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
    super();
  }

  ngOnInit() {
    this.epubUrl = this.route.snapshot.data.reading.epubUrl;
    this.bookmark = this.route.snapshot.data.reading.bookmark;
    this.reader.destroy$
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.saveReading.bind(this));
    this.apollo
      .query<UserSelfResponse>({
        query: ME_QUERY
      })
      .pipe(map(res => res.data.me.id))
      .subscribe(id => (this.userId = id));
  }

  private saveReading(reading: Reading) {
    this.apollo
      .mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          id: this.userId,
          user: { reading }
        },
        update: (store, { data: { updateUser } }) => {
          const data: UserSelfResponse = store.readQuery({
            query: ME_QUERY
          });

          data.me.reading = updateUser.reading;

          store.writeQuery({
            query: ME_QUERY,
            data
          });
        }
      })
      .subscribe();
  }
}
