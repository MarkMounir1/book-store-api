const mongoose = require("mongoose");


async function connectToDB(){
 
    //Tare2a Gdeda
    try {
       await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To MongoDB...");
    } catch (error) {
        console.log("Connection Failed To MongoDB!", error)
    }

// Tare2a Adema

// mongoose
// .connect(process.env.MONGO_URI)
// .then(() => console.log("Connected To MongoDB..."))
// .catch((error) => console.log("Connection Failed To MongoDB!", error));
}


module.exports = connectToDB;