const { Router } = require("express");
const authRouter = Router();

// Validation
const userValidator = require("../validators/userValidator");

// Controllers
const authController = require("../controllers/authController");

authRouter.post(
  "/login",
  userValidator.validateLogin,
  authController.handleLogin,
);
authRouter.post(
  "/signup",
  userValidator.validateSignup,
  authController.handleSignup,
);
authRouter.post("/logout", authController.handleLogout);

// TODO - Determine if GET routes are needed for front end
// authRouter.get("/login", authController.displayLogin);
// authRouter.get("/signup", authController.displaySignup);

module.exports = authRouter;
