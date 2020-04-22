const mongoose = require('mongoose')
const Genre = require('./genre')

const Author = require('./author')
//create book schema
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title of book is required"],
        trim: true
    },
    owner: {
        type: Object,
        require: [true, "Blog must have an owner"]
    },
    genres: Array, //multiple genres per book, so we need an array of objects 
    author: Object //only one author per book
})

//if you use arrow function here you will lose "this"
//this < is the class schema
bookSchema.pre('save', async function(next){
    this.author = await Author.findById(this.author)
    const genreArray = this.genres.map(async el=> await Genre.findById(el))
    this.genres = await Promise.all(genreArray) //returns a single Promise that fulfills when all of the promises passed as an iterable have been fulfilled
    console.log(this)
    next()
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book