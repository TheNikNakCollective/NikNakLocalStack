import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { entities } from "niknak-packages/packages/orm/src";
import path from "path";

dotenv.config();

const migrations = `${path.resolve(__dirname, '..', 'migrations')}/*.js`;

const datasource = new DataSource({
  type: "postgres",
  host: "app-db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "niknak",
  entities: entities,
  migrationsTableName: "migration_table",
  migrations: [migrations],
});

datasource
  .initialize()
  .then(() => {
    console.log('Datasource initialized');
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

export default datasource;
