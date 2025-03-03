import { pgTable, serial, integer, varchar, text, timestamp, date, primaryKey, uniqueIndex } from "drizzle-orm/pg-core";

// 1. EXAMS TABLE
export const exams = pgTable("exams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(), // e.g., "Ia1 Exam"
  examDate: date("exam_date").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 2. EXAM_SESSIONS TABLE
export const examSessions = pgTable("exam_sessions", {
  id: serial("id").primaryKey(),
//   examId: integer("exam_id")
//     .notNull()
//     .references(() => exams.id, { onDelete: "cascade" }), // References exams(id)
//   classroomId: integer("classroom_id")
//     .notNull()
//     .references(() => classrooms._id, { onDelete: "cascade" }), // References classrooms(id)
//   semesterId: integer("semester_id")
//     .notNull()
//     .references(() => semesters.id, { onDelete: "cascade" }), // References semesters(id)
//   subjectId: integer("subject_id")
//     .notNull()
//     .references(() => subjects.id, { onDelete: "cascade" }), // References subjects(id)
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
}, (table) => ({
  validTimeRange: table.endTime.gt(table.startTime), // CHECK (end_time > start_time)
}));

// 3. EXAM_SEATING_ARRANGEMENTS TABLE
export const examSeatingArrangements = pgTable("exam_seating_arrangements", {
  id: serial("id").primaryKey(),
  examSessionId: integer("exam_session_id"), // Optional reference to exam_sessions(id)
  benchId: integer("bench_id")
    .notNull()
    .references(() => benches.id, { onDelete: "cascade" }), // References benches(id)
  seatNumber: integer("seat_number").notNull(), // Seat number within the bench
  studentId: integer("student_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // References users(id)
  status: varchar("status", { length: 20 })
    .default("draft")
    .check((status) => status.in(["draft", "published"])), // CHECK (status IN ('draft', 'published'))
  assignedAt: timestamp("assigned_at").defaultNow(),
}, (table) => ({
  uniqueBenchSeat: uniqueIndex("unique_bench_seat").on(table.benchId, table.seatNumber), // UNIQUE(bench_id, seat_number)
  uniqueStudent: uniqueIndex("unique_student").on(table.studentId), // UNIQUE(student_id)
}));