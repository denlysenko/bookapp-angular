import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  NgZone
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ReadBookPageBaseComponent } from '@bookapp-angular/books-core';

import { Apollo } from 'apollo-angular';
import { WebViewInterface } from 'nativescript-webview-interface';
import { EventData } from 'tns-core-modules/ui/page/page';
import * as application from 'tns-core-modules/application';
import { WebView } from 'ui/web-view';

@Component({
  moduleId: module.id,
  templateUrl: './read-book-page.component.html',
  styleUrls: ['./read-book-page.component.scss']
})
export class ReadBookPageComponent extends ReadBookPageBaseComponent
  implements OnInit, OnDestroy {
  @ViewChild('epubWebView')
  epubWebViewRef: ElementRef;

  private get epubWebView(): WebView {
    return this.epubWebViewRef.nativeElement;
  }

  private webViewInterface: WebViewInterface;

  constructor(
    protected route: ActivatedRoute,
    protected apollo: Apollo,
    private zone: NgZone
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.webViewInterface = new WebViewInterface(
      this.epubWebView,
      '~/modules/books/containers/read-book-page/www/index.html'
    );

    this.epubWebView.on('loadFinished', (args: EventData) => {
      const webview: WebView = <WebView>args.object;

      if (webview.android) {
        this.epubWebView.android.getSettings().setAllowContentAccess(true);
        this.epubWebView.android.getSettings().setAllowFileAccess(true);
        this.epubWebView.android.getSettings().setJavaScriptEnabled(true);
        this.epubWebView.android
          .getSettings()
          .setLoadsImagesAutomatically(true);
        this.epubWebView.android
          .getSettings()
          .setAllowUniversalAccessFromFileURLs(true);
        this.epubWebView.android.getSettings().setBuiltInZoomControls(false);
        this.epubWebView.android.getSettings().setDisplayZoomControls(false);
      }

      this.webViewInterface.emit('loadBook', {
        src: this.epubUrl,
        bookmark: this.bookmark
      });
    });

    this.webViewInterface.on('locationChanged', (data: string) => {
      this.currentLocation = data;
    });

    application.on(application.suspendEvent, () => {
      // only need to save current page, which is happening in Base's OnDestroy
      this.zone.run(() => {
        super.ngOnDestroy();
      });
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.webViewInterface.destroy();
    this.webViewInterface = null;
    application.off(application.suspendEvent);
  }
}
