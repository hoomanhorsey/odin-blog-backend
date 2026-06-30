const commentsRepository = require("../repositories/commentsRepository");

async function createComment(req, res) {
  try {
    console.log("Authorization header:", req.headers.authorization);
    console.log("req.body:", req.body);
    console.log("Content:", req.body.content);
    console.log("from backend creatComment function");
    console.log(req.body.content);
    await commentsRepository.createComment(
      parseInt(req.params.postId),
      req.body,
      req.user,
    );
    res.json("placeholder for creating posts");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong please try again" });
  }
}

async function deleteComment(req, res) {
  // TO BE COMPLETED
  try {
    await commentsRepository.deleteComment(
      parseInt(req.params.postId),
      req.body,
      req.user,
    );
    res.json("placeholder for creating posts");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong please try again" });
  }
}
module.exports = { createComment, deleteComment };
