import { pgTable, serial, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    email: varchar("email"),
  },
  (u) => {
    return {
      emailIndex: uniqueIndex("email_idx").on(u.email),
    };
  }
);
