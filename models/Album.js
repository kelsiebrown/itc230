// require mongoose
var mongoose = require('mongoose');

// remote db connection settings
// NOTE - PLEASE REMOVE BEFORE PUSHING TO REPO!!!!!!!!!!!!!!!
// REMOVE ME!!!!!
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}};
var connectionString = "mongodb://week4_assignment:raaa1451@ds137687.mlab.com:37687/week4";
mongoose.connect(connectionString, options);

// display any console errors
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'Connection error: '));

// define Album model
var albumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true},
    artist: String,
    price: String,
    releasedate: Date
});

// export schema
module.exports = mongoose.model('Album', albumSchema);