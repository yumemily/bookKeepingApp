const User = require("../models/user")

exports.createUser = async function (req, res) {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password })
        return res.status(201).json({ status: "ok", data: user })
    } catch (err) {
        return res.status(400).json({ status: "fail", error: err.message })
    }
}

exports.readUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        console.log(user)
        return res.status(200).json({ status: "ok", data: user })
    } catch (error) {
        return res.status(400).json({ status: "fail", message: error.message })
    }
}

exports.readUsers = async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json({ status: true, data: user });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  };

// exports.updateUser = async (req, res) => {
//     try {
//         const user = await User.find({ "_id": req.user._id });
//         console.log(user)
//         // iterating over all fields in request body.
//         const fields = Object.keys(req.body);
//         console.log(fields)
//         fields.map(field => user[field] = req.body[field]);
//         await user.save();
//         res.status(200).json({ status: "success: updated user", data: user });
//     } catch (err) {
//         res.status(400).json({ status: "fail", message: err.message });
//     };
// };

exports.updateUser = async (req, res) => {
    try {
        // const user = await User.findByIdAndUpdate({ id });
        // const { id } = req.params;
        const user = await User.findByIdAndUpdate( {_id: req.params.id}, req.body, { new:true }) //{ new:true } to have the new returned object updated
        return res.status(201).json({ status: "ok", data: user}) //200 - req has succeeded
    } catch (err) {
        return res.status(400).json({ status: "fail", data: err.message })
    }
}