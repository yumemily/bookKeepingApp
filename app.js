const express = require("express");
require("dotenv").config();

const app = express();
const router = express.Router();

const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const validateBook = require("./src/middlewares/validateBook");

const {createAuthor, readAuthor, updateAuthor, deleteAuthor} = require("./src/controllers/authorControllers")
const {createGenre, readGenres, updateGenre, deleteGenre} = require("./src/controllers/genreControllers")
const {createBook, readBook, updateBook, deleteBook} = require("./src/controllers/bookControllers")
const {createUser, readUser, updateUser, readUsers} = require("./src/controllers/userControllers")
const {login, logout, logoutAll, auth} = require("./src/controllers/authControllers")
const {createReview, readReviews} = require("./src/controllers/reviewControllers")

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

router.put("/authors/:id", updateAuthor)
router.delete("/authors/:id", deleteAuthor)

//GENRES
router.route("/genres")
.post(createGenre)
.get(readGenres)

router.put("/genres/:id", updateGenre)
router.delete("/genres/:id", deleteGenre)

//REVIEWS
router.route("/books/:bId/reviews")
.post(auth, validateBook, createReview)
.get(auth, validateBook, readReviews)

//BOOKS
router.route("/books")
.post(auth, createBook) //.post(auth, createBook)
.get(auth, readBook)

router.put("/books/:id", auth, updateBook) //only the owner can edit the book
router.delete("/books/:id", auth, deleteBook) // only the owner can delete the book


//USERS
router.route("/users")
.post(createUser)
.get(readUsers)
//I don't think I want to show all other users?

//update user information and get user profile
router.put("/users/:id", auth, updateUser)/
router.get("/users/me", auth, readUser)

//LOG IN
router.route("/auth/login")
.post(login)

//LOG OUT
router.get("/auth/logout", auth, logout);
router.get("/auth/logoutAll", auth, logoutAll)

app.listen(process.env.PORT, ()=>{
    console.log('app running on port', process.env.PORT)
})

//set up Model with validation (use npm validator) *
//set up routes and controllers for users *
// user sign up => encrypt password => prehook for save do not store raw pw *
//signin => compare => use Schema methods and statics => jwt 
// authenticate jwt => read the header => get token => validate token => true/false : next function or 401

//thurs - referencing approach as opposed to embedding!
//Add a  new feature: Review on Books (user, content)
//1. create model + relationship
//2. route + controllers
//2.a Crreate a new review for a book => need user ID. book ID
//2.b write to our database => return book and review data