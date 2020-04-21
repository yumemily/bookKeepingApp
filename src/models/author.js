const mongoose = require('mongoose')

//create schema
authorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Author name is required"],
        trim: true
    }
})

const Author = mongoose.model("Author", authorSchema);

module.exports = Author