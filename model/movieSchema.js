const mongoose=require('mongoose');

const movieSchema=new mongoose.Schema({
    title: {type: String, required: true},
    director: {type: String, required: true},
    genre: {type: String, required: true},
    releasedyear: {type: Number},
    availableCopies: {type: Number, required: true}
})

module.exports = mongoose.model("movie", movieSchema);