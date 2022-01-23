const fs = require('fs');
let body = '';

exports.writeToJson = function (req, done) {
  req.on('data', function (chunk) {
    body = '';
    body += chunk.toString();
    temp = JSON.parse(body);
    if(!fs.existsSync('assets/img/'+temp.name)) {
      fs.mkdirSync('assets/img/'+temp.name);
    }
    filePath = 'assets/db/' + temp.name + '.json';
    console.log(filePath);
  });
  req.on('end', function () {
    fs.writeFile(filePath, body, function (err) {
      if (err) throw err;
      console.log('Data written to file');
      return  done(null, JSON.stringify(temp.data));
    });
  });
};