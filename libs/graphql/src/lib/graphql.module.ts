import { ModuleWithProviders, NgModule } from '@angular/core';

import { StoragePlatformService } from '@bookapp-angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';

import { createApolloFactory } from './graphql.providers';

@NgModule({
  imports: [ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  static forRoot(webSocketImpl = null): ModuleWithProviders {
    return {
      ngModule: GraphQLModule,
      providers: [
        {
          provide: APOLLO_OPTIONS,
          useFactory: createApolloFactory(webSocketImpl),
          deps: [HttpLink, StoragePlatformService]
        }
      ]
    };
  }
}
