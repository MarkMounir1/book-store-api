//hn3ml seeding ll 6 book eli f data.js 3shan yt7ato mara wa7da fy el database
//import el model
const {Book} = require("./models/Book");
//import ll author model
const {Author} = require("./models/Author");
//import llmkan eli feh el array
const {books,authors} = require("./data")
//lazm el mongo db hna lwa7dha 3shan dh unique lnafso
const connectToDB=require("./config/db");
//  dot env 3shan 2olna el file dh monfasl lwa7do
require("dotenv").config();

//Connect To DB
connectToDB();

// Import Books (seeding database)

const importBooks = async()=>{
    try {
        // hna ba5zn el bynat eli gowa books array gowa el Book collection database
        await Book.insertMany(books);
        console.log("Books Imported");
    } catch (error) {
        //fo2 f line 12 ana 3mlt connect m3 el datbase lw feh ay error haytl3 mn el process 
        console.log(error);
        process.exit(1);
    }
}

// Import Authors (seeding database)

const importAuthors = async()=>{
    try {
        // hna ba5zn el bynat eli gowa books array gowa el Book collection database
        await Author.insertMany(authors);
        console.log("Authors Imported");
    } catch (error) {
        //fo2 f line 12 ana 3mlt connect m3 el datbase lw feh ay error haytl3 mn el process 
        console.log(error);
        process.exit(1);
    }
}

// Remove Books

const removeBooks = async()=>{
    try {
        // hna byms7 el bynat kolaha eli gowa books array gowa el Book database
        await Book.deleteMany();
        console.log("Books Removed");
    } catch (error) {
        //fo2 f line 12 ana 3mlt connect m3 el datbase lw feh ay error haytl3 mn el process 
        console.log(error);
        process.exit(1);
    }
}

//How to run w hn3ml run llfile dh bs 
// 1) node seeder el node f index 0 w el seeder f index 1
// 2) el argv dh esm el array eli bykon feha node seeder eli katbtohom fl cmd
// 3) lw el index rakm 2 kan -import eli t7t fy ek function hay import
// 4) lw el index rakm 2 kan -remove hay remove
if(process.argv[2]==="-import"){
    importBooks();
}else if (process.argv[2]==="-remove"){
    removeBooks();
}else if (process.argv[2]==="-import-authors"){
    importAuthors();
}