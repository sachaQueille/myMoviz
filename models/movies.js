let mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    title: String,
    img: String,
})

let movieModel = mongoose.model('movies', movieSchema)

module.exports = movieModel