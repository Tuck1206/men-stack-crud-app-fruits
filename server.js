// Here is where we import modules
const dotenv = require("dotenv") // require package

dotenv.config() // Loads the environment variables from .env file

// We begin by loading Express
const express = require('express')

const app = express()

const mongoose = require("mongoose") // require package

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

const Fruit = require("./models/fruit.js")

app.use(express.urlencoded({ extended: false }))


// server.js

// GET /
//app.get("/", async (req, res) => {
  //res.send("hello, friend!")
//})

// server.js

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs")
})

// server.js

// GET /fruits/new
//app.get("/fruits/new", (req, res) => {
  //res.send("This route sends the user a form page!")
//})

// server.js

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs")
})

// server.js

// POST /fruits
app.post("/fruits", async (req, res) => {
  console.log(req.body);
  res.redirect("/fruits/new")
})











app.listen(3000, () => {
  console.log('Listening on port 3000')
})
