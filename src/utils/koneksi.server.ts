import { PrismaClient } from "@prisma/client";

let DB: PrismaClient;

declare global {
  var __DB: PrismaClient | undefined;
}

if (!global.__DB) {
  global.__DB = new PrismaClient();
}

DB = global.__DB;

export default DB;
