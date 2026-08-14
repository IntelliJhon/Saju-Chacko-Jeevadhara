import { neon } from "@neondatabase/serverless";

export function getSql() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL environment variable is not defined");
  }
  return neon(dbUrl);
}

let initPromise: Promise<any> | null = null;

export async function initDb() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const sql = getSql();
      
      // Create News Table
      await sql`
        CREATE TABLE IF NOT EXISTS news (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          summary TEXT NOT NULL,
          content TEXT NOT NULL,
          image_url TEXT,
          date TEXT NOT NULL,
          category TEXT NOT NULL DEFAULT 'General'
        );
      `;

      // Create Gallery Table
      await sql`
        CREATE TABLE IF NOT EXISTS gallery (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          category TEXT NOT NULL DEFAULT 'Events',
          image_url TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Create Contact Messages Table
      await sql`
        CREATE TABLE IF NOT EXISTS messages (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          subject TEXT,
          message TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'unread',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Create Stats Table
      await sql`
        CREATE TABLE IF NOT EXISTS stats (
          key TEXT PRIMARY KEY,
          label TEXT NOT NULL,
          value TEXT NOT NULL,
          icon TEXT NOT NULL
        );
      `;

      return { success: true };
    } catch (error) {
      console.error("Database initialization error:", error);
      initPromise = null;
      return { success: false, error: String(error) };
    }
  })();

  return initPromise;
}
