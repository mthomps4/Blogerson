import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      {
        title: 'Blog 1',
        content: "I'm a blog post...",
        published: true,
      },
      {
        title: 'Blog 2',
        content: "I'm a blog post...",
        published: true,
      },
      {
        title: 'Blog 3',
        content: "I'm a blog post...",
        published: true,
      },
    ],
  });
}

main();
