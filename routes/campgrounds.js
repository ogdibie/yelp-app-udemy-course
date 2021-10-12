const express = require("express");
const multer = require("multer");

const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { storage } = require("../cloudinary");
const campgroundController = require("../controllers/campgrounds");
const { isLoggedIn, validateCampground, isOwner } = require("../middleware");

const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(campgroundController.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgroundController.createCampground)
  );

router.get("/new", isLoggedIn, campgroundController.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgroundController.showCampground))
  .put(
    isLoggedIn,
    isOwner,
    upload.array("image"),
    validateCampground,
    catchAsync(campgroundController.updateCampground)
  )
  .delete(
    isLoggedIn,
    isOwner,
    catchAsync(campgroundController.deleteCampground)
  );
//edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  catchAsync(campgroundController.renderEditForm)
);

module.exports = router;
