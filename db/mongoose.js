const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/yelp-campground")
  .then(() => {
    console.log("Mongoose Connection Open");
  })
  .catch((err) => {
    console.log("Oh no, Mongoose something went wrong");
    console.log(err);
  });
