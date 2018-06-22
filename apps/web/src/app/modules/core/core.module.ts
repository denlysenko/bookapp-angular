import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AuthGuard,
  FeedbackPlatformService,
  RouterExtensions,
  StoragePlatformService
} from '@bookapp-angular/core';
import { GraphQLModule } from '@bookapp-angular/graphql';

import { FeedbackService } from './services/feedback.service';
import { StorageService } from './services/storage.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    GraphQLModule.forRoot(),
    MatSnackBarModule
  ],
  providers: [
    RouterExtensions,
    AuthGuard,
    {
      provide: StoragePlatformService,
      useClass: StorageService
    },
    {
      provide: FeedbackPlatformService,
      useClass: FeedbackService
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3500 }
    }
  ]
})
export class CoreModule {}
