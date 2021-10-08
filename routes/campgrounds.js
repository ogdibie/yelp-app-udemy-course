const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgroundController = require("../controllers/campgrounds");
const { isLoggedIn, validateCampground, isOwner } = require("../middleware");

router.get("/", catchAsync(campgroundController.index));

router.get("/new", isLoggedIn, campgroundController.renderNewForm);

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(campgroundController.createCampground)
);

router.get("/:id", catchAsync(campgroundController.showCampground));

//edit
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  catchAsync(campgroundController.renderEditForm)
);

router.put(
  "/:id",
  validateCampground,
  isLoggedIn,
  isOwner,
  catchAsync(campgroundController.updateCampground)
);

router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  catchAsync(campgroundController.deleteCampground)
);

module.exports = router;
