import { pgTable, serial, uuid, text, integer, uniqueIndex } from "drizzle-orm/pg-core";

export const benches = pgTable("benches", {
  id:uuid("id").defaultRandom().primaryKey(),
  classroomId: uuid("classroom_id")
    .notNull()
    .references(() => classrooms.id, { onDelete: "cascade" }), // Ensure `classrooms.id` exists
  label: text("label").notNull(), // e.g., "Front-Left"
  maxSeats: integer("max_seats")
    .notNull()
    .check((seats) => seats.gt(0)), // maxSeats > 0
  occupiedSeats: integer("occupied_seats")
    .default(0)
    .check((seats) => seats.gte(0)), // occupiedSeats >= 0
  posX: integer("pos_x")
    .notNull()
    .check((x) => x.gte(0)), // posX >= 0
  posY: integer("pos_y")
    .notNull()
    .check((y) => y.gte(0)), // posY >= 0
}, (table) => ({
  uniqueLabelPerClassroom: uniqueIndex("unique_label_per_classroom").on(
    table.classroomId,
    table.label
  ), // Ensures unique labels per classroom
}));