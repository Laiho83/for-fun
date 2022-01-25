(function() {
  var form = {
    dates: {
      last: null,
      office: null,
    },
    init() {
      this.cacheDom();
      this.bindEvents();
      this.renderInit();
    },

    cacheDom() {
      this.inputDate = document.getElementById('resDate');
      this.inputDays = document.getElementById('resDays');
      this.leaveDays = document.getElementById('leaveDays');
      this.extraDays = document.getElementById('extra');
      this.submitForm = document.getElementById('submitForm');
      this.result = document.getElementById('result');
      this.officeDaysLeft = document.getElementById('officeDay');
      this.ErrorMsg = document.getElementsByClassName('error')[0];
    },

    bindEvents() {
      this.submitForm.addEventListener('click', this.onSubmit.bind(this));
    },
    
    render() {
      this.ErrorMsg.classList.remove('active');
      this.result.value = this.dates.last.toLocaleDateString('sl-SL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      this.officeDaysLeft.value = this.dates.office.toLocaleDateString('sl-SL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      this.result.classList.add('result-active');      
      this.officeDaysLeft.classList.add('office-active');      
    },

    renderError() {
      this.ErrorMsg.classList.add('active');
      this.result.value = "";
      this.officeDaysLeft.value = ""
      this.result.classList.remove('result-active');      
      this.officeDaysLeft.classList.remove('office-active'); 
    },

    renderInit() {
      const formatYmd = date => date.toISOString().slice(0, 10);    
      this.inputDate.defaultValue = formatYmd(new Date());
    },

    onSubmit(e) {
      e.preventDefault();
      this.calculatePeriod().then(d => {
        if (d.getDay() == 0 || d.getDay() == 6) {
          this.renderError();        
        } else {
          this.dates.last = this.calculateLastOfficialDate(d);
          this.dates.office = this.calculateLastOfficeDate(this.dates.last);
          new Date(this.inputDate.value)
          this.render();
        }
      })
    },

    calculatePeriod() {
      return new Promise((res, rej) => {
        const d = new Date(this.inputDate.value);
        res(d);
      });
    },

    calculateLastOfficialDate(d) {
      d.setDate(d.getDate() + (Number(this.inputDays.value) + 1));
      return d;
    },

    calculateLastOfficeDate(lastDay) {
      let of = new Date(lastDay);
      let leaveDaysLeft = Math.ceil((Number(this.leaveDays.value)) / 12 * Number(lastDay.getMonth()+1));

      calc(of, leaveDaysLeft);
      function calc(d, ldl) {
        if(ldl >= 0) {
          if (d.getDay() == 0 || d.getDay() == 6) {
            ldl = ldl;
          } else {
            ldl = ldl - 1;            
          }
          d.setDate(d.getDate() - 1);
          calc(d, ldl);
        }
      }      
      
      of.setDate(of.getDate() + 1);      
      calc(of, this.extraDays.value)      
      of.setDate(of.getDate() + 1);
      
      return of;
    },
  };

  form.init();
})();
