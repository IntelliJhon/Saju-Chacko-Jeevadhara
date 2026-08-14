import Link from "next/link";
import { Heart, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white border-t border-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Identity */}
          <div className="space-y-4 md:col-span-1">
            <span className="text-xl font-bold text-white block">
              Mr. Saju Chacko
            </span>
            <p className="text-xs text-stone-300 leading-relaxed">
              Chairman, Jeevadhara Foundation. Dedicated to free kidney care, social leadership, and community service in Angamaly & Kerala.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 pt-1 font-semibold">
              <Heart className="w-4 h-4 fill-amber-400" />
              <span>49,000+ Free Dialysis Treatments</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-stone-300">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">About Mr. Saju Chacko</Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-amber-400 transition-colors">Jeevadhara Achievements</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 transition-colors">Photo Gallery</Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-amber-400 transition-colors">News & Gazette</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Office</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Roles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Leadership Portfolios
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>• Chairman, Jeevadhara Foundation</li>
              <li>• Initiator, Jeevadhara Renal Care</li>
              <li>• Former Int. Regional Director, Y's Men</li>
              <li>• Founder Pres., Rotaract Club Angamaly</li>
              <li>• Leader, Vyapari Vyavasayi Ekopana Samithi</li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Office Contact
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Menacheril House, Angamaly, Ernakulam, Kerala 683572</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>+91 94470 32100</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>info@jeevadharafoundation.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Mr. Saju Chacko & Jeevadhara Foundation. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-amber-400 text-stone-400 flex items-center gap-1 text-[11px] font-semibold">
              <span>Admin Management Portal</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
