// insert code for authRouter

const { Router } = require("express");
const authRouter = Router();

const authController = require("../controllers/authController");

authRouter.get("/login", authController.displayLogin);
authRouter.post("/login", (req, res) => {
  console.log("login post placeholder");
});

authRouter.get("/signup", authController.displaySignup);
authRouter.post("/signup", (req, res) => {
  console.log("signup post placeholder");
});

authRouter.post("/logout", (req, res) => {
  console.log("logout post placeholder");
});

module.exports = authRouter;
