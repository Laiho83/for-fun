var people = (function () {
  var people = ['Will', 'Steve'];
  var $template = document.getElementById('template');
  var $input = document.getElementById('inputPeople');
  var $add = document.getElementById('addPerson');
  var $output = document.getElementById('people');
  
  $add.addEventListener('click', addPerson);
  $output.addEventListener('click', removePerson);

  _render();

  function _render() {
    $output.innerHTML = '';
    if (people) {
      people.forEach(function (val) {
        var temp = template(val);
        $output.appendChild(temp);
      });
    }
    events.emit('peopleChange', people.length);
  }

  function addPerson(val) {
    var temp = val.length > 0 ? val : $input.value;
    people.push(temp);    
    _render();
  }

  function removePerson(e) {
    if (e.target && e.target.className === 'del') {
      var target = e.target.closest('.item');
      var children = $output.children;
      for (var i = 0; i < children.length; i++) {
        if (children[i] == target) {
          people.splice(i, 1);
          _render();
          break;
        }
      }
    }
  }

  function template(val) {
    var temp = document.createElement('li');
    temp.className = 'item';
    temp.innerHTML = $template.innerHTML;
    temp.querySelector('.people-name').innerHTML = val;
    return temp;
  }

  return {
    addPerson: addPerson,
    removePerson: removePerson,
  };

})();
