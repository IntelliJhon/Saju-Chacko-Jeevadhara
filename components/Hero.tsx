"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Award, ArrowRight } from "lucide-react";

interface HeroProps {
  stats?: Array<Record<string, any>> | any[];
}

export default function Hero({ stats }: HeroProps) {
  const dialysisCount = stats?.find(s => s.key === 'dialysis')?.value || "49,000+";
  const ysMenYears = stats?.find(s => s.key === 'ys_men')?.value || "43+ Years";
  const campsCount = stats?.find(s => s.key === 'camps')?.value || "120+";

  return (
    <section className="bg-white text-stone-900 py-12 lg:py-16 border-b border-stone-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Tag */}
        <div className="border-b border-stone-300 pb-4 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-semibold text-stone-600">
          <span className="uppercase tracking-widest text-amber-900">
            Jeevadhara Foundation • Official Personal Portal
          </span>
          <span>Angamaly, Ernakulam District, Kerala, India</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text & Profile Intro */}
          <div className="lg:col-span-7 space-y-6">
            
            <span className="inline-block text-xs uppercase font-bold tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded border border-amber-200">
              Servant Leadership & Humanitarian Service
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-stone-900 tracking-tight">
              Dedicated to Hope, Healing & Free Healthcare for Kidney Patients
            </h1>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
              Welcome to the official profile of <strong>Mr. Saju Chacko</strong>, Chairman of Jeevadhara Foundation. Over four decades of humanitarian service, business leadership in Angamaly, and spearheading free dialysis care across Kerala.
            </p>

            {/* Quote Box */}
            <div className="p-5 rounded-xl bg-stone-50 border-l-4 border-amber-800 text-stone-800 space-y-2">
              <p className="italic text-sm font-medium text-stone-700">
                "Our mission through Jeevadhara Renal Care is to ensure that financial hardship never prevents a kidney patient from receiving life-saving dialysis treatment."
              </p>
              <span className="block text-xs font-bold text-stone-900">— Mr. Saju Chacko</span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/achievements"
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold px-6 py-3 rounded-lg shadow transition-all text-sm"
              >
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span>Jeevadhara Achievements</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold px-6 py-3 rounded-lg border border-stone-300 transition-all text-sm"
              >
                <span>Leadership Profile</span>
              </Link>
            </div>

          </div>

          {/* Photograph */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-300 bg-stone-50">
              <Image
                src="/images/saju_chacko_portrait.jpg"
                alt="Mr. Saju Chacko"
                width={600}
                height={750}
                priority
                className="w-full h-[440px] object-cover object-top"
              />
              <div className="bg-stone-900 text-white p-4">
                <h3 className="font-bold text-lg text-amber-400">Mr. Saju Chacko</h3>
                <p className="text-xs text-stone-300 font-medium">Chairman, Jeevadhara Foundation • Angamaly, Kerala</p>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-stone-50 rounded-2xl border border-stone-200 text-stone-900">
          <div className="p-4 text-center border-r border-stone-200 last:border-0">
            <span className="block text-3xl sm:text-4xl font-extrabold text-amber-900">
              {dialysisCount}
            </span>
            <span className="text-xs text-stone-600 font-semibold uppercase tracking-wider mt-1 block">
              Free Dialysis Sessions
            </span>
          </div>
          <div className="p-4 text-center border-r border-stone-200 last:border-0">
            <span className="block text-3xl sm:text-4xl font-extrabold text-stone-800">
              {ysMenYears}
            </span>
            <span className="text-xs text-stone-600 font-semibold uppercase tracking-wider mt-1 block">
              Community Service
            </span>
          </div>
          <div className="p-4 text-center border-r border-stone-200 last:border-0">
            <span className="block text-3xl sm:text-4xl font-extrabold text-emerald-800">
              {campsCount}
            </span>
            <span className="text-xs text-stone-600 font-semibold uppercase tracking-wider mt-1 block">
              Medical Camps
            </span>
          </div>
          <div className="p-4 text-center">
            <span className="block text-3xl sm:text-4xl font-extrabold text-amber-800">
              1st
            </span>
            <span className="text-xs text-stone-600 font-semibold uppercase tracking-wider mt-1 block">
              Indian Best Int. Regional Director
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
