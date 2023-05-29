const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")
const {
  validateCreateBook,
  validateUpdateBook,Book
} = require("../models/Book");


// const books = [
//   {
//     id: 1,
//     title: "Black Swan",
//     author: "Nasim Taleb",
//     description: "About Black Swan",
//     price: 10,
//     cover: "soft cover",
//   },
//   {
//     id: 2,
//     title: "Rich Dad Poor Dad",
//     author: "Robert Kiyosaki",
//     description: "About Rich Dad Poor Dad",
//     price: 12,
//     cover: "soft cover",
//   },
// ];

/**
 * @desc  Get all books
 * @route  /api/books
 * @method  GET
 * @access  public
 */

// app.get("/",(req,res)=>{
//     res.send(" Welcome To Express JS");
// });

router.get("/", asyncHandler(
  async(req, res) => {
    const books = await Book.find().populate("author",["_id","firstName","lastName"]);
    res.status(200).json(books);
  }
));

/**
 * @desc  Get book by id
 * @route  /api/books/:id
 * @method  GET
 * @access  public
 */

router.get("/:id", asyncHandler(
  async(req, res) => {
    const book =await Book.findById(req.params.id).populate("author"); //books.find((b) => b.id === parseInt(req.params.id));
    
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  }
));

/**
 * @desc  Create new book
 * @route  /api/books
 * @method  POST
 * @access  private (only admin)
 */

router.post("/",verifyTokenAndAdmin ,asyncHandler(
  async(req, res) => {
    const { error } = validateCreateBook(req.body);
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    const book = new Book(
      {
        
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
      }
    )
   // books.push(book);
   const result = await book.save();
    res.status(201).json(result); 
  }
));

/**
 * @desc  Update a book
 * @route  /api/books/:id
 * @method  PUT
 * @access  private (only admin)
 */

router.put("/:id", verifyTokenAndAdmin,asyncHandler(
  async(req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.sendStatus(400).json({ message: error.details[0].message });
    }
  
    const updatedBook = await Book.findByIdAndUpdate(req.params.id,{
      $set:{
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.price,
      }
    },{new:true}) //y3teny el updated book
    res.status(200).json(updatedBook); // arslha ll client
  }));

/**
 * @desc  Delete a book
 * @route  /api/books/:id
 * @method  DELETE
 * @access  private (only admin)
 */

router.delete("/:id",verifyTokenAndAdmin ,asyncHandler(
  async(req, res) => {
    const book = await Book.findById(req.params.id); //books.find((b) => b.id === parseInt(req.params.id));
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "book has been deleted" });
    } else {
      res.status(404).json({ message: "book not found" });
    }
  }
));

module.exports = router;
