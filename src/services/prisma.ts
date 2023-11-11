import { PrismaClient } from '@prisma/client';

declare const globalThis: {
  prisma?: PrismaClient;
};

export let prisma: PrismaClient;

if (process.env.NODE_ENV !== 'development') {
  prisma = new PrismaClient();
} else {
  if (!globalThis['prisma']) {
    globalThis['prisma'] = new PrismaClient();
  }

  prisma = globalThis['prisma'];
}

export async function disconnect() {
  await prisma.$disconnect();

  return true;
}

export async function connect() {
  await prisma.$connect();

  return true;
}
