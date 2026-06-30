const { prisma } = require("../lib/prisma");

async function createComment(postId, body, user) {
  try {
    console.log("create a comment");
    console.log(body.content);
    console.table(user);
    console.log(typeof user.userId);

    const newComment = await prisma.comment.create({
      data: {
        content: body.content,
        authorId: user.userId,
        postId: postId,
      },
    });
    console.log(newComment);
    return newComment;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteComment() {
  // to be completed
}

module.exports = { createComment, deleteComment };
