const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.port||5000;

//Create public folder as static
app.use(express.static(path.join("public")));

//Set up middleware to parse json requests
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

//MongoDB connection setup
const mongoURI = "mongodb://localhost:27017/Assignment4"; 
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", ()=>{
    console.log("Connected to MongoDB Database");
});

// Define High Score Schema & Model
const highScoreSchema = new mongoose.Schema({
    name: String,
    score: Number,
});
const HighScore = mongoose.model("HighScore", highScoreSchema);

//Post route for high score
app.post("/submit-score", async (req, res) => {
    try {
        const { name, score } = req.body;
        const newScore = new HighScore({ name, score });
        await newScore.save();
        res.json({ message: "Score saved!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving score", error });
    }
});

//Read route for high score
app.get("/highscores", async (req, res) => {
    try {
        const scores = await HighScore.find().sort({ score: -1 }).limit(10);
        res.json(scores);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving scores", error });
    }
});

//Starts the server
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});