import { db } from "@workspace/db";
import { usersTable, visitsTable } from "@workspace/db";
import { eq, desc, gte } from "drizzle-orm";

export interface StorageUser {
  id: number;
  username: string;
  googleId: string | null;
  email: string | null;
  displayName: string | null;
}

type NewUser = {
  username: string;
  googleId: string;
  email: string | null;
  displayName: string | null;
};

type GoogleUpdate = {
  googleId?: string;
  displayName?: string | null;
};

function rowToUser(row: typeof usersTable.$inferSelect): StorageUser {
  return {
    id: row.id,
    username: row.username,
    googleId: row.googleId ?? null,
    email: row.email ?? null,
    displayName: row.displayName ?? null,
  };
}

export const storage = {
  async getUserById(id: number): Promise<StorageUser | null> {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    return row ? rowToUser(row) : null;
  },

  async getUserByGoogleId(googleId: string): Promise<StorageUser | null> {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.googleId, googleId))
      .limit(1);
    return row ? rowToUser(row) : null;
  },

  async getUserByEmail(email: string): Promise<StorageUser | null> {
    const [row] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    return row ? rowToUser(row) : null;
  },

  async createUserWithGoogle(data: NewUser): Promise<StorageUser> {
    const [row] = await db.insert(usersTable).values(data).returning();
    return rowToUser(row!);
  },

  async updateUserGoogle(
    id: number,
    data: GoogleUpdate
  ): Promise<StorageUser> {
    const [row] = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning();
    return rowToUser(row!);
  },

  async recordVisit(userId: number | null, email: string | null): Promise<void> {
    await db.insert(visitsTable).values({ userId, email });
  },

  async getVisits(
    limit: number
  ): Promise<Array<{ id: number; email: string | null; visitedAt: Date }>> {
    const rows = await db
      .select()
      .from(visitsTable)
      .orderBy(desc(visitsTable.visitedAt))
      .limit(limit);
    return rows.map((r) => ({
      id: r.id,
      email: r.email ?? null,
      visitedAt: r.visitedAt,
    }));
  },

  async getVisitTimestampsSince(since: Date | null): Promise<string[]> {
    const rows = since
      ? await db
          .select({ visitedAt: visitsTable.visitedAt })
          .from(visitsTable)
          .where(gte(visitsTable.visitedAt, since))
      : await db
          .select({ visitedAt: visitsTable.visitedAt })
          .from(visitsTable);
    return rows.map((r) => r.visitedAt.toISOString());
  },
};
