var cards = (function () {
  var cards = [];

  // cacheDOM
  $template = document.getElementById('flip-card-default');
  $output = document.getElementById('output');
  $homeScreen = document.getElementById('homeScreen');

  //bindEvents
  $output.addEventListener('click', removeElement);
  events.on('output', initCards);
  events.on('add', add);
  events.on('remove', remove);
  events.on('save', saveData);
  events.on('empty', emptyCards);

  function _render() {
    $homeScreen.classList.remove('home-active');
    $output.innerHTML = '';
    if (cards) {
      cards.forEach(function (value, index, arr) {
        var temp = template(value);
        $output.appendChild(temp);
      });
    }
  }

  function _renderHomepage() {
    $homeScreen.classList.add('home-active');
  }

  function initCards(hash) {
    service.getData(hash, function() {
      items = JSON.parse(this);
      cards = items.data;
      items.data ? _render() : _renderHomepage();
    });
  }

  function emptyCards() {
    cards = [];
  }

  function add(card) {
    if(card.card.name.length > 0) {
      if(card.img.length > 0) {
        saveImage(card.card.img, card.img);
      }
      cards.push(card.card);
      _render();
    }    
  }

  function saveImage(name, img) {    
    service.saveImage(
      name,
      img,
      function() {
        console.log(this);
      }
    );
  }

  function remove(removeClass) {
    removeClass ? $output.classList.add('remove-active') : $output.classList.remove('remove-active');
  }

  function removeElement(e) {
    if (e.target && e.target.className === 'removeCard') {
      var target = e.target.closest('.flip-card');
      var children = $output.children;
      for (var i = 0; i < children.length; i++) {
        if (children[i] == target) {
          cards.splice(i, 1);
          _render();
          break;
        }
      }
    }
  }

  function template(value) {
    var temp = document.createElement('div');
    temp.className = 'flip-card';
    temp.innerHTML = $template.innerHTML;
    temp.querySelector('p').innerHTML = value.name;
    temp.querySelector('img').setAttribute('src', value.img);
    return temp;
  }

  function saveData() {
    service.saveData(
      service.getRoute(),
      cards,
      function() {
        console.log(this);
      }
    );
  }

})();