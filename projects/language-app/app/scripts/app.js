/**
 * @file /scripts/app.js
 * App
 *
 * Initialization the app
 */

(function() {
  window.onload = function() {
    events.emit('nav');
    routes.rooter();
  };
})();
