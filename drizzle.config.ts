import * as dotenv from "dotenv";
dotenv.config();
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/models/*",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
} satisfies Config;
