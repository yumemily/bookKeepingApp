const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken")

//Set up user schema and validation
//Use validator library
const schema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true,
        lowercase: true, //convert email to lowercase
        validate: {
            validator: function (value) { //return true or false for parsing validation
                return validator.isEmail(value)
            }
        }
    },
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    tokens: [String]
})

// var jsonToken = jwt.sign({ email:"bar" }, process.env.SECRET)
schema.statics.loginWithCredentials = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("user not found")
    console.log(email, password, user.password)
    const allow = await bcrypt.compare(password.toString(), user.password) //user.password is the hashed pw, password is the raw pw from req
    if (!allow) throw new Error("Password incorrect")

    return user
}

// generator token
schema.methods.generateToken = async function () {
    const jsonToken = jwt.sign({ email: this.email, id: this._id }, process.env.SECRET) //this here is the user instance
    //save token into db
    this.tokens.push(jsonToken);
    await this.save();
    return jsonToken
}

//right before we save pw, we change the value of pw
schema.pre("save", async function (next) {
    if (!this.isModified("password"))  return next(); //pass in the name of the field, password
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
})

//Delete fields we don't want to show
schema.methods.toJSON = function () {
    console.log(this) //this is the user object, we want to delete password and __v so user can't see them
    const newObj = this.toObject()
    delete newObj.password;
    delete newObj.__v
    return newObj
}

const User = mongoose.model("User", schema)

module.exports = User