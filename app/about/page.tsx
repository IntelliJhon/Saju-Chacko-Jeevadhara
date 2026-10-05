import Image from "next/image";
import Link from "next/link";
import { fetchAboutContent, DEFAULT_ABOUT_CONTENT } from "@/lib/data";
import {
  Award,
  Heart,
  BookOpen,
  Briefcase,
  Users,
  CheckCircle2,
  Calendar,
  Building,
  GraduationCap,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "About Mr. Saju Chacko | Life & Career",
  description:
    "Biography, leadership journey, business legacy in Angamaly, and humanitarian achievements of Mr. Saju Chacko, Chairman of Jeevadhara Foundation.",
};

export default async function AboutPage() {
  const content = await fetchAboutContent();
  const about = { ...DEFAULT_ABOUT_CONTENT, ...content };

  const founderList = (about.founderInstitutions || "")
    .split("\n")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const merchantList = (about.merchantLeadership || "")
    .split("\n")
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <div className="bg-stone-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded border border-amber-200 inline-block">
            {about.headerBadge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            {about.headerTitle}
          </h1>
          <p className="text-stone-700 text-base sm:text-lg max-w-4xl leading-relaxed">
            {about.headerSubtitle}
          </p>
        </div>

        {/* Profile Card & Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Portrait & Key Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm overflow-hidden space-y-4">
              <div className="relative rounded-xl overflow-hidden border border-stone-200">
                <Image
                  src="/images/saju_chacko_portrait.jpg"
                  alt="Mr. Saju Chacko Portrait"
                  width={500}
                  height={600}
                  className="w-full h-80 object-cover object-top"
                />
              </div>

              <div className="space-y-3 p-2">
                <h3 className="text-xl font-bold text-stone-900">Mr. Saju Chacko</h3>
                <p className="text-xs text-amber-900 font-bold uppercase tracking-wider">
                  Menacheril House, Angamaly
                </p>

                <div className="pt-2 border-t border-stone-200 space-y-2 text-xs text-stone-700">
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Primary Role:</span>
                    <span className="font-bold text-stone-900">{about.bioRole}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Y's Men Leader:</span>
                    <span className="font-bold text-stone-900">{about.bioYsMen}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Business Legacy:</span>
                    <span className="font-bold text-stone-900">{about.bioBusiness}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Academic Title:</span>
                    <span className="font-bold text-stone-900">{about.bioAcademic}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contacts Box */}
            <div className="bg-stone-900 text-white rounded-2xl p-6 space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                Official Residence & Office
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {about.bioAddress}
              </p>
              <div className="pt-2 text-xs font-semibold text-amber-300">
                Contact: {about.bioPhone}
              </div>
            </div>

          </div>

          {/* Right Column: Detailed Sections */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Section 1: Jeevadhara Renal Care */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-800 text-white flex items-center justify-center font-bold">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  {about.renalTitle}
                </h2>
              </div>

              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {about.renalContent}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <span className="font-bold text-stone-900 block">★ {about.renalHighlight1Title}</span>
                  <p className="text-stone-600">{about.renalHighlight1Text}</p>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <span className="font-bold text-stone-900 block">★ {about.renalHighlight2Title}</span>
                  <p className="text-stone-600">{about.renalHighlight2Text}</p>
                </div>
              </div>
            </div>

            {/* Section 2: Y's Men Leadership */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-800 text-white flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  {about.ysMenTitle}
                </h2>
              </div>

              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {about.ysMenContent}
              </p>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <h4 className="font-bold text-amber-950 text-sm">
                  {about.ysMenAwardTitle}
                </h4>
                <p className="text-xs text-amber-900 leading-relaxed whitespace-pre-line">
                  {about.ysMenAwardText}
                </p>
              </div>
            </div>

            {/* Section 3: Business & Community Leadership */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  {about.businessTitle}
                </h2>
              </div>

              <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
                <p className="whitespace-pre-line">
                  {about.businessContent}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wide">Founder Leadership</h5>
                    <ul className="text-xs text-stone-600 space-y-1">
                      {founderList.map((item: string, idx: number) => (
                        <li key={idx}>{item.startsWith("•") ? item : `• ${item}`}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wide">Merchant Association Leadership</h5>
                    <ul className="text-xs text-stone-600 space-y-1">
                      {merchantList.map((item: string, idx: number) => (
                        <li key={idx}>{item.startsWith("•") ? item : `• ${item}`}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Academic Doctorate & Book Author */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-900 text-white flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  {about.doctorateTitle}
                </h2>
              </div>

              <p className="text-stone-700 text-sm leading-relaxed whitespace-pre-line">
                {about.doctorateContent}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

