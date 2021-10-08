const Campground = require("../models/Campground");
const Review = require("../models/review");
module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  const campground = await Campground.findById(id);
  campground.reviews.push(newReview);
  await newReview.save();
  await campground.save();
  req.flash("success", "Created a new review");
  res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted the review");
  res.redirect("/campgrounds/" + id);
};
