import { $Type } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const serviceTable = pgTable("service", {
  service_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email:varchar().notNull(),
  service_image:varchar(),
  service_name:varchar().notNull(),
  desc:varchar().notNull(),
  price:integer().notNull(),
  category:varchar().notNull(),
});

export type service = typeof serviceTable.$inferSelect;
export type newService = typeof serviceTable.$inferInsert;