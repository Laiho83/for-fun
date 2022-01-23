const fs = require('fs');
const path = require('path');

exports.res = function(req, res, filePath) {
    extName = String(path.extname(filePath)).toLocaleLowerCase();
    const mimeTypes = {
        '.html' : 'text/html',
        '.js' : 'text/javascript',
        '.css' : 'text/css',
        '.ttf' : 'font/ttf',
    };

    let contentType = mimeTypes[extName] || 'application/octet/stream';
    
    fs.readFile(filePath, (err, content) => {
        if(err && !fs.existsSync('index.html')) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Welcome to custom NodeJs server. To get started create index.html file in root folder.The basic index.html is not set ...');
        } else if(err && fs.existsSync('index.html')) {
            if(err.code == 'ENOENT') {
                fs.readFile('pages/404.html', (err, content) => {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(content, 'utf-8');
                })
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error ' + err.code  + ' . . .\n' );
            }
        }  else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf-8');
        }
    })
};