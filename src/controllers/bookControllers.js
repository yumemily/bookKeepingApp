const Book = require("../models/book") //import the model

exports.createBook = async function(req,res){
    const {title, genres, author} = req.body; //author is an id

    //this should be handled in the model
    // const authorObj = await Author.findById(author);
    // console.log(authorObj)

    // const genreArray = genres.map(async el => await Author.findById(el))
    // const a = await Promise.all(genreArray) //get the array of genres
    // console.log(a)
    // console.log(genreArray)

    const book = await new Book({
        title: title,
        genres: genres,
        author: author
    })
    await book.save()
    return res.json({status:"ok", data: book})
}

exports.readBook = async (req, res) => {
    const books = await Book.find();
    return res.status(200).json({ status: "ok", data: books })
}

exports.updateBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      // iterating over all fields in request body.
      const fields = Object.keys(req.body);
      fields.map(field => book[field] = req.body[field]);
      await book.save();
      res.status(200).json({ status: "success", data: book });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err.message });
    };
  };

//findbyIdAndUpdate