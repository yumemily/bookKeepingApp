const mongoose = require("mongoose");

//create genre schema

const genreSchema = mongoose.Schema({
    genre: {
        type: String,
        required: [true, "genre name is required"],
        trim: true,
        unique: true
    }
})

const Genre = mongoose.model('Genre', genreSchema)

module.exports = Genre