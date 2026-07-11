import "dotenv/config";
import { defineConfig, env } from "@prisma/config"; // Added 'env' to the import

export default defineConfig({
  datasource: {
    url: env("DATABASE_URL"),
  },
});