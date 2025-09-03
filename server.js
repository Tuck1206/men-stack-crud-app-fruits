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

//app.get("/fruits", async (req, res) => {
  //const allFruits = await Fruit.find();
  //console.log(allFruits); // log the fruits!
  //res.send("Welcome to the index page!")
//})

app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  res.render("fruits/index.ejs", { fruits: allFruits })
});



// server.js

// GET /fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs")
})


//app.get("/fruits/:fruitId", (req, res) => {
  //res.send(
    //`This route renders the show page for fruit id: ${req.params.fruitId}!`
  //)
//})

//app.get("/fruits/:fruitId", async (req, res) => {
  //const foundFruit = await Fruit.findById(req.params.fruitId);
  //res.send(`This route renders the show page for fruit id: ${req.params.fruitId}!`)
//})

app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId)
  res.render("fruits/show.ejs", { fruit: foundFruit })
})




// server.js

// POST /fruits
//app.post("/fruits", async (req, res) => {
  //console.log(req.body);
 // res.redirect("/fruits/new")
//})

// server.js

// POST /fruits
//app.post("/fruits", async (req, res) => {
  //if (req.body.isReadyToEat === "on") {
    //req.body.isReadyToEat = true
  //} else {
   // req.body.isReadyToEat = false
  //}
  //await Fruit.create(req.body)
  //res.redirect("/fruits/new")
//})

// server.js

// POST /fruits
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true
  } else {
    req.body.isReadyToEat = false
  }
  await Fruit.create(req.body)
  res.redirect("/fruits"); // redirect to index fruits
})












app.listen(3000, () => {
  console.log('Listening on port 3000')
})
