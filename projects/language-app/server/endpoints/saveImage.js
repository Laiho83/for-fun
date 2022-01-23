const fs = require('fs');
let baseImage = '';
let filename;
let base64Data;

exports.saveImage = function (req, path, done) {
  req.on('data', function (chunk) {
    body = '';
    baseImage += chunk.toString();

    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
    const fileType = baseImage.substring("data:".length,baseImage.indexOf("/"));
    //Forming regex to extract base64 data of file.
    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
    //Extract base64 data.
    base64Data = baseImage.replace(regex, "");
    const rand = Math.ceil(Math.random()*1000);
    //Random photo name with timeStamp so it will not overide previous images.
    filename = path;
  });
  req.on('end', function () {
     fs.writeFileSync(filename, base64Data, 'base64');
        return 'dskfjhg';
  });
};