"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getNews,
  createNews,
  deleteNews,
  getGallery,
  addGalleryItem,
  deleteGalleryItem,
  getMessages,
  markMessageRead,
  deleteMessage,
  submitContactMessage,
  getStats,
  updateStat,
  addStat,
  deleteStat,
  seedDefaultStats,
  getAboutContent,
  updateAboutContent,
  verifyAdminPasscode,
} from "@/app/actions";
import { DEFAULT_ABOUT_CONTENT } from "@/lib/data";
import CloudinaryUploadWidget from "@/components/CloudinaryUploadWidget";
import {
  Newspaper,
  Image as ImageIcon,
  BarChart2,
  Trash2,
  Plus,
  Lock,
  LogOut,
  Mail,
  Phone,
  CheckCircle,
  Eye,
  UserCheck,
  Save,
  RotateCcw,
  Sparkles,
  ExternalLink,
  AlertCircle,
  Clock,
  Heart,
  Award,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState("");
  const [activeTab, setActiveTab] = useState<"messages" | "news" | "gallery" | "stats" | "about">("messages");

  // Data states
  const [news, setNews] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Forms
  const [newsForm, setNewsForm] = useState({
    title: "",
    summary: "",
    content: "",
    image_url: "",
    category: "Achievement",
    date: new Date().toISOString().split("T")[0],
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    description: "",
    category: "Events",
    image_url: "",
  });

  // Stats edit states
  const [statEdits, setStatEdits] = useState<Record<string, { label: string; value: string }>>({});
  const [statFeedback, setStatFeedback] = useState<Record<string, string>>({});
  const [newStatForm, setNewStatForm] = useState({ key: "", label: "", value: "" });
  const [newStatFeedback, setNewStatFeedback] = useState("");
  const [statsGlobalMsg, setStatsGlobalMsg] = useState("");

  // About form states
  const [aboutForm, setAboutForm] = useState<any>(DEFAULT_ABOUT_CONTENT);
  const [aboutStatus, setAboutStatus] = useState("");
  const [aboutSaving, setAboutSaving] = useState(false);

  // Action status messages
  const [newsStatus, setNewsStatus] = useState("");
  const [galleryStatus, setGalleryStatus] = useState("");
  const [contactTestStatus, setContactTestStatus] = useState("");

  // Check auth session
  useEffect(() => {
    const saved = localStorage.getItem("jeevadhara_admin_auth");
    if (saved === "true") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    const res = await verifyAdminPasscode(passcode);
    if (res.success) {
      localStorage.setItem("jeevadhara_admin_auth", "true");
      setIsAuthenticated(true);
      fetchData();
    } else {
      setPassError(res.message || "Incorrect Passcode");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jeevadhara_admin_auth");
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [n, g, m, s, ab] = await Promise.all([
        getNews(),
        getGallery(),
        getMessages(),
        getStats(),
        getAboutContent(),
      ]);
      setNews(n || []);
      setGallery(g || []);
      setMessages(m || []);
      
      const currentStats = s && s.length > 0 ? s : [];
      setStats(currentStats);

      // Pre-fill editable state for stats
      const editsMap: Record<string, { label: string; value: string }> = {};
      currentStats.forEach((item: any) => {
        editsMap[item.key] = { label: item.label, value: item.value };
      });
      setStatEdits(editsMap);

      if (ab) {
        setAboutForm({ ...DEFAULT_ABOUT_CONTENT, ...ab });
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- NEWS ACTIONS ---
  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsStatus("");
    if (!newsForm.title || !newsForm.summary) return;

    try {
      await createNews(newsForm);
      setNewsForm({
        title: "",
        summary: "",
        content: "",
        image_url: "",
        category: "Achievement",
        date: new Date().toISOString().split("T")[0],
      });
      setNewsStatus("✓ Article published successfully! Visible on website.");
      fetchData();
    } catch (err: any) {
      setNewsStatus("❌ Error publishing article: " + (err.message || "Failed"));
    }
  };

  const handleDeleteNews = async (id: number) => {
    setNews((prev) => prev.filter((item) => item.id !== id));
    await deleteNews(id);
    fetchData();
  };

  // --- GALLERY ACTIONS ---
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setGalleryStatus("");
    if (!galleryForm.title) {
      setGalleryStatus("❌ Please enter a title for the photo.");
      return;
    }
    if (!galleryForm.image_url) {
      setGalleryStatus("❌ Please choose an image file or enter an image URL first.");
      return;
    }

    try {
      await addGalleryItem(galleryForm);
      setGalleryForm({ title: "", description: "", category: "Events", image_url: "" });
      setGalleryStatus("✓ Photo added to gallery! Visible on website.");
      fetchData();
    } catch (err: any) {
      setGalleryStatus("❌ Error adding photo: " + (err.message || "Failed"));
    }
  };

  const handleDeleteGallery = async (id: number) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
    await deleteGalleryItem(id);
    fetchData();
  };

  // --- MESSAGES ACTIONS ---
  const handleMarkRead = async (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: "read" } : msg))
    );
    await markMessageRead(id);
    fetchData();
  };

  const handleDeleteMsg = async (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    await deleteMessage(id);
    fetchData();
  };

  const handleSendTestContactMessage = async () => {
    setContactTestStatus("Sending verification inquiry...");
    try {
      const testData = {
        name: "Test Visitor (Secretariat Verification)",
        email: "visitor.test@example.com",
        phone: "+91 94470 00000",
        subject: "Dialysis Assistance Verification",
        message: "This is a real-time verification message confirming that the contact section correctly stores submissions in the database.",
      };
      const res = await submitContactMessage(testData);
      if (res.success) {
        setContactTestStatus("✓ Verification message stored and loaded successfully in database!");
        fetchData();
      } else {
        setContactTestStatus("❌ Failed to store test message.");
      }
    } catch (err: any) {
      setContactTestStatus("❌ Error: " + (err.message || "Failed"));
    }
  };

  // --- STATS ACTIONS ---
  const handleSaveStat = async (key: string) => {
    const edit = statEdits[key];
    if (!edit) return;
    setStatFeedback((prev) => ({ ...prev, [key]: "Saving..." }));
    try {
      await updateStat(key, edit.value, edit.label);
      setStatFeedback((prev) => ({ ...prev, [key]: "✓ Saved!" }));
      setTimeout(() => {
        setStatFeedback((prev) => ({ ...prev, [key]: "" }));
      }, 3000);
      fetchData();
    } catch (err: any) {
      setStatFeedback((prev) => ({ ...prev, [key]: "❌ " + (err.message || "Failed") }));
    }
  };

  const handleAddCustomStat = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewStatFeedback("");
    if (!newStatForm.key || !newStatForm.label || !newStatForm.value) {
      setNewStatFeedback("❌ Please fill out all fields.");
      return;
    }
    try {
      await addStat(newStatForm);
      setNewStatForm({ key: "", label: "", value: "" });
      setNewStatFeedback("✓ Impact figure added successfully!");
      setTimeout(() => setNewStatFeedback(""), 3500);
      fetchData();
    } catch (err: any) {
      setNewStatFeedback("❌ Error: " + (err.message || "Failed"));
    }
  };

  const handleDeleteStat = async (key: string) => {
    if (confirm(`Are you sure you want to remove impact figure "${key}"?`)) {
      await deleteStat(key);
      fetchData();
    }
  };

  const handleRestoreDefaults = async () => {
    setStatsGlobalMsg("Restoring standard figures...");
    try {
      const seeded = await seedDefaultStats();
      setStats(seeded || []);
      const editsMap: Record<string, { label: string; value: string }> = {};
      (seeded || []).forEach((item: any) => {
        editsMap[item.key] = { label: item.label, value: item.value };
      });
      setStatEdits(editsMap);
      setStatsGlobalMsg("✓ Standard figures restored successfully!");
      setTimeout(() => setStatsGlobalMsg(""), 3500);
    } catch (err: any) {
      setStatsGlobalMsg("❌ Failed to restore figures: " + err.message);
    }
  };

  // --- ABOUT ACTIONS ---
  const handleSaveAbout = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAboutSaving(true);
    setAboutStatus("");
    try {
      await updateAboutContent(aboutForm);
      setAboutStatus("✓ About page content updated successfully and published to website!");
      setTimeout(() => setAboutStatus(""), 4500);
    } catch (err: any) {
      setAboutStatus("❌ Error saving about content: " + (err.message || "Failed"));
    } finally {
      setAboutSaving(false);
    }
  };

  const handleResetAboutDefaults = () => {
    if (confirm("Reset about page content back to standard biography defaults?")) {
      setAboutForm({ ...DEFAULT_ABOUT_CONTENT });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-stone-200 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-stone-900 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900">Administration Portal</h1>
            <p className="text-xs text-stone-500 font-medium">
              Mr. Saju Chacko & Jeevadhara Foundation
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {passError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg text-center font-semibold">
                {passError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Access Passcode"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-800 text-sm font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-lg transition-all text-sm font-sans"
            >
              Unlock Portal
            </button>
          </form>

          <p className="text-[11px] text-center text-stone-400 font-medium">
            Authorized management access only.
          </p>
        </div>
      </div>
    );
  }

  const unreadMessagesCount = messages.filter((m) => m.status !== "read").length;

  return (
    <div className="bg-stone-50 min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Bar */}
        <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              ADMINISTRATION PORTAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Jeevadhara Foundation Management
            </h1>
            <p className="text-xs text-stone-300">
              Manage website content, press releases, media gallery, visitor messages, and biography
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 px-3.5 py-2 rounded-lg text-xs font-bold transition-all border border-stone-700"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2 rounded-lg text-xs font-bold transition-all border border-stone-700"
            >
              <LogOut className="w-4 h-4" />
              <span>Lock Portal</span>
            </button>
          </div>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
              Visitor Messages
            </span>
            <span className="text-2xl font-extrabold text-stone-900 block">
              {messages.length}
            </span>
            <span className="text-[11px] text-amber-800 font-medium">
              {unreadMessagesCount} unread
            </span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
              Press Articles
            </span>
            <span className="text-2xl font-extrabold text-amber-900 block">
              {news.length}
            </span>
            <span className="text-[11px] text-stone-500 font-medium">
              Published on Gazette
            </span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
              Gallery Media
            </span>
            <span className="text-2xl font-extrabold text-teal-900 block">
              {gallery.length}
            </span>
            <span className="text-[11px] text-stone-500 font-medium">
              Photos with captions
            </span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
              Free Dialysis Count
            </span>
            <span className="text-2xl font-extrabold text-rose-900 block">
              {stats.find((s) => s.key === "dialysis")?.value || "49,000+"}
            </span>
            <span className="text-[11px] text-stone-500 font-medium">
              Hero figure
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-300 space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
              activeTab === "messages"
                ? "border-stone-900 text-stone-900 bg-white rounded-t-lg"
                : "border-transparent text-stone-600 hover:text-stone-900"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Visitor Inquiries ({unreadMessagesCount} New)</span>
          </button>

          <button
            onClick={() => setActiveTab("news")}
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
              activeTab === "news"
                ? "border-stone-900 text-stone-900 bg-white rounded-t-lg"
                : "border-transparent text-stone-600 hover:text-stone-900"
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Press & News Articles</span>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
              activeTab === "gallery"
                ? "border-stone-900 text-stone-900 bg-white rounded-t-lg"
                : "border-transparent text-stone-600 hover:text-stone-900"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Photo Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
              activeTab === "stats"
                ? "border-stone-900 text-stone-900 bg-white rounded-t-lg"
                : "border-transparent text-stone-600 hover:text-stone-900"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Impact Figures</span>
          </button>

          <button
            onClick={() => setActiveTab("about")}
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all shrink-0 ${
              activeTab === "about"
                ? "border-stone-900 text-stone-900 bg-white rounded-t-lg"
                : "border-transparent text-stone-600 hover:text-stone-900"
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>About Section Editor</span>
          </button>
        </div>

        {/* Tab 1: Messages */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-stone-900">
                  Visitor Messages & Contact Inquiries
                </h2>
                <p className="text-xs text-stone-500">
                  Submissions sent from the website Contact page are securely stored here in PostgreSQL.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSendTestContactMessage}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold border border-stone-300 transition-all flex items-center gap-1.5"
                  title="Verify contact storage with a sample test entry"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Send Verification Inquiry</span>
                </button>
                <span className="text-xs text-stone-600 font-semibold bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                  Total: {messages.length} messages
                </span>
              </div>
            </div>

            {contactTestStatus && (
              <div className={`p-3 rounded-lg text-xs font-bold border ${contactTestStatus.startsWith("✓") ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-stone-100 text-stone-800 border-stone-300"}`}>
                {contactTestStatus}
              </div>
            )}

            {messages.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-sm border border-dashed border-stone-300 rounded-xl space-y-3">
                <Mail className="w-8 h-8 text-stone-400 mx-auto" />
                <p className="font-semibold">No visitor messages received yet.</p>
                <p className="text-xs text-stone-400 max-w-sm mx-auto">
                  When visitors submit inquiries on the public Contact page, their message, phone, and email will instantly appear here.
                </p>
                <button
                  onClick={handleSendTestContactMessage}
                  className="mt-2 text-xs font-bold text-amber-900 underline hover:text-amber-800"
                >
                  Click to send a test message now to verify storage
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-xl border transition-all space-y-3 ${
                      msg.status === "read"
                        ? "bg-stone-50/70 border-stone-200"
                        : "bg-amber-50/50 border-amber-200"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-stone-200 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-base">
                            {msg.name}
                          </span>
                          <span
                            className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full border ${
                              msg.status === "read"
                                ? "bg-stone-200 text-stone-700 border-stone-300"
                                : "bg-amber-200 text-amber-900 border-amber-300"
                            }`}
                          >
                            {msg.status === "read" ? "Read" : "Unread"}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 font-medium mt-1">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Jeevadhara Inquiry")}`}
                            className="text-amber-900 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Mail className="w-3 h-3" />
                            <span>{msg.email}</span>
                          </a>

                          {msg.phone && (
                            <a
                              href={`tel:${msg.phone}`}
                              className="text-teal-900 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{msg.phone}</span>
                            </a>
                          )}

                          <span className="text-stone-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              {msg.created_at
                                ? new Date(msg.created_at).toLocaleString()
                                : "Recent"}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {msg.status !== "read" && (
                          <button
                            onClick={() => handleMarkRead(msg.id)}
                            className="px-3 py-1 bg-stone-900 text-white rounded text-xs font-bold hover:bg-stone-800"
                          >
                            Mark Read
                          </button>
                        )}
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Jeevadhara Inquiry")}`}
                          className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-bold border border-stone-300"
                        >
                          Reply
                        </a>
                        <button
                          onClick={() => handleDeleteMsg(msg.id)}
                          className="p-1.5 text-rose-700 hover:bg-rose-100 rounded"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-amber-900 uppercase block">
                        Subject: {msg.subject}
                      </span>
                      <p className="text-stone-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: News */}
        {activeTab === "news" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create News Form */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-stone-900">
                Create Press Article
              </h2>

              <form onSubmit={handleCreateNews} className="space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Headline *</label>
                  <input
                    type="text"
                    required
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    placeholder="Article Headline..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm bg-white"
                  >
                    <option value="Achievement">Achievement</option>
                    <option value="Publication">Publication</option>
                    <option value="Dialysis Care">Dialysis Care</option>
                    <option value="Leadership">Leadership</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Summary *</label>
                  <textarea
                    required
                    rows={2}
                    value={newsForm.summary}
                    onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                    placeholder="Short highlight..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Full Content</label>
                  <textarea
                    rows={4}
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    placeholder="Full article content..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Article Image</label>
                  <CloudinaryUploadWidget
                    onUploadSuccess={(url) => setNewsForm({ ...newsForm, image_url: url })}
                  />
                  {newsForm.image_url && (
                    <div className="mt-2 text-[11px] text-teal-800 font-semibold truncate">
                      ✓ Image Attached: {newsForm.image_url}
                    </div>
                  )}
                </div>

                {newsStatus && (
                  <div className={`p-3 rounded-lg text-xs font-bold border ${newsStatus.startsWith("✓") ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-rose-50 text-rose-800 border-rose-200"}`}>
                    {newsStatus}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-lg transition-all text-xs flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Article</span>
                </button>
              </form>
            </div>

            {/* News List */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-stone-900">
                Published Press Articles
              </h2>

              {news.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs border border-dashed border-stone-300 rounded-xl">
                  No articles published yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-amber-900 uppercase">
                            {item.date} • {item.category}
                          </span>
                          <h3 className="font-bold text-stone-900 text-base">{item.title}</h3>
                        </div>
                        <button
                          onClick={() => handleDeleteNews(item.id)}
                          className="p-1.5 text-rose-700 hover:bg-rose-100 rounded"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{item.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Gallery (Now with Description!) */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-stone-900">
                  Add Photo to Gallery
                </h2>
                <p className="text-xs text-stone-500">
                  Add images with descriptive captions for the public gallery archives.
                </p>
              </div>

              <form onSubmit={handleAddGallery} className="space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Photo Title *</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    placeholder="e.g. Dialysis Ward Inauguration Ceremony"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Category</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm bg-white"
                  >
                    <option value="Events">Events</option>
                    <option value="Dialysis Care">Dialysis Care</option>
                    <option value="Awards">Awards & Honors</option>
                    <option value="Public Meetings">Public Meetings</option>
                  </select>
                </div>

                {/* Description Field (Added as requested!) */}
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">
                    Photo Description / Caption Details (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={galleryForm.description}
                    onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                    placeholder="Add details about the occasion, dignitaries attending, or location..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Upload Image *</label>
                  <CloudinaryUploadWidget
                    onUploadSuccess={(url) => setGalleryForm({ ...galleryForm, image_url: url })}
                  />
                  {galleryForm.image_url && (
                    <div className="mt-2 text-[11px] text-teal-800 font-semibold truncate">
                      ✓ Image Ready: {galleryForm.image_url}
                    </div>
                  )}
                </div>

                {galleryStatus && (
                  <div className={`p-3 rounded-lg text-xs font-bold border ${galleryStatus.startsWith("✓") ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-rose-50 text-rose-800 border-rose-200"}`}>
                    {galleryStatus}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-lg transition-all text-xs flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Photo to Gallery</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-stone-900">
                Photo Gallery Archives ({gallery.length})
              </h2>

              {gallery.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs border border-dashed border-stone-300 rounded-xl">
                  No photos in gallery archives. Use the form on the left to upload your first photo.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {gallery.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl border border-stone-200 bg-stone-50 space-y-2 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="h-36 w-full overflow-hidden rounded-lg bg-stone-200">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-[9px] font-bold text-amber-900 uppercase block">
                              {item.category}
                            </span>
                            <h4 className="font-bold text-xs text-stone-900 line-clamp-1">
                              {item.title}
                            </h4>
                          </div>
                          <button
                            onClick={() => handleDeleteGallery(item.id)}
                            className="p-1 text-rose-700 hover:bg-rose-100 rounded shrink-0"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.description && (
                          <p className="text-[11px] text-stone-600 line-clamp-2 italic border-t border-stone-200 pt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Stats (Impact Figures with Full Editable Option!) */}
        {activeTab === "stats" && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-100 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-stone-900">
                    Editable Impact Figures & Counter Badges
                  </h2>
                  <p className="text-xs text-stone-500">
                    Edit labels and values for foundation numbers displayed in the home hero and achievement sections.
                  </p>
                </div>

                <button
                  onClick={handleRestoreDefaults}
                  className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold border border-stone-300 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Standard Figures</span>
                </button>
              </div>

              {statsGlobalMsg && (
                <div className={`p-3 rounded-lg text-xs font-bold border ${statsGlobalMsg.startsWith("✓") ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-rose-50 text-rose-800 border-rose-200"}`}>
                  {statsGlobalMsg}
                </div>
              )}

              {stats.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-stone-300 rounded-xl space-y-3">
                  <BarChart2 className="w-8 h-8 text-stone-400 mx-auto" />
                  <p className="text-sm font-bold text-stone-700">No impact figures registered yet.</p>
                  <p className="text-xs text-stone-500">Initialize standard foundation numbers (Dialysis count, Y's Men leadership, camps, beneficiaries).</p>
                  <button
                    onClick={handleRestoreDefaults}
                    className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800"
                  >
                    Click to Initialize Standard Figures
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((st) => {
                    const edit = statEdits[st.key] || { label: st.label, value: st.value };
                    const fb = statFeedback[st.key];
                    return (
                      <div
                        key={st.key}
                        className="p-5 rounded-xl border border-stone-200 bg-stone-50/70 space-y-4 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                              Key: {st.key}
                            </span>
                            <button
                              onClick={() => handleDeleteStat(st.key)}
                              className="text-stone-400 hover:text-rose-700"
                              title="Delete Counter"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-stone-600 uppercase">
                              Metric Label:
                            </label>
                            <input
                              type="text"
                              value={edit.label}
                              onChange={(e) =>
                                setStatEdits({
                                  ...statEdits,
                                  [st.key]: { ...edit, label: e.target.value },
                                })
                              }
                              className="w-full px-3 py-1.5 border border-stone-300 rounded text-xs font-semibold bg-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-stone-600 uppercase">
                              Display Value:
                            </label>
                            <input
                              type="text"
                              value={edit.value}
                              onChange={(e) =>
                                setStatEdits({
                                  ...statEdits,
                                  [st.key]: { ...edit, value: e.target.value },
                                })
                              }
                              placeholder="e.g. 49,000+"
                              className="w-full px-3 py-1.5 border border-stone-300 rounded text-sm font-extrabold text-stone-900 bg-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-stone-200">
                          {fb && (
                            <span className={`block text-[11px] font-bold text-center ${fb.startsWith("✓") ? "text-emerald-700" : "text-rose-700"}`}>
                              {fb}
                            </span>
                          )}
                          <button
                            onClick={() => handleSaveStat(st.key)}
                            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Save className="w-3.5 h-3.5 text-amber-400" />
                            <span>Save Changes</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Add Custom Impact Figure */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4 max-w-xl">
              <h3 className="text-base font-extrabold text-stone-900">
                Add Custom Impact Counter
              </h3>
              <form onSubmit={handleAddCustomStat} className="space-y-3 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Key (ID) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. kits"
                      value={newStatForm.key}
                      onChange={(e) => setNewStatForm({ ...newStatForm, key: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Label *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dialysis Kits"
                      value={newStatForm.label}
                      onChange={(e) => setNewStatForm({ ...newStatForm, label: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Value *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5,000+"
                      value={newStatForm.value}
                      onChange={(e) => setNewStatForm({ ...newStatForm, value: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs"
                    />
                  </div>
                </div>

                {newStatFeedback && (
                  <div className={`p-2.5 rounded-lg text-xs font-bold border ${newStatFeedback.startsWith("✓") ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-rose-50 text-rose-800 border-rose-200"}`}>
                    {newStatFeedback}
                  </div>
                )}

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Add Impact Figure</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tab 5: About Section Editor (Newly Added!) */}
        {activeTab === "about" && (
          <div className="bg-white rounded-2xl p-6 lg:p-8 border border-stone-200 shadow-sm space-y-8 font-sans">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200 pb-5">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-amber-900 block">
                  LIVE PAGE EDITOR
                </span>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  Edit Biography & About Section
                </h2>
                <p className="text-xs text-stone-500">
                  Changes saved here instantly update the public biography page (/about).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetAboutDefaults}
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-lg border border-stone-300 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <Link
                  href="/about"
                  target="_blank"
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-lg border border-stone-300 flex items-center gap-1.5"
                >
                  <span>Preview Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => handleSaveAbout()}
                  disabled={aboutSaving}
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow"
                >
                  <Save className="w-3.5 h-3.5 text-amber-400" />
                  <span>{aboutSaving ? "Saving..." : "Save About Content"}</span>
                </button>
              </div>
            </div>

            {aboutStatus && (
              <div className={`p-4 rounded-xl text-xs font-bold border ${aboutStatus.startsWith("✓") ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-rose-50 text-rose-800 border-rose-200"}`}>
                {aboutStatus}
              </div>
            )}

            <form onSubmit={handleSaveAbout} className="space-y-8 text-xs font-sans">
              
              {/* Section 1: Header & Quick Bio */}
              <div className="p-6 rounded-xl border border-stone-200 bg-stone-50/70 space-y-4">
                <div className="flex items-center gap-2 text-stone-900 font-extrabold text-sm border-b border-stone-200 pb-2">
                  <UserCheck className="w-4 h-4 text-amber-800" />
                  <span>Page Headline & Leadership Roles</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Top Badge</label>
                    <input
                      type="text"
                      value={aboutForm.headerBadge || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, headerBadge: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Primary Role</label>
                    <input
                      type="text"
                      value={aboutForm.bioRole || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, bioRole: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Main Page Title</label>
                  <input
                    type="text"
                    value={aboutForm.headerTitle || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, headerTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-sm font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Biography Lead Summary</label>
                  <textarea
                    rows={2}
                    value={aboutForm.headerSubtitle || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, headerSubtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Y's Men Seniority</label>
                    <input
                      type="text"
                      value={aboutForm.bioYsMen || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, bioYsMen: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Business Legacy</label>
                    <input
                      type="text"
                      value={aboutForm.bioBusiness || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, bioBusiness: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Academic Title</label>
                    <input
                      type="text"
                      value={aboutForm.bioAcademic || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, bioAcademic: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Residence & Office Address</label>
                    <input
                      type="text"
                      value={aboutForm.bioAddress || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, bioAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Official Phone</label>
                    <input
                      type="text"
                      value={aboutForm.bioPhone || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, bioPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Renal Care */}
              <div className="p-6 rounded-xl border border-stone-200 bg-stone-50/70 space-y-4">
                <div className="flex items-center gap-2 text-stone-900 font-extrabold text-sm border-b border-stone-200 pb-2">
                  <Heart className="w-4 h-4 text-teal-800" />
                  <span>Jeevadhara Renal Care Section</span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Section Headline</label>
                  <input
                    type="text"
                    value={aboutForm.renalTitle || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, renalTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Full Description</label>
                  <textarea
                    rows={4}
                    value={aboutForm.renalContent || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, renalContent: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 p-3 bg-white rounded-lg border border-stone-200">
                    <label className="font-bold text-stone-700 uppercase block">Highlight 1 Title & Text</label>
                    <input
                      type="text"
                      value={aboutForm.renalHighlight1Title || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, renalHighlight1Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs font-semibold mb-1"
                    />
                    <textarea
                      rows={2}
                      value={aboutForm.renalHighlight1Text || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, renalHighlight1Text: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs"
                    />
                  </div>

                  <div className="space-y-2 p-3 bg-white rounded-lg border border-stone-200">
                    <label className="font-bold text-stone-700 uppercase block">Highlight 2 Title & Text</label>
                    <input
                      type="text"
                      value={aboutForm.renalHighlight2Title || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, renalHighlight2Title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs font-semibold mb-1"
                    />
                    <textarea
                      rows={2}
                      value={aboutForm.renalHighlight2Text || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, renalHighlight2Text: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Y's Men Leadership */}
              <div className="p-6 rounded-xl border border-stone-200 bg-stone-50/70 space-y-4">
                <div className="flex items-center gap-2 text-stone-900 font-extrabold text-sm border-b border-stone-200 pb-2">
                  <Award className="w-4 h-4 text-amber-800" />
                  <span>Y's Men International Leadership & International Award</span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Section Headline</label>
                  <input
                    type="text"
                    value={aboutForm.ysMenTitle || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, ysMenTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Leadership Story</label>
                  <textarea
                    rows={3}
                    value={aboutForm.ysMenContent || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, ysMenContent: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs leading-relaxed"
                  />
                </div>

                <div className="space-y-2 p-3 bg-white rounded-lg border border-stone-200">
                  <label className="font-bold text-stone-700 uppercase block">Geneva Award Headline & Details</label>
                  <input
                    type="text"
                    value={aboutForm.ysMenAwardTitle || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, ysMenAwardTitle: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs font-bold mb-1"
                  />
                  <textarea
                    rows={2}
                    value={aboutForm.ysMenAwardText || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, ysMenAwardText: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-stone-300 rounded text-xs"
                  />
                </div>
              </div>

              {/* Section 4: Business & Community Leadership */}
              <div className="p-6 rounded-xl border border-stone-200 bg-stone-50/70 space-y-4">
                <div className="flex items-center gap-2 text-stone-900 font-extrabold text-sm border-b border-stone-200 pb-2">
                  <Briefcase className="w-4 h-4 text-stone-900" />
                  <span>Business Legacy & Community Institutions</span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Section Headline</label>
                  <input
                    type="text"
                    value={aboutForm.businessTitle || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, businessTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Business Background</label>
                  <textarea
                    rows={2}
                    value={aboutForm.businessContent || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, businessContent: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Founder Institutions (One per line)</label>
                    <textarea
                      rows={3}
                      value={aboutForm.founderInstitutions || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, founderInstitutions: e.target.value })}
                      placeholder="• Rotaract Club Angamaly&#10;• Angamaly Sports Association"
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-stone-700 uppercase">Merchant Leadership (One per line)</label>
                    <textarea
                      rows={3}
                      value={aboutForm.merchantLeadership || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, merchantLeadership: e.target.value })}
                      placeholder="• Unit President, Vyapari Vyavasayi Ekopana Samithi"
                      className="w-full px-2.5 py-1.5 bg-white border border-stone-300 rounded text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: Doctorate & Publication */}
              <div className="p-6 rounded-xl border border-stone-200 bg-stone-50/70 space-y-4">
                <div className="flex items-center gap-2 text-stone-900 font-extrabold text-sm border-b border-stone-200 pb-2">
                  <GraduationCap className="w-4 h-4 text-indigo-900" />
                  <span>Academic Doctorate & Book Publication</span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Section Headline</label>
                  <input
                    type="text"
                    value={aboutForm.doctorateTitle || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, doctorateTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Doctorate & Publication Text</label>
                  <textarea
                    rows={3}
                    value={aboutForm.doctorateContent || ""}
                    onChange={(e) => setAboutForm({ ...aboutForm, doctorateContent: e.target.value })}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-stone-300 text-xs leading-relaxed"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={aboutSaving}
                  className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-lg text-xs flex items-center gap-2 shadow"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>{aboutSaving ? "Saving Content..." : "Save About Page Content"}</span>
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
