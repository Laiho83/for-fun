const fs = require('fs');
let data;
let filePath = '';

exports.removeJson = function (req, done) {
  req.on('data', function (chunk) {    
    filePath += 'assets/db/' + chunk.toString();
    if(fs.existsSync(filePath)) {
       fs.unlinkSync(filePath);       
    } else {
      console.log('Sorry file does not exist !!!!');
    }
  });
  req.on('end', function () {
    console.log(filePath + ' removed');
    return  done(null, filePath);
  });

};
