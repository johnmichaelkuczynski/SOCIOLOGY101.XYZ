import { pgTable, serial, integer, text, timestamp, varchar, json, index } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  googleId: text("google_id"),
  email: text("email"),
  displayName: text("display_name"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const visitsTable = pgTable("visits", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id, { onDelete: "cascade" }),
  email: text("email"),
  visitedAt: timestamp("visited_at", { withTimezone: true }).notNull().defaultNow(),
});

// Session table required by connect-pg-simple.
// createTableIfMissing cannot be used in production because esbuild bundles
// the server without the package's table.sql asset — this table must exist
// before the server starts.
export const userSessionsTable = pgTable(
  "user_sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire", { precision: 6 }).notNull(),
  },
  (t) => [index("IDX_user_sessions_expire").on(t.expire)]
);
