const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User", //which collection we point to
        required: true
    },
    content: {
        type: String,
        required: [true, "review needs some content"],
        minLength: 10
    },
    book: {
        type: mongoose.Schema.ObjectId,
        ref: "Book",
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }, // vmongoose creates a virtual object we can define logic about what we want/dont want to show
    toObject: { virtuals: true }
})

const Review = mongoose.model("Review", schema)

module.exports = Review