import { PrismaClient } from '@prisma/client';
import app from '../../src';

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

export async function cleanDb() {
  await prisma.bet.deleteMany({});
  await prisma.game.deleteMany({});
  await prisma.participant.deleteMany({});
}

export async function init(){
  connectDb();
  return Promise.resolve(app)
}

export async function close(): Promise<void> {
  await disconnectDB();
}