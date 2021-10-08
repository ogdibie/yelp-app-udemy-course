const express = require("express");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/register", userController.renderRegisterForm);

router.post("/register", catchAsync(userController.registerUser));

router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  userController.loginUser
);

router.get("/logout", userController.logoutUser);
module.exports = router;
