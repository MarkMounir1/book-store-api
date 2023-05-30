const express = require("express");
const router = express.Router();

const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const {
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

// const authors = [
//   {
//     id: 1,
//     firstName: "Mark",
//     lastName: "Mounir",
//     nationality: "Egyptian",
//     image: "default-image.png",
//   },
// ];


// /api/authors
router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, createNewAuthor);

// /api/authors/:id
router
  .route("/:id")
  .get(getAuthorById)
  .put(verifyTokenAndAdmin, updateAuthor)
  .delete(verifyTokenAndAdmin, deleteAuthor);

// router.get("/",getAllAuthors);

// router.get("/:id",getAuthorById);

// router.post("/", verifyTokenAndAdmin,createNewAuthor);

// router.put("/:id", verifyTokenAndAdmin,updateAuthor);

// router.delete("/:id", verifyTokenAndAdmin,deleteAuthor);

module.exports = router;
