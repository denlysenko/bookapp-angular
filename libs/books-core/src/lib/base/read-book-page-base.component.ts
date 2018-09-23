import { OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Reading, UserSelfResponse } from '@bookapp-angular/auth-core';
import { ME_QUERY, UPDATE_USER_MUTATION } from '@bookapp-angular/graphql';

import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

export abstract class ReadBookPageBaseComponent implements OnInit, OnDestroy {
  epubUrl: string;
  bookmark: string;
  currentLocation: string;

  protected route: ActivatedRoute;
  protected apollo: Apollo;

  private userId: string;

  ngOnInit() {
    this.epubUrl = this.route.snapshot.data.reading.epubUrl;
    this.bookmark = this.route.snapshot.data.reading.bookmark;
    this.apollo
      .query<UserSelfResponse>({
        query: ME_QUERY
      })
      .pipe(map(res => res.data.me.id))
      .subscribe(id => (this.userId = id));
  }

  ngOnDestroy() {
    const { epubUrl, currentLocation } = this;
    this.saveReading({
      epubUrl,
      bookmark: currentLocation
    });
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
