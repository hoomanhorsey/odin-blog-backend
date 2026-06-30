// insert code for postROuter

const { Router } = require("express");
const postsRouter = Router();

const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");
const verifyToken = require("../middleware/verifyToken.js");
const requireRole = require("../middleware/requireRole.js");

// GET /posts/create — displays the form for creating a post(frontend concern)

// GET ROUTES
postsRouter.get(
  "/all",
  verifyToken.verifyToken,
  requireRole.requireRole("OWNER", "ADMIN"),
  postsController.getAllPostsAdmin,
);
postsRouter.get("/", postsController.getAllActivePosts);
postsRouter.get("/:id", postsController.getPost);
postsRouter.get(
  "/:id/edit",
  verifyToken.verifyToken,
  requireRole.requireRole("OWNER", "ADMIN"),
  postsController.getPost,
);

// POST ROUTES
postsRouter.post(
  "/",
  verifyToken.verifyToken,
  requireRole.requireRole("OWNER", "ADMIN"),
  postsController.createPosts,
);
postsRouter.post(
  "/:postId/comments",
  verifyToken.verifyToken,
  commentsController.createComment,
);

// PUT ROUTES
postsRouter.put(
  "/:id",
  verifyToken.verifyToken,
  requireRole.requireRole("OWNER", "ADMIN"),
  postsController.updatePost,
);

postsRouter.put(
  "/:id/publish",
  verifyToken.verifyToken,
  requireRole.requireRole("OWNER", "ADMIN"),
  postsController.publishPost,
);
postsRouter.put(
  "/:id/unpublish",
  verifyToken.verifyToken,
  requireRole.requireRole("OWNER", "ADMIN"),
  postsController.unpublishPost,
);
postsRouter.put(
  "/:id/unarchive",
  verifyToken.verifyToken,
  requireRole.requireRole("OWNER", "ADMIN"),
  postsController.unarchivePost,
);

// DELETE ROUTES
postsRouter.delete(
  "/:id",
  verifyToken.verifyToken,
  requireRole.requireRole("OWNER", "ADMIN"),
  postsController.archivePost,
);

postsRouter.delete(
  "/:postId/comments/:commentId",
  verifyToken.verifyToken,
  commentsController.deleteComment,
);

module.exports = postsRouter;
