"use server";

import { neon } from "@neondatabase/serverless";
import { initDb } from "@/lib/db";
import { fetchAllData, fetchNews, fetchGallery, fetchStats, fetchAboutContent } from "@/lib/data";
import { revalidatePath } from "next/cache";

function getSql() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is missing in environment variables.");
  }
  return neon(dbUrl);
}

function revalidateAllPages() {
  try {
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/news");
    revalidatePath("/gallery");
    revalidatePath("/achievements");
    revalidatePath("/contact");
    revalidatePath("/admin");
  } catch (err) {
    console.error("Revalidate path error:", err);
  }
}

export async function ensureDbInitialized() {
  return await initDb();
}

export async function getData() {
  return await fetchAllData();
}

export async function getNews() {
  return await fetchNews();
}

export async function getGallery() {
  return await fetchGallery();
}

export async function getStats() {
  return await fetchStats();
}

export async function getAboutContent() {
  return await fetchAboutContent();
}

export async function updateAboutContent(content: any) {
  const sql = getSql();
  await initDb();
  await sql`
    INSERT INTO site_content (key, content, updated_at)
    VALUES ('about', ${JSON.stringify(content)}, CURRENT_TIMESTAMP)
    ON CONFLICT (key)
    DO UPDATE SET content = ${JSON.stringify(content)}, updated_at = CURRENT_TIMESTAMP;
  `;
  revalidateAllPages();
  return { success: true };
}

export async function createNews(data: {
  title: string;
  summary: string;
  content: string;
  image_url: string;
  category: string;
  date: string;
}) {
  const sql = getSql();
  await initDb();
  const res = await sql`
    INSERT INTO news (title, summary, content, image_url, date, category)
    VALUES (${data.title}, ${data.summary}, ${data.content}, ${data.image_url}, ${data.date || new Date().toISOString().split('T')[0]}, ${data.category || 'General'})
    RETURNING *;
  `;
  revalidateAllPages();
  return res[0];
}

export async function deleteNews(id: number) {
  const sql = getSql();
  await sql`DELETE FROM news WHERE id = ${id}`;
  revalidateAllPages();
  return { success: true };
}

export async function addGalleryItem(data: {
  title: string;
  description?: string;
  category: string;
  image_url: string;
}) {
  const sql = getSql();
  await initDb();
  const res = await sql`
    INSERT INTO gallery (title, description, category, image_url)
    VALUES (${data.title}, ${data.description || ''}, ${data.category}, ${data.image_url})
    RETURNING *;
  `;
  revalidateAllPages();
  return res[0];
}

export async function deleteGalleryItem(id: number) {
  const sql = getSql();
  await sql`DELETE FROM gallery WHERE id = ${id}`;
  revalidateAllPages();
  return { success: true };
}

export async function submitContactMessage(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const sql = getSql();
  await initDb();
  await sql`
    INSERT INTO messages (name, email, phone, subject, message)
    VALUES (${data.name}, ${data.email}, ${data.phone || ''}, ${data.subject || 'General Inquiry'}, ${data.message})
  `;
  revalidatePath("/admin");
  return { success: true, message: "Thank you for reaching out! Your message has been sent successfully." };
}

export async function getMessages() {
  const sql = getSql();
  await initDb();
  return await sql`SELECT * FROM messages ORDER BY id DESC`;
}

export async function markMessageRead(id: number) {
  const sql = getSql();
  await sql`UPDATE messages SET status = 'read' WHERE id = ${id}`;
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteMessage(id: number) {
  const sql = getSql();
  await sql`DELETE FROM messages WHERE id = ${id}`;
  revalidatePath("/admin");
  return { success: true };
}

export async function updateStat(key: string, value: string, label?: string, icon?: string) {
  const sql = getSql();
  await initDb();
  await sql`
    INSERT INTO stats (key, label, value, icon)
    VALUES (${key}, ${label || key}, ${value}, ${icon || 'Activity'})
    ON CONFLICT (key)
    DO UPDATE SET 
      value = EXCLUDED.value,
      label = COALESCE(NULLIF(EXCLUDED.label, ''), stats.label),
      icon = COALESCE(NULLIF(EXCLUDED.icon, ''), stats.icon);
  `;
  revalidateAllPages();
  return { success: true };
}

export async function addStat(data: {
  key: string;
  label: string;
  value: string;
  icon?: string;
}) {
  const sql = getSql();
  await initDb();
  const cleanKey = data.key.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
  await sql`
    INSERT INTO stats (key, label, value, icon)
    VALUES (${cleanKey}, ${data.label}, ${data.value}, ${data.icon || 'Activity'})
    ON CONFLICT (key)
    DO UPDATE SET label = EXCLUDED.label, value = EXCLUDED.value;
  `;
  revalidateAllPages();
  return { success: true };
}

export async function deleteStat(key: string) {
  const sql = getSql();
  await initDb();
  await sql`DELETE FROM stats WHERE key = ${key}`;
  revalidateAllPages();
  return { success: true };
}

export async function seedDefaultStats() {
  const sql = getSql();
  await initDb();
  await sql`
    INSERT INTO stats (key, label, value, icon)
    VALUES 
      ('dialysis', 'Free Dialysis Sessions Completed', '49,000+', 'HeartHandshake'),
      ('ys_men', 'Years of Y''s Men Leadership', '43+', 'Award'),
      ('camps', 'Medical & Healthcare Camps', '120+', 'Stethoscope'),
      ('beneficiaries', 'Families Supported', '50,000+', 'Users')
    ON CONFLICT (key) DO UPDATE SET label = EXCLUDED.label, value = EXCLUDED.value;
  `;
  revalidateAllPages();
  return await fetchStats();
}

export async function verifyAdminPasscode(passcode: string) {
  const adminPasscode = process.env.ADMIN_PASSCODE || "saju2026";
  if (passcode === adminPasscode) {
    return { success: true };
  }
  return { success: false, message: "Invalid Admin Passcode" };
}


