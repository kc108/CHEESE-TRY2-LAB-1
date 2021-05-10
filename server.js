///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 3000, MONGODB_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// IMPORT MONGOOSE
const mongoose = require("mongoose");

// IMPORT MIDDLEWARE
const cors = require("cors");
const morgan = require("morgan");

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// ESTABLISH CONNECTION
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
});

///////////////////////////////
// CONNECTION EVENTS
////////////////////////////////
const db = mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));


///////////////////////////////
//MODELS
////////////////////////////////
const CheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
});

const Cheese = mongoose.model("Cheese", CheeseSchema);

// MIDDLEWARE
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// CHEESE INDEX ROUTE 
app.get("/cheese", async (req, res) => {
    try {
        // send all cheese
        res.json(await Cheese.find({}));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
});

// CHEESE CREATE ROUTE
app.post("/cheese", async (req, res) => {
    try {
        // send all cheese
        res.json(await Cheese.create(req.body));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
});

// CHEESE UPDATE ROUTE
app.put("/cheese/:id", async (req, res) => {
    try {
        // send all cheese
        res.json(
            await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
});

// CHEESE DELETE ROUTE
app.delete("/cheese/:id", async (req, res) => {
    try {
        // send all cheese
        res.json(await Cheese.findByIdAndRemove(req.params.id));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));