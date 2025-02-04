import { run } from "niknak-packages/packages/app/src";
import prisma from "niknak-packages/packages/prisma";

async function main() {
  try {
    await run(prisma)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();