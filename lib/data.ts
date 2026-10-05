import { getSql, initDb } from "@/lib/db";

export const DEFAULT_ABOUT_CONTENT = {
  headerBadge: "Comprehensive Biography",
  headerTitle: "Mr. Saju Chacko — Leadership, Service & Legacy",
  headerSubtitle:
    "Chairman of Jeevadhara Foundation, former International Council Member of Y's Men International, founder president of major Angamaly community institutions, and recipient of the Best International Regional Director Award.",

  bioRole: "Chairman, Jeevadhara",
  bioYsMen: "43+ Years Member",
  bioBusiness: "70-Year Gold Business",
  bioAcademic: "Doctorate (D.Litt)",
  bioAddress: "Menacheril House, Angamaly P.O., Ernakulam District, Kerala, India - 683572",
  bioPhone: "+91 94470 32100",

  renalTitle: "Founding Jeevadhara Renal Care Project",
  renalContent:
    "In 2012–2013, during his tenure as Regional Director of Y's Men International Midwest India Region, Mr. Saju Chacko initiated the landmark \"Jeevadhara Renal Care\" project. Under his visionary guidance, the initiative has completed over 49,000+ free dialysis sessions for poor and underprivileged kidney patients.",
  renalHighlight1Title: "Free Patient Care",
  renalHighlight1Text: "Eliminating the heavy financial burden of regular dialysis treatments for low-income families.",
  renalHighlight2Title: "Medical Camp Outreach",
  renalHighlight2Text: "Organized 120+ renal screening and medical diagnostic camps across Kerala.",

  ysMenTitle: "43 Years in Y's Men International & Global Awards",
  ysMenContent:
    "For over 43 years, Mr. Saju Chacko has been a mainstay of Y's Men International. He served as Regional Director (Midwest India Region, 2012–2013), International Council Member (2013–2015), and International Service Director (2021–2022).",
  ysMenAwardTitle: "First Person in India to Receive Best International Regional Director Award",
  ysMenAwardText:
    "During his tenure as Regional Director, Mr. Saju Chacko led the Midwest India Region to unprecedented achievements in humanitarian service, earning the highest international distinction awarded by the International Council in Geneva.",

  businessTitle: "Business Legacy & Civic Institutions",
  businessContent:
    "Belonging to the prestigious Menacheril family, Mr. Saju Chacko successfully manages his family's 70-year-old traditional jewellery business in Angamaly.",
  founderInstitutions:
    "• Rotaract Club Angamaly\n• Angamaly Sports Association\n• Gold Dealers Association Angamaly (2005–2012)",
  merchantLeadership:
    "• Unit President & District Leader, Vyapari Vyavasayi Ekopana Samithi\n• Key advocate for local small businesses & merchants",

  doctorateTitle: "Doctorate (D.Litt) & Medical Book Publication",
  doctorateContent:
    "In recognition of his deep research and contribution to public health awareness, Mr. Saju Chacko was conferred a Doctorate (Doctor of Literature) by an International University in the USA for his paper on \"Kidney Diseases and Dialysis\". He is also the author of the widely appreciated guidebook \"Vrukka Stambanavum & Dialysisum\" (Kidney Failure & Dialysis).",
};

export async function fetchAboutContent() {
  try {
    const sql = getSql();
    await initDb();
    const rows = await sql`SELECT content FROM site_content WHERE key = 'about' LIMIT 1`;
    if (rows && rows.length > 0 && rows[0].content) {
      return { ...DEFAULT_ABOUT_CONTENT, ...rows[0].content };
    }
    return DEFAULT_ABOUT_CONTENT;
  } catch (error) {
    console.error("fetchAboutContent error:", error);
    return DEFAULT_ABOUT_CONTENT;
  }
}

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
    const rows = await sql`SELECT * FROM stats`;
    if (rows && rows.length > 0) return rows;
    
    // Fallback if table was emptied
    await sql`
      INSERT INTO stats (key, label, value, icon)
      VALUES 
        ('dialysis', 'Free Dialysis Sessions Completed', '49,000+', 'HeartHandshake'),
        ('ys_men', 'Years of Y''s Men Leadership', '43+', 'Award'),
        ('camps', 'Medical & Healthcare Camps', '120+', 'Stethoscope'),
        ('beneficiaries', 'Families Supported', '50,000+', 'Users')
      ON CONFLICT (key) DO NOTHING;
    `;
    return await sql`SELECT * FROM stats`;
  } catch (error) {
    return [];
  }
}

