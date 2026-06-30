const postsRepository = require("../repositories/postsRepository");

// Validation
const { validationResult } = require("express-validator");

async function getAllPostsAdmin(req, res) {
  console.log("display posts placeholder function");
  try {
    const allPosts = await postsRepository.getAllPostsAdmin();
    res.json(allPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong please try again" });
  }
}
async function getAllActivePosts(req, res) {
  console.log("display posts placeholder function");
  try {
    const allActivePosts = await postsRepository.getAllActivePosts();
    res.json(allActivePosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong please try again" });
  }
}

async function createPosts(req, res) {
  try {
    await postsRepository.createPost(req.body, req.user);
    res.json("placeholder for creating posts");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong please try again" });
  }
}

async function getPost(req, res) {
  console.log("Looking at post ID: " + req.params.id);
  try {
    const post = await postsRepository.getPost(parseInt(req.params.id));
    console.table(post.content);
    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong please try again" });
  }
}

async function updatePost(req, res) {
  console.log("placedholder for updating posts ");

  try {
    const updatedPost = await postsRepository.updatePost(
      parseInt(req.params.id),
      req.body,
    );
    res.json({ message: "placeholder for updating a post", post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong please try again" });
  }
}

async function publishPost(req, res) {
  try {
    console.log("yo publishpost is called");
    const publishedPost = await postsRepository.publishPost(
      parseInt(req.params.id),
    );
    res.json({ message: "post published", post: publishedPost });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong please try again" });
  }
}

async function unpublishPost(req, res) {
  try {
    const publishedPost = await postsRepository.unpublishPost(
      parseInt(req.params.id),
    );
    res.json({ message: "post unpublished", post: publishedPost });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong please try again" });
  }
}
async function unarchivePost(req, res) {
  try {
    const publishedPost = await postsRepository.unarchivePost(
      parseInt(req.params.id),
    );
    res.json({ message: "post unarchived", post: publishedPost });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong please try again" });
  }
}
async function archivePost(req, res) {
  try {
    const archivedPost = await postsRepository.archivePost(
      parseInt(req.params.id),
    );
    res.json({ message: "post archived", post: archivedPost });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong please try again" });
  }
}

module.exports = {
  getAllPostsAdmin,
  getAllActivePosts,
  createPosts,
  getPost,
  updatePost,
  publishPost,
  unpublishPost,
  unarchivePost,
  archivePost,
};
