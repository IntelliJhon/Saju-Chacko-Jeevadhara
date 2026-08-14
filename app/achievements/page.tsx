import Image from "next/image";
import Link from "next/link";
import { fetchStats } from "@/lib/data";
import {
  Heart,
  Award,
  BookOpen,
  Users,
  CheckCircle2,
  Calendar,
  Globe,
  Activity,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Jeevadhara Achievements & Service Milestones | Mr. Saju Chacko",
  description:
    "Comprehensive achievements of Jeevadhara Foundation under Chairman Mr. Saju Chacko: 49,000+ free dialysis sessions, international awards, and medical screening camps.",
};

export default async function AchievementsPage() {
  const stats = await fetchStats();
  const dialysisValue = stats?.find(s => s.key === 'dialysis')?.value || "49,000+";

  const achievementsList = [
    {
      icon: Heart,
      color: "bg-rose-50 text-rose-700 border-rose-200",
      badge: "Healthcare Milestone",
      title: `${dialysisValue} Free Dialysis Treatments Delivered`,
      description:
        `Since establishing the Jeevadhara Renal Care project in 2012–2013 under Y's Men International, the foundation has sponsored and completed over ${dialysisValue} free dialysis procedures for financially destitute kidney patients in Kerala.`,
    },
    {
      icon: Award,
      color: "bg-amber-50 text-amber-800 border-amber-200",
      badge: "International Honor",
      title: "Best International Regional Director Award",
      description:
        "Conferred by the International Council of Y's Men International in Geneva. Mr. Saju Chacko is the first recipient in India to receive this highest global leadership honor for exemplary regional governance.",
    },
    {
      icon: BookOpen,
      color: "bg-indigo-50 text-indigo-800 border-indigo-200",
      badge: "Academic Honor",
      title: "Conferral of Doctorate (D.Litt) & Book Publication",
      description:
        "Conferred Doctorate (Doctor of Literature) by International University USA for research on kidney disease management. Author of the educational medical book 'Vrukka Stambanavum & Dialysisum'.",
    },
    {
      icon: Activity,
      color: "bg-emerald-50 text-emerald-800 border-emerald-200",
      badge: "Preventive Care",
      title: "120+ Diagnostic Screening Camps Organized",
      description:
        "Organized over 120 free kidney diagnostic camps, blood tests, and medical awareness sessions across rural and urban centers in Ernakulam district.",
    },
    {
      icon: Users,
      color: "bg-purple-50 text-purple-800 border-purple-200",
      badge: "Community Building",
      title: "Founder Leadership in Key Angamaly Associations",
      description:
        "Founder President of Rotaract Club Angamaly, Angamaly Sports Association, and Gold Dealers Association Angamaly (2005–2012), driving trade ethics and youth development.",
    },
    {
      icon: Globe,
      color: "bg-blue-50 text-blue-800 border-blue-200",
      badge: "Global Leadership",
      title: "International Service Director & Council Member",
      description:
        "Served as International Service Director (2021–2022) and International Council Member (2013–2015) for Y's Men International, representing India on global platforms.",
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded border border-amber-200 inline-block">
            Milestones & Legacy
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Jeevadhara Foundation Achievements & Awards
          </h1>
          <p className="text-stone-700 text-base sm:text-lg max-w-4xl leading-relaxed font-normal">
            A comprehensive record of life-saving medical initiatives, international leadership awards, academic research, and community service spearheaded by Chairman Mr. Saju Chacko.
          </p>
        </div>

        {/* Major Dialysis Care Spotlight Banner */}
        <div className="bg-stone-900 text-white rounded-2xl p-8 lg:p-10 border border-stone-800 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                FLAGSHIP HUMANITARIAN MISSION
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Over {dialysisValue} Free Dialysis Sessions Completed
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Initiated in 2012–2013 under the chairmanship of Mr. Saju Chacko, Jeevadhara Renal Care provides 100% free dialysis treatments to impoverished patients suffering from end-stage kidney failure.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-amber-300">
                <span>✓ 100% Free Treatment</span>
                <span>✓ Direct Hospital Partnerships</span>
                <span>✓ Over 12 Years of Service</span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-stone-800/80 p-6 rounded-xl border border-stone-700 text-center space-y-2">
              <span className="text-4xl font-extrabold text-amber-400 block">
                {dialysisValue}
              </span>
              <span className="text-xs text-stone-300 font-bold uppercase tracking-wider block">
                Dialysis Sessions Completed
              </span>
              <span className="text-[11px] text-stone-400 block pt-2">
                Saving lives and preserving family dignity across Kerala.
              </span>
            </div>

          </div>
        </div>

        {/* Grid of All Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievementsList.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-lg border ${item.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-stone-100 text-stone-700 border border-stone-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 text-[11px] font-bold text-stone-500 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>Verified Foundation Record</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center space-y-4">
          <h3 className="text-2xl font-extrabold text-stone-900">
            Want to Collaborate or Support Dialysis Care?
          </h3>
          <p className="text-stone-600 text-sm max-w-2xl mx-auto">
            Get in touch with Mr. Saju Chacko's office for partnership inquiries, community diagnostic camp requests, or foundation support.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold px-7 py-3 rounded-lg text-xs"
            >
              <span>Contact Foundation Office</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
