const express = require('express');
const router =express.Router()

const userController = require("../controllers/userController")
const booksController = require("../controllers/booksController")
const auth = require("../middlewares/authentication")

router.post("/register",userController.createUser)
router.post("/login",userController.loginUser)
router.post("/books",auth.isAuthenticate,auth.authorization,booksController.createBook)

router.get("/books",auth.isAuthenticate,booksController.getBooks)
router.get("/books/:bookId",auth.isAuthenticate,booksController.getBook)

router.put("/books/:bookId",auth.isAuthenticate,auth.authorization,booksController.updateBook)
module.exports= router

