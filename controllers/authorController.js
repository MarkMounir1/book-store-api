const asyncHandler = require("express-async-handler");
const {
    Author,
    validateCreateAuthor,
    validateUpdateAuthor,
  } = require("../models/Author");

  /**
 * @desc  Get all authors
 * @route  /api/authors
 * @method  GET
 * @access  public
 */

  const getAllAuthors = asyncHandler(
    async (req, res) => {
      const{pageNumber}=req.query;
      const authorPerPage = 2;
      //try {
      //.sort({firstName:-1}).select("firstName lastName -_id")
      const authorList = await Author.find()
                                      .skip((pageNumber-1)*authorPerPage)
                                      .limit(authorPerPage);
      res.status(200).json(authorList);
      //} catch (error) {
      //console.log(error);
      //res.status(500).json({ message: "Something went wrong" });
    }
    //}
  )

/**
 * @desc  Get author by id
 * @route  /api/authors/:id
 * @method  GET
 * @access  public
 */

    const getAuthorById = asyncHandler(
        async (req, res) => {
          //try {
          //const author = authors.find(a=>a.id === parseInt(req.params.id));
          const author = await Author.findById(req.params.id);
          if (author) {
            res.status(200).json(author);
          } else {
            res.status(404).json({ message: "author not found" });
          }
          //} catch (error) {
          console.log(error);
          res.status(500).json({ message: "Something went wrong" });
        }
        //}
      )

/**
 * @desc  Create new author
 * @route  /api/authors
 * @method  POST
 * @access  private (only admin)
 */


const createNewAuthor = asyncHandler(
    async (req, res) => {
      const { error } = validateCreateAuthor(req.body);

      if (error) {
        return res.sendStatus(400).json({ message: error.details[0].message });
      }

      //try {
      const author = new Author({
        //id:authors.length+1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      });
      //authors.push(author);
      const result = await author.save();
      res.status(201).json(author);
      //} catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
    //}
  )

  /**
 * @desc  Update an author
 * @route  /api/authors/:id
 * @method  PUT
 * @access  private (only admin)
 */

  const updateAuthor = asyncHandler(
    async (req, res) => {
      const { error } = validateUpdateAuthor(req.body);
      if (error) {
        return res.sendStatus(400).json({ message: error.details[0].message });
      }

      //try {
      const author = await Author.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image,
          },
        },
        { new: true }
      );
      res.status(200).json(author);
      //} catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }

    //}
  )

    /**
 * @desc  Delete an author
 * @route  /api/authors/:id
 * @method  DELETE
 * @access  private (only admin)
 */

    const deleteAuthor = asyncHandler(
        async (req, res) => {
          //try {
          const author = await Author.findById(req.params.id);
          // authors.find((a) => a.id === parseInt(req.params.id));
          if (author) {
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "author has been deleted" });
          } else {
            res.status(404).json({ message: "author not found" });
          }
          //} catch (error) {
          console.log(error);
          res.status(500).json({ message: "Something went wrong" });
        }
        //}
      )

  module.exports = {
    getAllAuthors,
    getAuthorById,
    createNewAuthor,
    updateAuthor,
    deleteAuthor


  }