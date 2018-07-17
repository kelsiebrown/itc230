// index.js for ITC230

'use strict'

let albums = require("./lib/albums.js");

// set up express
const express = require("express");
const app = express();

// set port to 3000
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

// set up handlebars
let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: ".html"}));
app.set("view engine", ".html");

// static file for home.html
app.get('/', (req, res) => {
    res.type('text/html');
    res.sendFile(__dirname + '/public/home.html');
});

// plain text response for about page
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('This is the about page');
});

// GET response for delete path
app.get('/delete', (req, res) => {
    let deleted = albums.delete(req.query.title);
    res.render("delete", {title: req.query.title, deleted: deleted});
});

// POST response for get path
app.post('/get', (req, res) => {
    console.log(req.body);
    let found = albums.get(req.body.title);
    res.render("details", {title: req.body.title, found: found});
});

// USE response for 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Page Not Found');
});

// start server
app.listen(app.get('port'), () => {
    console.log('Express started');
});