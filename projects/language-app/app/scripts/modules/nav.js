/**
 * @file /scripts/nav.js
 * Header and naviagsion
 *
*/

var nav = (function() {
  var items = [];

  //cacheDOM
  $navItems = document.getElementById('navItems');
  $newItem = document.getElementById('new-item');
  
  // bindEvents
  this.$newItem.addEventListener('click', newItem);
  events.on('nav', init);

  function init() {
    getData();
    window.addEventListener('hashchange', function() {
      var hash = window.location.hash.substr(1).toLocaleLowerCase();
      var el = document.getElementById('navItems');
      var child = el.getElementsByClassName('nav-item');
      for (let item of child) {
        if(item.classList.contains('item-'+hash)) {
          item.classList.add('active');
        }
      }
    });
  }

  function _render() {
    $navItems.innerHTML = '';
    items.forEach(function(value, index, arr) {
      var temp = value.replace('assets/db/', '').replace('.json', '');
      $navItems.innerHTML += '<li class="nav-item item-'+temp.toLowerCase()+'"><a href="#'+temp+'">'+temp+'</a></li>';
    });
  }

  function getData() {
    service.getNav(setData);
  }

  function setData() {
    items = JSON.parse(this);
    _render();
  }

  function newItem() {
    events.emit('newItem');
  }
})();
  