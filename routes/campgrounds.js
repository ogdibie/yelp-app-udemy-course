const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const campgroundController = require("../controllers/campgrounds");
const { isLoggedIn, validateCampground, isOwner } = require("../middleware");

router
  .route("/")
  .get(catchAsync(campgroundController.index))
  .post(
    isLoggedIn,
    validateCampground,
    catchAsync(campgroundController.createCampground)
  );

router.get("/new", isLoggedIn, campgroundController.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgroundController.showCampground))
  .put(
    validateCampground,
    isLoggedIn,
    isOwner,
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
