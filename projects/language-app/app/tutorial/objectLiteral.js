(function() {
  var people = {
    people: ['Will', 'Steve'],
    init: function() {
      this.cacheDom();
      this.bindEvents();
      this.render();
    },

    cacheDom: function() {
      this.$template = document.getElementById('template');
      this.$input = document.getElementById('inputPeople');
      this.$add = document.getElementById('addPerson');
      this.$output = document.getElementById('people');
      this.$remove = document.getElementsByClassName('del')[0];
    },

    bindEvents: function() {
      this.$add.addEventListener('click', this.addPerson.bind(this));
      this.$output.addEventListener('click', this.removePerson.bind(this));
    },

    render: function() {
      this.$output.innerHTML = '';
      if(this.people) {
        this.people.forEach(function(val, index) {
          var temp = this.template(val);
          this.$output.appendChild(temp);
        }.bind(this));
      }
    },

    addPerson: function(val) {
      var temp = val.length>0 ? val : this.$input.value;
      this.people.push(temp);
      this.render();
    },

    removePerson(e) {
      if (e.target && e.target.className === 'del') {
        var target = e.target.closest('.item');
        var children = this.$output.children;
        for (var i = 0; i < children.length; i++) {
          if (children[i] == target) {
            this.people.splice(i, 1);
            this.render();
            break;
          }
        }
      }
    },

    template: function(val) {
      var temp = document.createElement('li');
      temp.className = 'item';
      temp.innerHTML = this.$template.innerHTML;
      temp.querySelector('.people-name').innerHTML = val;
      return temp;
    },
  };

  people.init();
})();


