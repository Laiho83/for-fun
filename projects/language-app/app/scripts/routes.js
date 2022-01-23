var routes = (function () {

  // cacheDOM

  // eventListener
  window.addEventListener('hashchange', rooter);

  function rooter() {
    var hash = service.getRoute();
    events.emit('output', hash);
  }

  return {
    rooter: rooter
  };
})();