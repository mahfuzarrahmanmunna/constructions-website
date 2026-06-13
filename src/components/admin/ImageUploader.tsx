"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUploader({ label, value, onChange }: Props) {
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-[#002253]">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative w-20 h-20 rounded-lg border overflow-hidden">
            <img src={value} alt={label} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5"
            >
              <X size={12} className="text-white" />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-lg border border-dashed flex items-center justify-center text-gray-400">
            <Upload size={18} />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="text-sm"
        />
        {loading && <span className="text-xs text-gray-400">Uploading...</span>}
      </div>
    </div>
  );
}