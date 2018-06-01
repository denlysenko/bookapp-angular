import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoragePlatformService } from '@bookapp-angular/core';
import { GraphQLModule } from '@bookapp-angular/graphql';
import { NxModule } from '@nrwl/nx';

import { StorageService } from './services/storage.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    NxModule.forRoot(),
    HttpClientModule,
    GraphQLModule.forRoot(),
    MatSnackBarModule
  ],
  providers: [
    {
      provide: StoragePlatformService,
      useClass: StorageService
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2500 }
    }
  ]
})
export class CoreModule {}
