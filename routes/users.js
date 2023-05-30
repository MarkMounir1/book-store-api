const express = require("express");
const router = express.Router();

// import el verify token
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

const {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../controllers/userController");

// api/users
router.get("/", verifyTokenAndAdmin, getAllUsers);

//api/users/:id
router
  .route("/:id")
  .put(verifyTokenAndAuthorization, updateUser)
  .get(verifyTokenAndAuthorization, getUserById)
  .delete(verifyTokenAndAuthorization, deleteUserById);

router;

router;

module.exports = router;
