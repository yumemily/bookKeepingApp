const Review = require("../models/review");

exports.createReview = async function (req, res, next) {
    try {
        const { content } = req.body
        console.log("user", req.user._id)
        console.log("BOOK", req.book.id)
        const review = await Review.create({
            content: content,
            user: req.user._id,
            book: req.book._id
        })
        return res.status(200).json({ status: "ok", data: review })
    } catch (err) {
        return res.status(500).json({ status: "fail", error: err.message })
    }
}

exports.readReviews = async function (req, res){
    try{
    const review = await Review.find({ book: req.book._id })
    .populate("user", "_id name") //populate helps you query further 1st arg is field we're populating, second is 
    .populate({
        path: "books",
        select: "-createdAt -updatedAt -__v"
    })
    res.status(200).json({ status: "ok", data: review })
    }catch(err){
        return res.status(500).json({ status: "fail", error: err.message})
    }
}

//execpopulate  now populate
//what if i want to populate from the child -- use virtuals