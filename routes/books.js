const express = require("express");
const router = express.Router();

const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

//ha3ml require ll book controller
const{getAllBooks,getBookById,createBook,updateBook,deleteBook}=require("../controllers/bookController");


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


// app.get("/",(req,res)=>{
//     res.send(" Welcome To Express JS");
// });

//api Books
  //chaining
  router.route("/")
        .get(getAllBooks)
        .post(verifyTokenAndAdmin,createBook);

  router.route("/:id")
        .get(getBookById)
        .put(verifyTokenAndAdmin,updateBook)
        .delete(verifyTokenAndAdmin,deleteBook);     

  //tare2a 3adya mn 8er chaining 
// router.get("/",getAllBooks);

// router.get("/:id",getBookById);

// router.post("/",verifyTokenAndAdmin,createBook);

// router.put("/:id",verifyTokenAndAdmin,updateBook);

// router.delete("/:id",verifyTokenAndAdmin,deleteBook);

module.exports = router;
