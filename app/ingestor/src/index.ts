import { start } from "niknak-packages/packages/ingestor/src";
import { createDatabase } from "niknak-packages/packages/orm/src";
import datasource from "../../datasource";

const db = createDatabase(datasource);

async function main() {
  try {
    console.log(`Starting ingestor...`);
    await start(db)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();