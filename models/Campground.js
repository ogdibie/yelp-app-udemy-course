const mongoose = require("mongoose");
const { Schema } = mongoose;

const campgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
});

const Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;
