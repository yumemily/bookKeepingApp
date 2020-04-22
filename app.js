const express = require("express");
require("dotenv").config();

const app = express();
const router = express.Router();

const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const {createAuthor, readAuthor, updateAuthor, deleteAuthor} = require("./src/controllers/authorControllers")
const {createGenre, readGenres} = require("./src/controllers/genreControllers")
const {createBook, readBook, updateBook} = require("./src/controllers/bookControllers")
const {createUser} = require("./src/controllers/userControllers")
const {login, logout, auth} = require("./src/controllers/authControllers")

mongoose.connect(process.env.DB_LOCAL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=> console.log('connected to database')).catch(err=> console.log(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);

app.get("/", (req,res) => {
    return res.status(200).json({status:"ok", data:[]})
})

// AUTHORS
router.route("/authors")
.post(createAuthor)
.get(readAuthor)

router.delete("/authors/:id", deleteAuthor)
router.put("/authors/:id", updateAuthor)

//GENRES
router.route("/genres")
.post(createGenre)
.get(readGenres)
//delete and update genres?

//BOOKS
router.route("/books")
.post(auth, createBook) //.post(auth, createBook)
.get(auth, readBook)

router.put("/books/:id", updateBook)

//USERS
router.route("/users")
.post(createUser)
// .get(readUser)

//LOG IN
router.route("/auth/login")
.post(login)

//LOG OUT
router.get("/auth/logout", auth, logout);

//do not use semicolons in the env file or it'll try to run on port:5000; :-)
app.listen(process.env.PORT, ()=>{
    console.log('app running on port', process.env.PORT)
})

//set up Model with validation (use npm validator) *
//set up routes and controllers for users *
// user sign up => encrypt password => prehook for save do not store raw pw *
//signin => compare => use Schema methods and statics => jwt 
// authenticate jwt => read the header => get token => validate token => true/false : next function or 401