"use client";

import { useState } from "react";
import { Upload, CheckCircle, AlertCircle, Loader2, Image as ImageIcon } from "lucide-react";

interface CloudinaryUploadWidgetProps {
  onUploadSuccess: (url: string) => void;
  defaultUrl?: string;
  label?: string;
}

export default function CloudinaryUploadWidget({
  onUploadSuccess,
  defaultUrl = "",
  label = "Upload Image (Cloudinary or Direct)",
}: CloudinaryUploadWidgetProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(defaultUrl);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setSuccessMsg("");

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "cj9atno2";
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "Saju Chacko";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.secure_url) {
        setPreview(data.secure_url);
        onUploadSuccess(data.secure_url);
        setSuccessMsg("✓ Image uploaded to Cloudinary!");
      } else {
        // Fallback to local Data URL if Cloudinary preset is invalid or unconfigured
        console.warn("Cloudinary preset returned error, converting locally:", data);
        const dataUrl = await readFileAsDataUrl(file);
        setPreview(dataUrl);
        onUploadSuccess(dataUrl);
        setSuccessMsg("✓ Image processed & attached successfully!");
      }
    } catch (err: any) {
      console.warn("Cloudinary upload failed, using local encoding fallback:", err);
      try {
        const dataUrl = await readFileAsDataUrl(file);
        setPreview(dataUrl);
        onUploadSuccess(dataUrl);
        setSuccessMsg("✓ Image attached successfully!");
      } catch (readErr: any) {
        setError("Failed to read image file.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
        {label}
      </label>

      <div className="flex items-center gap-4">
        {/* Preview box */}
        <div className="w-20 h-20 rounded-lg border-2 border-dashed border-stone-300 bg-stone-50 overflow-hidden flex items-center justify-center relative shrink-0">
          {preview ? (
            <img src={preview} alt="Uploaded Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-8 h-8 text-stone-400" />
          )}
        </div>

        {/* Upload input button */}
        <div className="flex-1 space-y-2">
          <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer transition-all">
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Processing Image...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Choose Image File</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>

          {successMsg && (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-1.5 rounded border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Direct URL input fallback */}
      <div className="pt-1">
        <span className="text-[11px] text-stone-500 font-medium">Or paste image URL directly:</span>
        <input
          type="text"
          value={preview}
          onChange={(e) => {
            setPreview(e.target.value);
            onUploadSuccess(e.target.value);
          }}
          placeholder="https://images.unsplash.com/... or https://res.cloudinary.com/..."
          className="mt-1 w-full px-3 py-1.5 border border-stone-300 rounded-md text-xs focus:ring-1 focus:ring-stone-800 focus:outline-none"
        />
      </div>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium bg-rose-50 p-2 rounded-md border border-rose-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

