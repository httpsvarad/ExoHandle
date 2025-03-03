import { pgTable,serial, uuid, text, integer } from "drizzle-orm/pg-core";


export const classrooms = pgTable("classrooms", {
  _id: uuid("id").defaultRandom().primaryKey(),
  roomNo: text("room_no").notNull(),
  capacity: integer("capacity").notNull(),
  instituteId: uuid("institute_id").notNull().references(() => institutes._id, { onDelete: "cascade" }),
  createdBy: uuid("created_by").notNull(),
});
