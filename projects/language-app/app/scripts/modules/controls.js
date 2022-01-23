var controls = (function () {
  var removeActive = false;
  var imageData = '';

  // cacheDOM
  var $body = document.getElementsByTagName('body')[0];
  var $main = document.getElementById('main');

  var $dropArea = document.getElementById('cardInput');
  var $input = document.getElementById('inputName');  
  var $previewImg = document.getElementById('previewImg');

  var $add = document.getElementById('addElem');
  var $remove = document.getElementById('removeElem');
  var $save = document.getElementById('saveCards');
  var $addCategory = document.getElementById('addCategory');
  var $inputCategory = document.getElementById('inputCategory');

  $upload = document.getElementById('upload');

  // eventEmiter
  events.on('newItem', showAddChat);
  $add.addEventListener('click', addToList);
  $remove.addEventListener('click', setRemoveActive);
  $save.addEventListener('click', saveCards);
  $addCategory.addEventListener('click', addCategory);
  $upload.addEventListener('change', handleUpload);
  
  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(function(event) {
    $body.addEventListener(event, preventDefaults, false);
  });
  $dropArea.addEventListener('drop', handleDrop, false)

  function showAddChat() {
    $main.classList.toggle("cat-active");
  }


  function setInput() {
    return $input.value;
  }

  function getCards() {
    return {
      name: setInput(),
      img: $previewImg.getAttribute('src').includes('default') ? 'assets/img/default.png' : setImage()
    }
  }

  function setImage() {
    var hash = service.getRoute();
    var name = $input.value.split(' ')[0];
    return 'assets/img/' + hash + '/' + name + '.jpg';
  }

  function addToList() {
    events.emit('add', {card: getCards(), img: imageData});
    clearInput();
  }

  function setRemoveActive() {
    events.emit('remove', removeActive = !removeActive);
  }

  function saveCards() {
    events.emit('save');
  }

  function addCategory() {
    var val = $inputCategory.value;
    window.location.hash = '#' + val;
    events.emit('empty');
    saveCards();
    location.reload();
    // events.emit('nav', val);
  }

  function clearInput() {
    $previewImg.setAttribute('src', 'assets/img/default.png');
    imageData = '';
    $input.value = '';
  }

  function handleUpload(e) {
    handleFiles(this.files);
  }

  // Drag & drop image
  function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e) {    
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files);
  }

  function handleFiles(file) {
    let formData = new FormData();

    formData.append('file', file);
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function() {
      imageData = reader.result;
      $previewImg.setAttribute('src', imageData);
    }
  }
})();