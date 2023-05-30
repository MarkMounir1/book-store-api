const asyncHandler = require("express-async-handler");
const {
    validateCreateBook,
    validateUpdateBook,
    Book,
  } = require("../models/Book");




/**
 * @desc  Get all books
 * @route  /api/books
 * @method  GET
 * @access  public
 */


const getAllBooks = asyncHandler(async (req, res) => {
    //ay query hategy mn el client htkon fl object dh ?price=10 b3d el link
    //console.log(req.query);
    //el mafrod hna ab2a mtf2 m3 el front 3shan el asamy
    const {minPrice,maxPrice}= req.query;

    let books;
    if(minPrice&&maxPrice){
     books = await Book.find({price:{$gte:minPrice, $lte:maxPrice}}).populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
    
    }else{
      books = await Book.find().populate("author", [
        "_id",
        "firstName",
        "lastName",
      ]);
    }

    //Comparison Query Operator
    // $eq deh mn el mongo db w bttsma query operator ,$ne not equal
    // w m3naha geb el kotob eli s3rha 10
    //$eq (equal)
    //$ne (not equal)
    //$lt (less than)                //{price:{$in:[8,9]}}
    //$lte (less than or equal)
    //$gt (greater)
    //$gte (greater than or equal)
    //$in (bta5od array feha arkam wtrag3 el as3ar eli hat7otha fl array)
    //$nin (bta5od array feha arkam w hatrg3 kol el as3ar ma 3da eli fl array)
    //const books = await Book.find({price:{$gte:minPrice, $lte:maxPrice}})
    // .populate("author", [
    //   "_id",
    //   "firstName",
    //   "lastName",
    // ]);
    res.status(200).json(books);
  })

/**
 * @desc  Get book by id
 * @route  /api/books/:id
 * @method  GET
 * @access  public
 */

  const getBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate("author"); //books.find((b) => b.id === parseInt(req.params.id));

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  })


  /**
 * @desc  Create new book
 * @route  /api/books
 * @method  POST
 * @access  private (only admin)
 */
  const createBook = 
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
    // books.push(book);
    const result = await book.save();
    res.status(201).json(result);
  })


/**
 * @desc  Update a book
 * @route  /api/books/:id
 * @method  PUT
 * @access  private (only admin)
 */

  const updateBook = asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.sendStatus(400).json({ message: error.details[0].message });
    }

    const updateBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.price,
        },
      },
      { new: true }
    ); //y3teny el updated book
    res.status(200).json(updatedBook); // arslha ll client
  })


  /**
 * @desc  Delete a book
 * @route  /api/books/:id
 * @method  DELETE
 * @access  private (only admin)
 */

  const deleteBook= asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id); //books.find((b) => b.id === parseInt(req.params.id));
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "book has been deleted" });
    } else {
      res.status(404).json({ message: "book not found" });
    }
  })

  module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook

  }