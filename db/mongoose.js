const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-campground";
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Mongoose Connection Open");
  })
  .catch((err) => {
    console.log("Oh no, Mongoose something went wrong");
    console.log(err);
  });
