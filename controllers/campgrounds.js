const Campground = require("../models/Campground");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({
  accessToken: mapBoxToken,
});
const { cloudinary } = require("../cloudinary");
module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
  const geoData = await geocodingClient
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();

  const newCampground = new Campground(req.body.campground);
  newCampground.geometry = geoData.body.features[0].geometry;
  newCampground.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  newCampground.owner = req.user._id;
  await newCampground.save();
  console.log(newCampground);
  req.flash("success", "Successfully made a new campground.");
  res.redirect("/campgrounds/" + newCampground._id);
};

module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!campground) {
    req.flash("error", "Campground not found");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

module.exports.renderEditForm = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    req.flash("error", "Campground not found");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
};

//function can definitely be improved but it works just fine for now
module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const { deleteImages } = req.body;
  // console.log(req.body);
  const campground = await Campground.findByIdAndUpdate(
    id,
    req.body.campground
  );
  const newImages = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  campground.images.push(...newImages);
  if (deleteImages) {
    deleteImages.forEach(async (filename) => {
      await cloudinary.uploader.destroy(filename);
    });
    //filter images that includes deleteImages
    // await campground.updateOne({
    //   $pull: { images: { filename: { $in: deleteImages } } },
    // });
    const filteredImages = campground.images.filter((img) => {
      return !deleteImages.includes(img.filename);
    });
    campground.images = filteredImages;
  }

  await campground.save();
  req.flash("success", "Successfully updated the campground.");
  res.redirect("/campgrounds/" + id);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted a campground.");
  res.redirect("/campgrounds");
};
