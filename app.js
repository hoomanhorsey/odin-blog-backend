// Dependencies & core modules

const express = require("express");
var cors = require("cors");
const app = express();

// Validation
const { body, validationResult } = require("express-validator");

// Route imports
const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");

app.use(cors()); // enables CORS for ALL routes

app.use(express.json()); // Add this line if missing
app.use(express.urlencoded({ extended: true }));

// Route mounting
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Blog app in express - listening on port ${PORT}!`);
});
