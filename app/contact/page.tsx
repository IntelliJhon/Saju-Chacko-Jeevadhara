"use client";

import { useState } from "react";
import { submitContactMessage } from "@/app/actions";
import { Mail, Phone, MapPin, Send, CheckCircle2, Heart } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [status, setStatus] = useState<{
    submitting: boolean;
    success?: boolean;
    message?: string;
  }>({ submitting: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        submitting: false,
        success: false,
        message: "Please fill out all required fields.",
      });
      return;
    }

    setStatus({ submitting: true });
    try {
      const res = await submitContactMessage(formData);
      if (res.success) {
        setStatus({
          submitting: false,
          success: true,
          message: res.message,
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        setStatus({
          submitting: false,
          success: false,
          message: "Failed to send message. Please try again.",
        });
      }
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded border border-amber-200 inline-block">
            Official Secretariat & Office
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Contact Mr. Saju Chacko & Jeevadhara Office
          </h1>
          <p className="text-stone-700 text-base max-w-3xl leading-relaxed">
            Reach out for dialysis care inquiries, community support requests, leadership collaboration, or public invitations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-extrabold text-stone-900">
                Residence & Foundation Office
              </h2>

              <div className="space-y-4 text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-800 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-stone-900 block">Menacheril House</span>
                    <span>Angamaly P.O., Ernakulam District, Kerala, India - 683572</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Phone className="w-5 h-5 text-amber-800 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-stone-900 block">Direct Telephone</span>
                    <span>+91 94470 32100</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Mail className="w-5 h-5 text-amber-800 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold text-stone-900 block">Email Inquiries</span>
                    <span>info@jeevadharafoundation.org</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 text-white rounded-2xl p-8 border border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Heart className="w-4 h-4 fill-amber-400" />
                <span>Dialysis Patient Assistance</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                For urgent dialysis assistance under Jeevadhara Renal Care, please contact our office directly or submit your request using the contact form.
              </p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  Send a Direct Message
                </h2>
                <p className="text-xs text-stone-500">
                  Messages submitted here are delivered straight to Chairman Mr. Saju Chacko's secretariat.
                </p>
              </div>

              {status.success ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                  <h3 className="font-bold text-lg text-emerald-900">Message Delivered!</h3>
                  <p className="text-xs text-emerald-800">{status.message}</p>
                  <button
                    onClick={() => setStatus({ submitting: false })}
                    className="mt-2 text-xs font-bold text-emerald-900 underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status.message && !status.success && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg">
                      {status.message}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm bg-white"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Dialysis Assistance">Dialysis Assistance Request</option>
                        <option value="Y's Men Communication">Y's Men International Communication</option>
                        <option value="Public Event Invitation">Public Event Invitation</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your message or request here..."
                      className="w-full px-4 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 px-6 rounded-lg transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{status.submitting ? "Sending Message..." : "Submit Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
