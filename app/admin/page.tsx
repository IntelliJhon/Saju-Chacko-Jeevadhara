"use client";

import { useState, useEffect } from "react";
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
  getStats,
  updateStat,
  verifyAdminPasscode,
} from "@/app/actions";
import CloudinaryUploadWidget from "@/components/CloudinaryUploadWidget";
import {
  Newspaper,
  Image as ImageIcon,
  MessageSquare,
  BarChart2,
  Trash2,
  Plus,
  Lock,
  LogOut,
  Mail,
  Phone,
  CheckCircle,
  Eye,
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [passError, setPassError] = useState("");
  const [activeTab, setActiveTab] = useState<"news" | "gallery" | "messages" | "stats">("messages");

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
    category: "Events",
    image_url: "",
  });

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
      const [n, g, m, s] = await Promise.all([
        getNews(),
        getGallery(),
        getMessages(),
        getStats(),
      ]);
      setNews(n || []);
      setGallery(g || []);
      setMessages(m || []);
      setStats(s || []);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Actions
  const [newsStatus, setNewsStatus] = useState("");
  const [galleryStatus, setGalleryStatus] = useState("");

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsStatus("");
    if (!newsForm.title || !newsForm.summary) return;
    
    // Optimistic UI state update
    const tempItem = { ...newsForm, id: Date.now() };
    setNews((prev) => [tempItem, ...prev]);

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

    // Optimistic UI state update
    const tempItem = { ...galleryForm, id: Date.now() };
    setGallery((prev) => [tempItem, ...prev]);

    try {
      await addGalleryItem(galleryForm);
      setGalleryForm({ title: "", category: "Events", image_url: "" });
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

  const handleUpdateStatValue = async (key: string, value: string, label?: string) => {
    setStats((prev) =>
      prev.map((st) => (st.key === key ? { ...st, value } : st))
    );
    await updateStat(key, value, label);
    fetchData();
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
              Manage website content, press releases, media gallery, and visitor messages
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2 rounded-lg text-xs font-bold transition-all border border-stone-700"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock Portal</span>
          </button>
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
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
              Press Articles
            </span>
            <span className="text-2xl font-extrabold text-amber-900 block">
              {news.length}
            </span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
              Gallery Media
            </span>
            <span className="text-2xl font-extrabold text-teal-900 block">
              {gallery.length}
            </span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-sm space-y-1">
            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block">
              Free Dialysis Count
            </span>
            <span className="text-2xl font-extrabold text-rose-900 block">
              {stats.find((s) => s.key === "dialysis")?.value || "49,000+"}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-300 space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
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
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
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
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
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
            className={`px-5 py-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "stats"
                ? "border-stone-900 text-stone-900 bg-white rounded-t-lg"
                : "border-transparent text-stone-600 hover:text-stone-900"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Impact Figures</span>
          </button>
        </div>

        {/* Tab 1: Messages */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-extrabold text-stone-900">
                Visitor Messages & Support Requests
              </h2>
              <span className="text-xs text-stone-500 font-semibold">
                Total: {messages.length} messages
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-12 text-stone-500 text-sm border border-dashed border-stone-300 rounded-xl">
                No visitor messages received yet.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-5 rounded-xl border transition-all space-y-3 ${
                      msg.status === "read"
                        ? "bg-stone-50 border-stone-200"
                        : "bg-amber-50/50 border-amber-200"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-stone-200 pb-3">
                      <div>
                        <span className="font-bold text-stone-900 text-base block">
                          {msg.name}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-stone-600 font-medium">
                          <span>{msg.email}</span>
                          {msg.phone && <span>• {msg.phone}</span>}
                          <span>• {new Date(msg.created_at).toLocaleDateString()}</span>
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
                      <span className="text-xs font-bold text-amber-900 uppercase">
                        Subject: {msg.subject}
                      </span>
                      <p className="text-stone-800 text-xs sm:text-sm leading-relaxed">
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
                  No articles published.
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

        {/* Tab 3: Gallery */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h2 className="text-xl font-extrabold text-stone-900">
                Add Photo to Gallery
              </h2>

              <form onSubmit={handleAddGallery} className="space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <label className="font-bold text-stone-700 uppercase">Photo Title *</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    placeholder="Event title or photo caption..."
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
                Photo Gallery Archives
              </h2>

              {gallery.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs border border-dashed border-stone-300 rounded-xl">
                  No photos in gallery archives.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {gallery.map((item) => (
                    <div key={item.id} className="p-3 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                      <div className="h-32 w-full overflow-hidden rounded bg-stone-200">
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
                          className="p-1 text-rose-700 hover:bg-rose-100 rounded"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 4: Stats */}
        {activeTab === "stats" && (
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-stone-900">
                Update Impact Figures
              </h2>
              <p className="text-xs text-stone-500">
                Update key foundation counters displayed on the home page hero section.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((st) => (
                <div key={st.key} className="p-5 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
                  <span className="text-xs font-bold text-amber-900 uppercase">
                    {st.label} ({st.key})
                  </span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      defaultValue={st.value}
                      onBlur={(e) => handleUpdateStatValue(st.key, e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-sm font-bold"
                    />
                    <span className="text-[11px] text-stone-500 block">
                      Edit value and click outside to save automatically.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
