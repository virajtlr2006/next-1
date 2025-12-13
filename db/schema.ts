import { $Type } from "drizzle-orm";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

// 🎰Service Table and its Schema
export const serviceTable = pgTable("service", {
  service_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email:varchar().notNull(),
  service_image:varchar(),
  service_name:varchar().notNull(),
  desc:varchar().notNull(),
  price:integer().notNull(),
  category:varchar().notNull(),
});

// 🎰 Booking Table and its Schema
export const bookingTable = pgTable("booking", {
  booking_id: integer().primaryKey().generatedAlwaysAsIdentity(),
  service_id: integer().notNull(),
  user_email: varchar().notNull(),
  user_name:varchar().notNull(),
  booking_date: varchar().notNull(),
});

// 🧩Type Inference
export type service = typeof serviceTable.$inferSelect;
export type newService = typeof serviceTable.$inferInsert;
export type booking = typeof bookingTable.$inferSelect;
export type newBooking = typeof bookingTable.$inferInsert;