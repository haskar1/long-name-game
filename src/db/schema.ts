import { uuid, pgTable, varchar } from "drizzle-orm/pg-core";

export const namesTable = pgTable("names", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar().notNull(),
});
