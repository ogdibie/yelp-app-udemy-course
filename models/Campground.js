const mongoose = require("mongoose");
const Review = require("./review");
const { Schema } = mongoose;

const imageSchema = new Schema({
  url: String,
  filename: String,
});
imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const campgroundSchema = new Schema({
  title: String,
  images: [imageSchema],
  price: Number,
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  description: String,
  location: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

campgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

const Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;
