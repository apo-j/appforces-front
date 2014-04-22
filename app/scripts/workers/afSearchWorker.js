/**
 * Created by xyj on 03/01/14.
 */
'use strict';

self.addEventListener('message', function(e) {
  self.postMessage(e.data);
}, false);