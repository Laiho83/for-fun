const http = require('http');
const url = require('url');
const service = require('./queryService.js');
const htmlService = require('./htmlService');
const dataService = require('./dataService');

module.exports = http.createServer((req, res) => {
  
    const reqUrl = url.parse(req.url, true);
    let filePath = reqUrl.pathname;

    filePath = setFilePath();

    if(filePath != 'ajaxRequest' && reqUrl.search)  {
      service.sampleRequest(req, res);
    } else if(filePath === 'ajaxRequest') {
        dataService(req, res, reqUrl.query.path, reqUrl.query || 99);
    } else {
        htmlService.res(req, res, filePath.toString());
    } 
    
    function setFilePath() {
      if(filePath == '/') {
          return 'index.html';
      } else if(filePath.includes('.')) {
        let temp = filePath.slice(1);
        return temp;
      }else if(!filePath.includes('v1/')) {
          return 'pages/'+filePath+'.html';
      } else if(filePath.includes('v1/')) {
          return 'ajaxRequest';
      }      
    }
});