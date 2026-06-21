import { prisma } from "../lib/prisma.js";

import bcryptjs from "bcryptjs";

async function main() {
  const plainPassword = "developmentpassword"; // Set whatever password you want for the owner
  const hashedPassword = await bcryptjs.hash(plainPassword, 10);

  const owner = await prisma.user.create({
    data: {
      username: "Andrew Ma",
      email: "web4adma@gmail.com",
      password: hashedPassword,
      role: "OWNER",
    },
  });
  console.log("Owner created:", owner);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
