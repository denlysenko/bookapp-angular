import { HttpHeaders } from '@angular/common/http';
import { InjectionToken } from '@angular/core';

import {
  AUTH_TOKEN,
  environment,
  StoragePlatformService,
  FeedbackPlatformService,
  HTTP_STATUS
} from '@bookapp-angular/core';

import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split, ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

export const WebSocketImpl = new InjectionToken('WebSocketImpl');

interface Definintion {
  kind: string;
  operation?: string;
}

const defaultOptions = {
  watchQuery: {
    errorPolicy: 'all'
  },
  query: {
    errorPolicy: 'all'
  },
  mutate: {
    errorPolicy: 'all'
  }
};

export function createApolloFactory(
  httpLink: HttpLink,
  storageService: StoragePlatformService,
  webSocketImpl: any,
  feedbackService: FeedbackPlatformService
) {
  const http = httpLink.create({
    uri: environment.endpointUrl
  });

  const ws = new WebSocketLink({
    uri: environment.subscriptionsEndpoint,
    options: {
      reconnect: true,
      connectionParams: {
        authToken: storageService.getItem(AUTH_TOKEN)
      }
    },
    webSocketImpl
  });

  const auth = setContext(() => {
    const token = storageService.getItem(AUTH_TOKEN);
    if (!token) {
      return {};
    } else {
      return {
        headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
      };
    }
  });

  const link = split(
    ({ query }) => {
      const { kind, operation }: Definintion = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    auth.concat(http)
  );

  const errorLink = onError(({ networkError }) => {
    if (networkError) {
      let msg: string;

      switch (networkError['status']) {
        case HTTP_STATUS.NO_CONNECTION:
          msg = 'No connection. Please, try again later.';
          break;
        case HTTP_STATUS.SERVICE_UNAVAILABLE:
        case HTTP_STATUS.GATEWAY_TIMEOUT:
          msg = `${networkError['statusText']}. Retrying...`;
          break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        case HTTP_STATUS.BAD_GATEWAY:
          msg = `${networkError['statusText']}.`;
          break;
      }

      if (msg) {
        feedbackService.error(msg);
      }
    }
  });

  const retryLink = new RetryLink({
    delay: {
      initial: 1000,
      max: Infinity,
      jitter: true
    },
    attempts: {
      max: 5,
      retryIf: error =>
        error.status === HTTP_STATUS.SERVICE_UNAVAILABLE ||
        error.status === HTTP_STATUS.GATEWAY_TIMEOUT
    }
  });

  return {
    link: ApolloLink.from([errorLink, retryLink, link]),
    cache: new InMemoryCache(),
    defaultOptions
  };
}
