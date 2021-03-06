// index.js for ITC230
// up thru and including week 6 assignment

'use strict'

const express = require("express");
const Album = require("./models/Album");
const bodyParser = require("body-parser");
const app = express();

// set port to 3000 with Express
app.set('port', process.env.PORT || 3000);
app.use(require("body-parser").urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', require("cors")());
app.use((err, req, res, next) => {
  console.log(err)
});

// set up handlebars template engine
let handlebars = require("express-handlebars");
app.engine(".html", handlebars({extname: ".html"}));
app.set("view engine", ".html");

// static file for home.html
app.get('/', (req, res, next) => {
    Album.find((err, albums) => {
        console.log(albums);
        if (err) return next(err);
        res.render('home', {albums: JSON.stringify(albums)});
    });
});

// plain text response for about page
app.get('/about', (req, res) => {
    res.type('text/plain');
    res.render("Here's the about page.");
});

// GET response for get path
app.get('/get', (req, res) => {
    Album.findOne({ title: req.query.title }, (err, albums) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {found: albums} );
    });
});

// POST response for get path
app.post('/get', (req, res) => {
    Album.findOne({ title: req.body.title }, (err, albums) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {found: albums} );
    });
});

// GET response for delete path
app.get('/delete', (req, res) => {
    Album.remove({ title: req.query.title}, (err, result) => {
        if (err) return next(err);
        let deleted = result.result.n !== 0;
        Album.count((err, total) => {
            res.type('text/html');
            res.render('delete', {
                title: req.query.title,
                //deleted: result.result,
                deleted: result.result.n !==0,
                total: total });
        });
    });
});


// APIs
// get all albums
app.get('/api/albums', (req, res, next) => {
    let title = req.params.title;
    console.log(title);
    Album.find((err, results) => {
        if (err || !results) return next(err);
        res.json(results);
    })
});

// get a single album
app.get('/api/album/:title', (req, res, next) => {
    let title = req.params.title;
    Album.findOne({title: title}, (err, found) => {
        if (err || !found) return next(err);
        res.json(found);
    });
});

// delete an album
app.get('/api/delete/:id', (req, res, next) => {
    Album.remove({"_id":req.params.id}, (err, found) => {
        if (err) return next(err);
        res.json({"deleted": found.result});
    });
});

// add or update an album based on id
app.post('/api/add', (req, res, next) => {
    if (!req.body._id) {
        // add new album
        let album = new Album({
            title: req.body.title, 
            artist: req.body.arist, 
            price: req.body.price
        });
        album.save((err, newAlbum) => {
            if (err) return next(err);
            console.log(newAlbum) 
            res.json({
                updated: 0, 
                _id: newAlbum._id
            });
        });
    } else {
        // update album
        Album.updateOne({ _id: req.body._id}, {title: req.body.title, artist:req.body.artist, price: req.body.price }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
});

// add or update an album based on parameters
app.get('/api/add/:title/:artist/:price', (req, res, next) => {
    let title = req.params.title;
    Album.update({title: title}, {title:title, artist: req.params.artist, price: req.params.price}, {upsert: true}, (err, result) => {
        if (err) return next(err);
        res.json({updated: result.n});
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