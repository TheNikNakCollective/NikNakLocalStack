import { start } from "niknak-packages/packages/ingestor/src";
import prisma from "niknak-packages/packages/prisma";

async function main() {
  try {
    console.log(`Starting ingestor...`);
    await start(prisma)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();