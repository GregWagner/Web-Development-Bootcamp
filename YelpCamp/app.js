const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));

// const methodOverride = require("method-override");
// const ejs = require("ejs");
// const Campground = require("./models/campground");
// const Comment = require("./models/comment");
// const seedDB = require("./seeds");

app.get('/', (req, res) => {
    res.render("home");
})

app.listen(3000, () => {
    console.log("The YelpCamp Server Has Started on  port 3000!");
})