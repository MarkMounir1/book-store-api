// awl 7aga a3ml import ll express
const express = require("express");
const booksPath = require("./routes/books");
const authorsPath = require("./routes/authors");
//lazm a3ml auth path 3shan a7oto ta7t f comment el Routes
const authPath = require("./routes/auth");
//lazm a3ml user path 3shan a7oto ta7t f comment el Routes
const usersPath = require("./routes/users");
//const mongoose = require("mongoose");
const connectToDB = require("./config/db");
//import logger
const logger = require("./middlewares/logger");
// import errors
const {notFound,errorHandler}= require("./middlewares/errors");
//env
const dotenv = require("dotenv").config();




//connection to database
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected To MongoDB..."))
//   .catch((error) => console.log("Connection Failed To MongoDB!", error));

connectToDB();


//Init App
const app = express();

//HTTP Methods or Verbs
// app.get();
// app.post();
// app.put();
// app.delete();

//Apply Middlewares
app.use(express.json()); //bya5od el req mn el client w y7awlha l json file fa el express hy3rf en dh json file // by7awl el json l javascript object

//el comment eli t7t dh before making miidle ware folder
/*app.use((req, res, next) => {
  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
});*/
app.use(logger);

// Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
app.use("/api/auth",authPath);
app.use("/api/users",usersPath);


//Error Handler MiddleWare

//el comment eli t7t dh before making miidle ware folder
/*
app.use((req,res,next)=>{
const error = new Error(`Not Found - ${req.originalUrl}`);
res.status(404);
next(error); // haya5od el el error ydeh ll middle ware eli b3do yhandlo
})
*/
app.use(notFound);



//el comment eli t7t dh before making miidle ware folder
/*
app.use((err,req,res,next)=>{
  const statusCode = res.statusCode ===200 ? 500 :res.statusCode;
  res.status(statusCode).json({message: err.message});
})
*/

app.use(errorHandler);



// Running The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
