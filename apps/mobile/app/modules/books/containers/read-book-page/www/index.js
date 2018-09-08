(function() {
  'use strict';
  var webViewInterface = window.nsWebViewInterface;
  var reader;
  var src;

  webViewInterface.on('loadBook', function(book) {
    if (!src) {
      src = book.src;
      reader = ePubReader(book.src);

      if (book.bookmark) {
        reader.rendition.display(book.bookmark);
      }

      reader.rendition.on('locationChanged', function(event) {
        webViewInterface.emit('locationChanged', event.start);
      });
    }
  });
})();
