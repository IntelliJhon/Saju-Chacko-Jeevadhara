import { getSql, initDb } from "@/lib/db";

export async function fetchAllData() {
  try {
    const sql = getSql();
    await initDb();

    const [news, gallery, stats] = await Promise.all([
      sql`SELECT * FROM news ORDER BY id DESC`,
      sql`SELECT * FROM gallery ORDER BY id DESC`,
      sql`SELECT * FROM stats`,
    ]);

    return {
      news: news || [],
      gallery: gallery || [],
      stats: stats || [],
    };
  } catch (error) {
    console.error("Fetch data error:", error);
    return { news: [], gallery: [], stats: [] };
  }
}

export async function fetchNews() {
  try {
    const sql = getSql();
    await initDb();
    return await sql`SELECT * FROM news ORDER BY id DESC`;
  } catch (error) {
    return [];
  }
}

export async function fetchGallery() {
  try {
    const sql = getSql();
    await initDb();
    return await sql`SELECT * FROM gallery ORDER BY id DESC`;
  } catch (error) {
    return [];
  }
}

export async function fetchStats() {
  try {
    const sql = getSql();
    await initDb();
    return await sql`SELECT * FROM stats`;
  } catch (error) {
    return [];
  }
}
