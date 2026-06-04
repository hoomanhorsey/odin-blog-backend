// insert code for postROuter

const { Router } = require("express");
const postsRouter = Router();

const postsController = require("../controllers/postsController");

postsRouter.get("/", postsController.displayPosts);
postsRouter.post("/", postsController.createPosts);

postsRouter.get("/:id", postsController.displayPost);

postsRouter.put("/:id", postsController.updatePost);

postsRouter.delete("/:id", postsController.deletePost);

module.exports = postsRouter;
