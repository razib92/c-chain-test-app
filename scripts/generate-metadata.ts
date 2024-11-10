import * as FS from "fs";
import { fileURLToPath } from "url";
import { PluginMetadataGenerator } from "@nestjs/cli/lib/compiler/plugins/plugin-metadata-generator";
import { ReadonlyVisitor } from "@nestjs/swagger/dist/plugin";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generator = new PluginMetadataGenerator();

FS.rmSync(path.join(__dirname, "../src/metadata.ts"), { force: true });

generator.generate({
  visitors: [
    new ReadonlyVisitor({
      introspectComments: true,
      pathToSource: path.join(__dirname, "../src"),
    }),
  ],
  outputDir: path.join(__dirname, "../src"),
  watch: false,
  tsconfigPath: "./tsconfig.swagger.json",
});
