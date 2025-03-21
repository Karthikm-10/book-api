const mongoose = require("mongoose")
//Defining book Schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, required: true },
    genre: { type: String, required: true }
    }, { timestamps: true }
)

const bookModel = mongoose.model('Book', bookSchema);

module.exports=bookModel;