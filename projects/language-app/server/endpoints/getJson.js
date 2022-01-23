const fs = require('fs');
let data;
exports.getJson = function (fileName, done) {
  if(fs.existsSync('assets/db/'+fileName)) {
    let rawdata = fs.readFileSync('assets/db/'+fileName);
    data = JSON.parse(rawdata);
  }  else {
    data = '{"name":"cards","data":[]}';
  }
  return done(null, data);
};