const { prisma } = require("../lib/prisma");

async function getAllPostsAdmin() {
  console.log("calling get all posts query");
  try {
    const allPosts = await prisma.post.findMany({});
    return allPosts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getAllActivePosts() {
  console.log("calling get all posts query");
  try {
    const allPosts = await prisma.post.findMany({
      where: {
        published: true,
        archived: false,
      },
    });
    return allPosts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getPost(postId) {
  console.log(
    "getting one post, this msg from post repo. The post I want to get is: " +
      postId,
  );
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Helper function to parse tags
function parseTags(tagsString) {
  if (!tagsString) return []; // Handle null, undefined, or empty string
  return tagsString
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);
}

async function createPost(body, user) {
  try {
    console.log("create a posts");
    console.log(body.title + body.content);
    console.table(user);

    console.log(typeof user.userId);

    const parsedTags = parseTags(body.tags);

    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: user.userId,
        tags: {
          create: parsedTags.map((tagName) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
      },
    });
    console.table(newPost);
    return newPost;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updatePost(postId, body) {
  try {
    const parsedTags = parseTags(body.tagsString);

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: body.title,
        content: body.content,
        tags: {
          deleteMany: {}, // Remove all existing PostTag entries
          create: parsedTags.map((tagName) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
      },
    });
    return updatedPost;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function publishPost(postId) {
  try {
    const publishedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        published: true,
        datePublished: new Date(),
      },
    });
    return publishedPost;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function unpublishPost(postId) {
  try {
    const unpublishedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        published: false,
      },
    });
    return unpublishedPost;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function unarchivePost(postId) {
  try {
    const unarchivedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        archived: false,
      },
    });
    return unarchivedPost;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function archivePost(postId) {
  try {
    console.log("delete post function, and postID" + postId);
    const archivedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { archived: true },
    });
    return archivedPost;
  } catch (error) {
    console.error("oh no error" + error);
    throw error;
  }
}

module.exports = {
  getAllPostsAdmin,
  getAllActivePosts,
  getPost,
  createPost,
  updatePost,
  publishPost,
  unpublishPost,
  unarchivePost,
  archivePost,
};
