const Book = require("../models/book");

async function validateBook(req, res, next) {
    const bookId = req.params.bId;
    try {
        const book = await Book.findById(bookId)
        if (!book) return res.status(404).json({ status: "fail", error: "book does not exist" })
        req.book = book;
        next()
    } catch (err) {
        return res.status(500).json({ status: "fail", error: err.message })
    }
}

module.exports = validateBook;