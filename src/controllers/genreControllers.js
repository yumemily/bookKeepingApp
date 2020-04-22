const Genre = require("../models/genre")

exports.createGenre = async (req, res) => { //why async? we'll run query in database, mongoose returns a promise
    //create an author with the name = name
    try {
        const genre = await Genre.create({ genre: req.body.genre }) //first name is the field, second is the value from the request
        return res.status(201).json({ status: 'ok', data: genre })
    } catch (err) {
        return res.status(400).json({ status: "fail", error: err.message })
    }
}

exports.readGenres = async(req,res)=>{
    const genres = await Genre.find()
    return res.status(200).json({ status: "ok", data: genres })
}

exports.updateGenre = async(req,res) => {
    const { id } = req.params;
    try {
        const genre = await Genre.findByIdAndUpdate(id, { genre: req.body.genre }, { new: true });
        return res.status(200).json({ status: true, data: genre });
    } catch (err) {
        return res.status(400).json({ status: false, error: err.message });
    }
  }

  exports.deleteGenre = async(req,res) => {
    const { id } = req.params;
    try {
        await Genre.findByIdAndDelete(id)
        return res.status(204).json({ status: true, data: null });
    } catch (err) {
        return res.status(400).json({ status: false, error: err.message });
    }
  }