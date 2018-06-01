import { ModuleWithProviders, NgModule } from '@angular/core';

import { PROVIDERS } from '@bookapp-angular/graphql/src/lib/graphql.providers';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

@NgModule({
  imports: [ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GraphQLModule,
      providers: [...PROVIDERS]
    };
  }
}
