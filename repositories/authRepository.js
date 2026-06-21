const { prisma } = require("../lib/prisma");

async function createUser(body, hashedPassword) {
  console.log("createUser from authRepository is being called.");

  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      password: hashedPassword,
    },
  });
  console.log("User created:", newUser);
  return newUser;
}

async function checkUsernameExists(username) {
  const usernameResult = await prisma.user.findUnique({
    where: { username: username },
  });
  return usernameResult;
}

async function checkEmailExists(email) {
  const emailResult = await prisma.user.findUnique({
    where: { email: email },
  });
  return emailResult;
}

module.exports = { createUser, checkUsernameExists, checkEmailExists };
