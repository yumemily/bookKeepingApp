const Book = require("../models/book") //import the model

exports.createBook = async function (req, res) {
  const { title, genres, author } = req.body; //author is an id

  //this should be handled in the model
  // const authorObj = await Author.findById(author);
  // console.log(authorObj)

  // const genreArray = genres.map(async el => await Author.findById(el))
  // const a = await Promise.all(genreArray) //get the array of genres
  // console.log(a)
  // console.log(genreArray)

  const book = await new Book({
    owner: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email
    },
    title: title,
    genres: genres,
    author: author
  })
  await book.save()
  return res.json({ status: "ok", data: book })
}

exports.readBook = async (req, res) => {
  try {
    const books = await Book.find({ "owner._id": req.user._id });
    return res.status(200).json({ status: "ok", data: books })
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message })
  }
}

// exports.updateBook = async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     // iterating over all fields in request body.
//     const fields = Object.keys(req.body);
//     fields.map(field => book[field] = req.body[field]);
//     await book.save();
//     res.status(200).json({ status: "success", data: book });
//   } catch (err) {
//     res.status(400).json({ status: "fail", message: err.message });
//   };
// };

exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book.owner._id.toString() !== req.user._id.toString()) {
    return res.status(401).json({ error: "forbidden", message: "You can't edit this book." })
  } else {
    const fields = Object.keys(req.body);
    fields.map(field => book[field] = req.body[field]);
    await book.save();
    res.status(200).json({ status: "success", data: book });
  }
};

//only delete books owned by owner
exports.deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  console.log('BOOK', book.owner._id)
  console.log("USER", req.user._id)
  if (book.owner._id.toString() !== req.user._id.toString()) {
    return res.status(401).json({ error: "forbidden", message: "You can't delete this book." })
  } else {
    await Book.findByIdAndDelete(req.params.id);
    return res.status(204).json({ status: "success", data: null });
  }
}


//findbyIdAndUpdate, how do you use save if it's already being used