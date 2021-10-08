const express = require("express");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const userController = require("../controllers/users");
router
  .route("/register")
  .get(userController.renderRegisterForm)
  .post(catchAsync(userController.registerUser));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.loginUser
  );

router.get("/logout", userController.logoutUser);
module.exports = router;
