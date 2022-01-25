(function() {
  var form = {
    resignationDate: null,
    officeDate: null,
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
      this.officeDaysLeft = document.getElementById('officeDay');
    },

    bindEvents() {
      this.submitForm.addEventListener('click', this.onSubmit.bind(this));
    },
    
    render() {
      this.result.value = this.resignationDate.toLocaleDateString('sl-SL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      this.officeDaysLeft.value = this.officeDate.toLocaleDateString('sl-SL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      this.result.parentElement.classList.add('result-active');      
      this.officeDaysLeft.parentElement.classList.add('office-active');      
    },

    renderInit() {
      const formatYmd = date => date.toISOString().slice(0, 10);    
      this.inputDate.defaultValue = formatYmd(new Date());
    },

    onSubmit(e) {
      e.preventDefault();
      this.calculatePeriod().then(d => {
        this.resignationDate = this.calculateLastOfficialDate(d);
        this.officeDate = this.calculateLastOfficeDate(this.resignationDate);
        this.render();
      })
    },

    calculatePeriod() {
      return new Promise((res, rej) => {
        const d = new Date(this.inputDate.value);
        res(d);
      });
    },

    calculateLastOfficialDate(d) {
      d.setDate(d.getDate() + Number(this.inputDays.value));
      return d;
    },

    calculateLastOfficeDate(days) {
      let of = new Date(days);
      let leaveDaysLeft = Math.ceil((Number(this.leaveDays.value)) / 12 * Number(days.getMonth()+1));
      of.setDate(days.getDate() - leaveDaysLeft);


      calc();

      function calc() {
        if(leaveDaysLeft > 1) {
          of.setDate(of.getDate() - 1);
          leaveDaysLeft = (of.getDay() === 0 || of.getDay() === 6) ? leaveDaysLeft : leaveDaysLeft - 1;
          calc();
        }
      }

      return of;
    }
  };

  form.init();
})();