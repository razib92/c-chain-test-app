import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { SeedManager } from "@mikro-orm/seeder";

import { BaseRepository } from "../common/base.repository";

export default defineConfig({
  migrations: {
    tableName: process.env.MIKRO_ORM_MIGRATIONS_TABLE_NAME,
    path: `./dist/database/migrations`,
    pathTs: `./src/database/migrations`,
    glob: "!(*.d).{js,ts}",
    transactional: true,
    allOrNothing: true,
    emit: "ts",
    disableForeignKeys: false,
  },
  seeder: {
    path: `./dist/database/seeders/**/*`,
    pathTs: `./src/database/seeders/**/*`,
    defaultSeeder: undefined,
    glob: "!(*.d).{js,ts}",
    emit: "ts",
    fileName: (className: string) => className,
  },
  debug: process.env.MIKRO_ORM_DEBUG === "true",
  clientUrl: process.env.MIKRO_ORM_CLIENT_URL,
  entitiesTs: ["src/**/*.entity.ts"],
  entities: ["dist/**/*.entity.js"],
  entityRepository: BaseRepository,
  allowGlobalContext: true,
  extensions: [Migrator, SeedManager],
});
