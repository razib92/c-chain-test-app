import { ConfigModuleOptions } from "@nestjs/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.coerce.number().default(3000),
  MIKRO_ORM_MIGRATIONS_TABLE_NAME: z.string(),
  MIKRO_ORM_CLIENT_URL: z.string(),
  MIKRO_ORM_DEBUG: z
    .enum(["true", "false"])
    .transform((value) => value === "true"),
  START_VIEM_CLIENT: z
    .enum(["true", "false"])
    .transform((value) => value === "true"),
});

export type EnvironmentVars = z.infer<typeof envSchema>;

export const environmentConfig: ConfigModuleOptions = {
  validationSchema: envSchema,
  expandVariables: true,
  validate: (): EnvironmentVars => envSchema.parse(process.env),
  isGlobal: true,
  cache: true,
};
