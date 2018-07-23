// index.js for ITC230
// up thru and including week 4 assignment

'use strict'

// set up express
const express = require("express");
const app = express();

// update to use mongodb and mongoose
var Album = require("./models/album");

// set port to 3000
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

//display errors
/*app.use((err, req, res, next) => {
    console.log(err)
});*/

// set up handlebars template engine
let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: ".html"}));
app.set("view engine", ".html");

// static file for home.html
app.get('/', (req, res) => {
    Album.find((err, albums) => {
        if (err) return next(err);
        res.render('home', {albums: albums });
    });
});

// plain text response for about page
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.send('This is the about page');
});

// GET response for delete path
app.get('/delete', (req, res) => {
    Album.remove({ title: req.query.title}, (err, deleted) => {
        if (err) return next(err);
        //let deleted = Album.delete(req.query.title);
        Album.count((err, total) => {
            res.type('text/html');
            res.render('delete', {
                title: req.query.title,
                deleted: deleted,
                total: total });
        });
    });
});

// POST response for get path
app.post('/get', (req, res) => {
    Album.findOne({ title: req.body.title }, (err, Album) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {found: Album} );
    });
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