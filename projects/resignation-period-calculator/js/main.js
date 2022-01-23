(function() {
  var form = {
    resignationDate: null,
    init() {
      this.cacheDom();
      this.bindEvents();
      this.renderInit();
    },

    cacheDom() {
      this.inputDate = document.getElementById('resDate');
      this.inputDays = document.getElementById('resDays');
      this.leaveDays = document.getElementById('leaveDays');
      this.submitForm = document.getElementById('submitForm');
      this.result = document.getElementById('result');
    },

    bindEvents() {
      this.submitForm.addEventListener('click', this.onSubmit.bind(this));
    },
    
    render() {
      result.value = this.resignationDate.toLocaleDateString('sl-SL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    },

    renderInit() {
      const formatYmd = date => date.toISOString().slice(0, 10);    
      this.inputDate.defaultValue = formatYmd(new Date());
    },

    onSubmit(e) {
      e.preventDefault();
      this.calculatePeriod().then(d => {
        d.setDate(d.getDate() + Number(this.inputDays.value));
        this.resignationDate = d;
        this.calculateLeaveDays(d);
        this.render();
      })
    },

    calculatePeriod() {
      return new Promise((res, rej) => {
        let d = new Date(this.inputDate.value);
        res(d);
      });
    },

    calculateLeaveDays(d) {
      let leaveDaysLeft = Math.ceil(Number(this.leaveDays.value) / 12) * Number(d.getMonth()+1);      
    }
  };

  form.init();
})();