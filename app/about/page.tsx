import Image from "next/image";
import Link from "next/link";
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

export const metadata = {
  title: "About Mr. Saju Chacko | Life & Career",
  description:
    "Biography, leadership journey, business legacy in Angamaly, and humanitarian achievements of Mr. Saju Chacko, Chairman of Jeevadhara Foundation.",
};

export default function AboutPage() {
  return (
    <div className="bg-stone-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded border border-amber-200 inline-block">
            Comprehensive Biography
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Mr. Saju Chacko — Leadership, Service & Legacy
          </h1>
          <p className="text-stone-700 text-base sm:text-lg max-w-4xl leading-relaxed">
            Chairman of Jeevadhara Foundation, former International Council Member of Y's Men International, founder president of major Angamaly community institutions, and recipient of the Best International Regional Director Award.
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
                    <span className="font-bold text-stone-900">Chairman, Jeevadhara</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Y's Men Leader:</span>
                    <span className="font-bold text-stone-900">43+ Years Member</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Business Legacy:</span>
                    <span className="font-bold text-stone-900">70-Year Gold Business</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">Academic Title:</span>
                    <span className="font-bold text-stone-900">Doctorate (D.Litt)</span>
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
                Menacheril House, Angamaly P.O., Ernakulam District, Kerala, India - 683572
              </p>
              <div className="pt-2 text-xs font-semibold text-amber-300">
                Contact: +91 94470 32100
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
                  Founding Jeevadhara Renal Care Project
                </h2>
              </div>

              <p className="text-stone-700 text-sm leading-relaxed">
                In 2012–2013, during his tenure as Regional Director of Y's Men International Midwest India Region, Mr. Saju Chacko initiated the landmark <strong>"Jeevadhara Renal Care"</strong> project. Under his visionary guidance, the initiative has completed over <strong>49,000+ free dialysis sessions</strong> for poor and underprivileged kidney patients.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <span className="font-bold text-stone-900 block">★ Free Patient Care</span>
                  <p className="text-stone-600">Eliminating the heavy financial burden of regular dialysis treatments for low-income families.</p>
                </div>
                <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1">
                  <span className="font-bold text-stone-900 block">★ Medical Camp Outreach</span>
                  <p className="text-stone-600">Organized 120+ renal screening and medical diagnostic camps across Kerala.</p>
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
                  43 Years in Y's Men International & Global Awards
                </h2>
              </div>

              <p className="text-stone-700 text-sm leading-relaxed">
                For over 43 years, Mr. Saju Chacko has been a mainstay of Y's Men International. He served as <strong>Regional Director (Midwest India Region, 2012–2013)</strong>, <strong>International Council Member (2013–2015)</strong>, and <strong>International Service Director (2021–2022)</strong>.
              </p>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <h4 className="font-bold text-amber-950 text-sm">
                  First Person in India to Receive Best International Regional Director Award
                </h4>
                <p className="text-xs text-amber-900 leading-relaxed">
                  During his tenure as Regional Director, Mr. Saju Chacko led the Midwest India Region to unprecedented achievements in humanitarian service, earning the highest international distinction awarded by the International Council in Geneva.
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
                  Business Legacy & Civic Institutions
                </h2>
              </div>

              <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
                <p>
                  Belonging to the prestigious Menacheril family, Mr. Saju Chacko successfully manages his family's 70-year-old traditional jewellery business in Angamaly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wide">Founder President</h5>
                    <ul className="text-xs text-stone-600 space-y-1">
                      <li>• Rotaract Club Angamaly</li>
                      <li>• Angamaly Sports Association</li>
                      <li>• Gold Dealers Association Angamaly (2005–2012)</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <h5 className="font-bold text-stone-900 text-xs uppercase tracking-wide">Merchant Association Leadership</h5>
                    <ul className="text-xs text-stone-600 space-y-1">
                      <li>• Unit President & District Leader, Vyapari Vyavasayi Ekopana Samithi</li>
                      <li>• Key advocate for local small businesses & merchants</li>
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
                  Doctorate (D.Litt) & Medical Book Publication
                </h2>
              </div>

              <p className="text-stone-700 text-sm leading-relaxed">
                In recognition of his deep research and contribution to public health awareness, Mr. Saju Chacko was conferred a <strong>Doctorate (Doctor of Literature)</strong> by an International University in the USA for his paper on <em>"Kidney Diseases and Dialysis"</em>. He is also the author of the widely appreciated guidebook <strong>"Vrukka Stambanavum & Dialysisum"</strong> (Kidney Failure & Dialysis).
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
