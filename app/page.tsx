import Image from "next/image";
import Link from "next/link";
import { fetchAllData } from "@/lib/data";
import Hero from "@/components/Hero";
import {
  Heart,
  Award,
  BookOpen,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const data = await fetchAllData();
  const newsList = data.news.slice(0, 3);
  const galleryList = data.gallery.slice(0, 4);

  return (
    <div className="bg-white text-stone-900 space-y-0 font-sans">
      
      {/* Hero Section */}
      <Hero stats={data.stats} />

      {/* Chairman's Welcome & Vision Section */}
      <section className="py-16 bg-white border-b border-stone-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Box */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-300">
                <Image
                  src="/images/saju_chacko_portrait.jpg"
                  alt="Mr. Saju Chacko Chairman Vision"
                  width={600}
                  height={700}
                  className="w-full h-[460px] object-cover"
                />
                <div className="p-4 bg-stone-900 text-white">
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-1">
                    Chairman's Personal Vision
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug">
                    "Healthcare is a fundamental human right, not a luxury."
                  </h3>
                </div>
              </div>
            </div>

            {/* Vision Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs uppercase font-bold tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                Leadership & Life Values
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 leading-tight tracking-tight">
                A Journey Rooted in Faith, Service & Unwavering Compassion
              </h2>

              <p className="text-stone-700 text-base leading-relaxed font-normal">
                Hailing from an ordinary family in Angamaly and carrying forward a 70-year legacy of family business in jewellery, <strong>Mr. Saju Chacko</strong> has dedicated his life to uplifting the vulnerable and ensuring accessible medical treatment for those facing life-threatening renal diseases.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="w-8 h-8 rounded bg-teal-800 text-white flex items-center justify-center font-bold">
                    <Heart className="w-4 h-4 fill-white" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">Jeevadhara Renal Care</h4>
                  <p className="text-xs text-stone-600 font-normal">
                    Initiated in 2012–2013 to support underprivileged kidney patients with zero financial burden.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="w-8 h-8 rounded bg-amber-800 text-white flex items-center justify-center font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">Global Leadership</h4>
                  <p className="text-xs text-stone-600 font-normal">
                    43+ years active leader in Y's Men International, International Service Director, and Int. Council Member.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold px-6 py-3 rounded-lg transition-all text-sm"
                >
                  <span>Explore Full Profile & Career</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Jeevadhara Foundation Achievements Highlight */}
      <section className="py-16 bg-stone-50 border-b border-stone-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-900 bg-amber-100/60 px-3.5 py-1 rounded border border-amber-200">
              Impact Through Action
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Transforming Lives Through Jeevadhara Foundation
            </h2>
            <p className="text-stone-600 text-sm font-normal">
              Major milestones achieved under Mr. Saju Chacko's visionary chairmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 border border-stone-300 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-stone-100 text-teal-800 flex items-center justify-center font-bold">
                <Heart className="w-6 h-6 fill-teal-800" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                49,000+ Free Dialysis Sessions
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Providing free dialysis treatments for underprivileged patients who were unable to afford long-term renal therapy.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 border border-stone-300 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-stone-100 text-amber-800 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                International Recognition
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Awarded "Best International Regional Director" from International Council, becoming the first person in India to receive this prestigious honor.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 border border-stone-300 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-stone-100 text-stone-900 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                Doctorate & Medical Research
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                Awarded Doctorate (Doctor of Literature) for paper presentation on kidney diseases and dialysis, author of book "Vrukka Stambanavum & Dialysisum".
              </p>
            </div>

          </div>

          <div className="mt-10 text-center">
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold px-7 py-3 rounded-lg transition-all text-xs"
            >
              <span>View All Achievements & Initiatives</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Recent Newspaper Section */}
      <section className="py-16 bg-white border-b border-stone-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="border-b-2 border-stone-900 pb-3 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-900">
                PRESS EDITION
              </span>
              <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
                Newspaper & Media Dispatch
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 hover:underline"
            >
              <span>READ FULL CHRONICLE EDITION</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsList.length === 0 ? (
              <div className="col-span-1 md:col-span-3 text-center py-10 text-stone-500 border border-dashed border-stone-300 rounded-lg">
                No press articles published yet. Articles added in the Admin panel will appear here immediately.
              </div>
            ) : (
              newsList.map((item: any) => (
                <article key={item.id} className="border-r border-stone-300 pr-0 md:pr-6 last:border-r-0 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    {item.image_url && (
                      <div className="border border-stone-300 p-1 bg-stone-50">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 block">
                      {item.date} • {item.category}
                    </span>
                    <h3 className="font-bold text-lg text-stone-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-stone-700 text-xs leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-1 text-xs font-bold text-stone-900 hover:text-amber-900 pt-2 border-t border-stone-200"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </article>
              ))
            )}
          </div>

        </div>
      </section>

      {/* Gallery Section Preview */}
      <section className="py-16 bg-stone-50 border-b border-stone-200 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-900">
              Media Gallery
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 tracking-tight">
              Service Moments & Archives
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryList.length === 0 ? (
              <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-10 text-stone-500 border border-dashed border-stone-300 rounded-lg">
                No gallery photos added yet. Photos added in the Admin panel will appear here immediately.
              </div>
            ) : (
              galleryList.map((item: any) => (
                <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-stone-300 shadow-sm space-y-2">
                  <div className="h-52 w-full overflow-hidden bg-stone-200">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold uppercase text-amber-900 block">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 mt-1 line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold px-6 py-2.5 rounded-lg text-xs"
            >
              <span>Explore Full Photo Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
