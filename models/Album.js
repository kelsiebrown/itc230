// require mongoose
var mongoose = require('mongoose');

// remote db connection settings
// credentials removed for security
var connectionString = "<removed>";
mongoose.connect(connectionString);

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

module.exports = mongoose.model('Album', albumSchema);