//index.js for ITC 230 assignments 1 & 2

var http = require("http"), fs = require('fs'), qs = require('querystring');
let albums = require("./lib/albums.js");

function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  console.log(__dirname + path)
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}

http.createServer(function(req,res){
  let url = req.url.split("?");
  let query = qs.parse(url[1]);
  let path = url[0].toLowerCase();
    
  switch(path) {
    case '/': 
      serveStatic(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('This is the about page');
      break;
    case '/get':
      let found = albums.get(query.title);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let results = (found) ? JSON.stringify(found) : "Not found";
      res.end('Results for ' + query.title + "\n" + results);
      break;
    case '/delete':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end("The following album was deleted: \n" + query.title);
      break;
    case '/add':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end("Added album title: \n" + query.title);
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404: Page not found.');
  }
}).listen(process.env.PORT || 3000);
