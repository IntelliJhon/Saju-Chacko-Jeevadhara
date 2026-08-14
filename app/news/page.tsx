import { fetchNews } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Press & News Gazette | Mr. Saju Chacko",
  description:
    "Official newspaper updates, press releases, dialysis milestones, and community news clippings from Jeevadhara Foundation.",
};

export default async function NewsPage() {
  const newsItems = await fetchNews();
  const leadArticle = newsItems[0];
  const otherArticles = newsItems.slice(1);

  return (
    <div className="bg-stone-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Masthead Header */}
        <div className="bg-white rounded-2xl p-8 border border-stone-300 shadow-sm text-center space-y-4">
          <div className="border-b border-stone-200 pb-3 flex justify-between items-center text-xs font-bold text-stone-600 uppercase tracking-widest">
            <span>OFFICIAL FOUNDATION CHRONICLE</span>
            <span>PRESS EDITION</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight">
            JEEVADHARA CHRONICLE
          </h1>

          <p className="text-xs font-bold text-stone-600 uppercase tracking-widest max-w-xl mx-auto border-t border-b border-stone-200 py-1.5">
            Press Releases • Dialysis Care Gazette • Community Despatches
          </p>
        </div>

        {newsItems.length === 0 ? (
          <div className="text-center py-16 text-stone-500 font-sans border border-dashed border-stone-300 rounded-lg bg-white">
            No press articles published yet. Articles published in the Admin panel will appear here in real time.
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-10">
            {/* Lead Article */}
            {leadArticle && (
              <article className="border-b-2 border-stone-900 pb-10 space-y-6">
                <div className="space-y-2 text-center max-w-4xl mx-auto">
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                    ★ FEATURED FRONT-PAGE STORY ★
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-stone-900">
                    {leadArticle.title}
                  </h2>
                  <div className="flex justify-center items-center gap-4 text-xs font-semibold text-stone-600 pt-1">
                    <span>DATELINE: {leadArticle.date}</span>
                    <span>•</span>
                    <span>CATEGORY: {leadArticle.category.toUpperCase()}</span>
                  </div>
                </div>

                {leadArticle.image_url && (
                  <div className="my-6 border border-stone-300 p-2 bg-stone-50 rounded-xl">
                    <img
                      src={leadArticle.image_url}
                      alt={leadArticle.title}
                      className="w-full max-h-[420px] object-cover rounded-lg"
                    />
                    <span className="block text-[11px] italic text-stone-600 text-center mt-2">
                      Press Photograph: {leadArticle.title}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base leading-relaxed text-stone-800">
                  <p className="font-semibold text-stone-900">
                    {leadArticle.summary}
                  </p>
                  <p className="text-stone-700">
                    {leadArticle.content}
                  </p>
                </div>
              </article>
            )}

            {/* Grid Columns for Secondary Articles */}
            {otherArticles.length > 0 && (
              <div className="space-y-6 pt-4">
                <div className="border-b border-stone-900 pb-1 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-stone-900">
                  <span>MORE PRESS DESPATCHES</span>
                  <span>ARCHIVE CLIPPINGS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherArticles.map((article: any) => (
                    <article
                      key={article.id}
                      className="border-r border-stone-300 pr-0 md:pr-6 last:border-r-0 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        {article.image_url && (
                          <div className="border border-stone-300 p-1 bg-stone-50 rounded-lg">
                            <img
                              src={article.image_url}
                              alt={article.title}
                              className="w-full h-44 object-cover rounded"
                            />
                          </div>
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900">
                          {article.date} • {article.category}
                        </span>
                        <h3 className="text-xl font-bold text-stone-900 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-xs text-stone-700 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-stone-200 text-xs text-stone-800 leading-relaxed">
                        {article.content}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
