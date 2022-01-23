
  let inputDate = document.getElementById('resDate');
  let inputDays = document.getElementById('resDays');
  let submitForm = document.getElementById('submitForm');
  let result = document.getElementById('reult');


  const formatYmd = date => date.toISOString().slice(0, 10);    

  inputDate.defaultValue = formatYmd(new Date());

  submitForm.addEventListener('click', onSubmit);

  


  function onSubmit(e) {
    e.preventDefault();     
    let pr = new Promise((res, rej) => {
      let d = new Date(inputDate.value);
      res(d);
    });

    pr.then((d) => {
      d.setDate(d.getDate() + Number(inputDays.value));
      reult.value = d.toLocaleDateString('sl-SL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });


    })
  }
