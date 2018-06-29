//index.js for week 1 assignment

var http = require('http');
http.createServer(function(req,res){
    var path = req.url.toLowerCase();
    switch(path){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Welcome to the home page!');
            break;
        case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('This is the about page. Some content about my app will go here later.');
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('This page does not exist!');
            break;
    }
}).listen(process.env.PORT || 3000);