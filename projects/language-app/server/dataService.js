const tree = require('./endpoints/folderTree');
const write = require('./endpoints/writeToJson');
const open = require('./endpoints/getJson');
const remove = require('./endpoints/removeJson');
const image = require('./endpoints/saveImage');

module.exports = (req, res, path, query) => {
  if(req.url.includes('/pages')) {
    tree.folderTree(path, query.depth, function(err, response) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    }, true); 
  } else if(req.url.includes('/writeToJson')) {
    write.writeToJson(req, function(err, response) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    });
  } else if(req.url.includes('/getJson')) {
    open.getJson(query.fileName, function(err, response) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    });
  }
  else if(req.url.includes('/removeJson')) {
    remove.removeJson(req, function(err, response) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    });
  }
  else if(req.url.includes('/saveImage')) {
    image.saveImage(req, query.fileName, function(err, response) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
    });
  }
}