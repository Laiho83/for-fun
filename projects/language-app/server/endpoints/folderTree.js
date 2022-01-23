const fs = require('fs');
const path = require('path');
let depth;

exports.folderTree = function (dir, dep, done, async=false) {
  depth = parseInt(dep)+1;
    if(async) {
        return paralelWalk(dir, done);
    } else {
        return serialWalk(dir, done);
    }
};

// Serial loop
var serialWalk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var i = 0;
      (function next() {
        var file = list[i++];
        if (!file) return done(null, results);
        file = path.resolve(dir, file);
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory() && path.relative(process.cwd(), file).split('/').length < depth) {
            serialWalk(file, function(err, res) {
                results = results.concat(res);
              next();
            });
          } else {
            results.push(path.relative(process.cwd(), file));
            next();
          }
        });
      })();
    });
  };

// Paralel loop
  var paralelWalk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var pending = list.length;
      if (!pending) return done(null, results);
      list.forEach(function(file) {
        file = path.resolve(dir, file);
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory() && path.relative(process.cwd(), file).split('/').length < depth) {
            paralelWalk(file, function(err, res) {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            results.push(path.relative(process.cwd(), file));
            if (!--pending) done(null, results);
          }
        });
      });
    });
  };