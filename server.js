const express=require("express");
const mongoose=require("mongoose");
require('dotenv').config();
const Movies=require("./model/movieSchema");

const app=express();

app.use=express.json();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB successfully"))
.catch((error) => console.log("Failed to connect to MongoDB"))

app.get("/", async (req,res) => {
    try{
        const {title, director, genre, releasedyear, availablecopies} = req.body;
        const movie=await Movies.find();
        if(!movie){
            return res.status(404).json({ message: "Movie not found"});
        }
        await movie.save();
        res.statusMessage(200).json(movie);
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.get("/:id", async (req,res) => {
    try{
        const {title, director, genre, releasedyear, availablecopies} = req.body;
        const {id} = req.params.id;
        const movie=await Movies.findById({id});
        if(!movie){
            return res.status(404).json({ message: "Movie not found"});
        }
        await movie.save();
        res.statusMessage(200).json(movie);
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.post("/add-movie", async (req,res) => {
    try{
        const {title, director, genre, releasedyear, availablecopies} = req.body;
        if(!title || !director || !genre || !availablecopies){
            return res.status(400).json({message: "Fill the required fields"});
        }
        const newMovie=new Movies(req.body);
        await newMovie.save();
        res.status(201).json({message: "Movie added successfully", data: newMovie});d
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.put("/update-movie/:id", async (req,res) => {
    try{
        const { title, director, genre, releasedyear, availablecopies } = req.body;
        const { id } = req.params.id;
        const updatedMovie=await Movies.findByIdAndUpdate(req.params.id, { title, director, genre, releasedyear, availablecopies }, {new: true});
        if(!updatedMovie){
            return res.status(400).json({message: "Movie not found"});
        }
        await updatedMovie.save();
        res.status(200).json({message: "Movie updated successfully", data: updatedMovie});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.put("/delete-movie/:id", async (req,res) => {
    try{
        const { title, director, genre, releasedyear, availablecopies } = req.body;
        const { id } = req.params.id;
        if(!deletedMovie){
            return res.status(400).json({message: "Movie not found"});
        }
        const updatedMovie=await Movies.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Movie deleted successfully"});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on https://localhost.com:${process.env.PORT}`);
})





