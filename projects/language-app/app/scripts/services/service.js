var service = {
  getNav: function (callback) {
    request = xmlHttp();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback.call(this.responseText);
      }
    };
    request.open('GET', '/v1/pages?path=assets/db&depth=1');
    request.send();
  },

  getData: function (hash, callback) {
    request = xmlHttp();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback.call(this.responseText);
      }
    };
    request.open("GET", "/v1/getJson?fileName=" + hash + ".json");
    request.send();
  },

  removeData(name, callback) {
    request = xmlHttp();
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback.call(this.responseText);
      }
    };
    request.open("POST", "/v1/removeJson", true);
    request.send(name + '.json');
  },

  saveData: function (hash, cards, callback) {
    request = xmlHttp();
    request.open('POST', '/v1/writeToJson', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(JSON.stringify({
      name: hash,
      data: cards
    }));
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback.call(this.responseText);
      }
    };
  },

  saveImage: function (path,image, callback) {
    request = xmlHttp();
    request.open('POST', '/v1/saveImage?fileName='+path, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(image);
    request.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback.call(this.responseText);
      }
    };
  },

  getRoute: function () {
    return window.location.hash.substring(1) || 'cards';
  },
};

function xmlHttp() {
  var xmlHttp;
  if (window.XMLHttpRequest) {
    try {
      xmlHttp = new XMLHttpRequest();
    } catch (e) {
      xmlHttp = false;
    }
  } else {
    try {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
      xmlHttp = false;
    }
  }

  if (!xmlHttp) {
    console.log('Can\'t create xmlHttpRequest! ');
  } else {
    return xmlHttp;
  }

  return xmlHttp;
};