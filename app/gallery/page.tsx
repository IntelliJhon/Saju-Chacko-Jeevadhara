import { fetchGallery } from "@/lib/data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Photo Gallery | Mr. Saju Chacko & Jeevadhara Foundation",
  description:
    "Explore event photographs, community interactions, dialysis care activities, public meetings, and leadership moments of Mr. Saju Chacko.",
};

export default async function GalleryPage() {
  const galleryItems = await fetchGallery();

  return (
    <div className="bg-stone-50 py-12 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Title */}
        <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded border border-amber-200 inline-block">
            Photographic Archives
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Photo Gallery & Service Moments
          </h1>
          <p className="text-stone-700 text-base max-w-3xl leading-relaxed">
            Moments captured across 40+ years of community leadership, dialysis care inaugurations, medical camps, Y's Men International functions, and merchant association meetings.
          </p>
        </div>

        {/* Gallery Grid */}
        {galleryItems.length === 0 ? (
          <div className="text-center py-16 text-stone-500 font-sans border border-dashed border-stone-300 rounded-lg">
            No gallery photos added yet. Photos uploaded in the Admin panel will appear here in real time.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden border border-stone-300 shadow-sm flex flex-col justify-between"
              >
                <div className="relative h-64 w-full bg-stone-200">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-base text-stone-900 leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-stone-600 leading-relaxed pt-1 border-t border-stone-100 whitespace-pre-line">
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
  );
}
