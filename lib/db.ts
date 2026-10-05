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
          description TEXT,
          category TEXT NOT NULL DEFAULT 'Events',
          image_url TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `;

      // Ensure description column exists if table was created previously without it
      await sql`
        ALTER TABLE gallery ADD COLUMN IF NOT EXISTS description TEXT;
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

      // Seed default stats if none exist
      await sql`
        INSERT INTO stats (key, label, value, icon)
        VALUES 
          ('dialysis', 'Free Dialysis Sessions Completed', '49,000+', 'HeartHandshake'),
          ('ys_men', 'Years of Y''s Men Leadership', '43+', 'Award'),
          ('camps', 'Medical & Healthcare Camps', '120+', 'Stethoscope'),
          ('beneficiaries', 'Families Supported', '50,000+', 'Users')
        ON CONFLICT (key) DO NOTHING;
      `;

      // Create Site Content Table for editable pages like About
      await sql`
        CREATE TABLE IF NOT EXISTS site_content (
          key TEXT PRIMARY KEY,
          content JSONB NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

