var stats = (function() {
  var people = 0;

  // cacheDom
  var $statemodule = document.getElementById('stateModule');
  var $statemoduleParent = document.getElementById('stateModule').parentElement;
  var $statCount = document.getElementsByClassName('state-count')[0];

  // bind events
  events.on('peopleChange', setPeople);

  render();

  function render() {
    console.log('People cound: ', people);
    $statCount.innerHTML = people;
  }

  function setPeople(newPeople) {
    people = newPeople;
    render();
  }

  function destroy() {
    // $statemoduleParent.removeChild(stateModule);
    events.off('peopleChange', setPeople);
  }

  return {
    destroy: destroy,
  };
})();