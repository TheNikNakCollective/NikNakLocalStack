import { run } from "niknak-packages/packages/app/src";
import { createDatabase } from "niknak-packages/packages/orm/src";
import datasource from "./datasource";

const db = createDatabase(datasource);

async function main() {
  try {
    console.log(`Starting server...`);
    await run(db)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();