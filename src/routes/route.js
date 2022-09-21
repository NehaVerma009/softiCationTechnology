const express = require('express');
const router =express.Router()

const userController = require("../controllers/userController")
<<<<<<< HEAD
const booksController = require("../controllers/booksController")

router.post("/register",userController.createUser)
router.post("/login",userController.loginUser)
router.post("/books",booksController.createBook)
=======
const bookController = require("../controllers/bookController")
const authentication = require("../middlewares/authentication")

router.post("/register",userController.createUser)
router.post("/login",userController.loginUser)
router.get("/books/:bookId", bookController.getBook)

>>>>>>> 363bb46 (authorization)

router.get("/books",booksController.getBooks)
module.exports= router

