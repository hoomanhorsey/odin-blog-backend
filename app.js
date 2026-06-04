// Dependencies & core modules

const express = require("express");
const app = express();

// Route imports
const authRouter = require("./routes/authRouter");
const postsRouter = require("./routes/postsRouter");

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
