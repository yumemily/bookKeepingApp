
const Author = require("../models/author")

exports.createAuthor = async (req, res) => { //why async? we'll run query in database, mongoose returns a promise
    const { name } = req.body;
    //create an author with the name = name
    try {
        const author = await Author.create({ name: name }) //first name is the field, second is the value from the request
        return res.status(201).json({ status: 'ok', data: author }) //201 - req fulfilled and a new resource(s) created
    } catch (err) {
        return res.status(400).json({ status: "fail", error: err.message })
    }
}

exports.updateAuthor = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findByIdAndUpdate(id, { name: req.body.name }, { new: true })
        return res.status(200).json({ status: "ok", data: author }) //200 - req has succeeded
    } catch (er) {
        return res.status(400).json({ status: "fail", data: err.message })
    }
}

exports.readAuthor = async (req, res) => {
    const authors = await Author.find();
    return res.status(200).json({ status: "ok", data: authors })
}

exports.deleteAuthor = async (req, res) => {
    console.log(req.params)
    const { id } = req.params
    try {
        await Author.findByIdAndDelete(id)
        return res.json(204).json({ status: "ok", data: null }) //204 -> delete, don't expect returned data
    } catch (er) {
        return res.status(400).json({ status: "fail", error: err.message })
    }
}

// module.exports = {createAuthor}