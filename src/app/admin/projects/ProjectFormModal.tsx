/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { X, UploadCloud, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const categories = [
  "Civil Constructions",
  "Construction Materials Supply",
  "Construction Equipment Services",
];

export default function ProjectFormModal({
  initialData,
  onClose,
  onSaved,
}: {
  initialData: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = Boolean(initialData?._id);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Civil Constructions",
    location: "",
    client: "",
    equipment: "",
    description: "",
    challenge: "",
    duration: "",
    stats: "",
    image: "",
    youtubeUrl: "",
    isFeatured: false,
    status: "draft",
  });

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "Civil Constructions",
        location: initialData.location || "",
        client: initialData.client || "",
        equipment: initialData.equipment || "",
        description: initialData.description || "",
        challenge: initialData.challenge || "",
        duration: initialData.duration || "",
        stats: initialData.stats || "",
        image: initialData.image || "",
        youtubeUrl: initialData.youtubeUrl || "",
        isFeatured: initialData.isFeatured || false,
        status: initialData.status || "draft",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Image Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      const resData = await res.json();

      if (resData.url) {
        setFormData((prev) => ({ ...prev, image: resData.url }));
        toast.success("Image uploaded");
      } else {
        throw new Error("Upload failed");
      }
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ✅ FIX: Submit Handler - Only called from form onSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.client) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const url = isEdit ? `/api/projects/${initialData._id}` : "/api/projects";
    const method = isEdit ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");

      toast.success(`Project ${isEdit ? "updated" : "created"} successfully`);
      onSaved();
      onClose();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save project",
      );
    } finally {
      setLoading(false);
    }
  };

  // Tailwind Input Classes for consistency
  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-[#002253] text-sm focus:border-[#224B88] focus:ring-2 focus:ring-[#224B88]/10 outline-none transition-all";
  const labelClass =
    "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 pt-10 md:pt-20 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50 rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-[#002253]">
              {isEdit ? "Edit Project" : "Create New Project"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Fill in the details below. Fields marked with * are required.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* ✅ FIX: Form wraps EVERYTHING including submit button */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Form Body */}
          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Row 1: Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Project Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Dhaka Elevated Expressway"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Location & Client */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Dhaka, Bangladesh"
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Client Entity *</label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. Bangladesh Army"
                  required
                />
              </div>
            </div>

            {/* Row 3: Duration & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 28 Months"
                />
              </div>
              <div>
                <label className={labelClass}>Key Metric / Stats</label>
                <input
                  type="text"
                  name="stats"
                  value={formData.stats}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="e.g. 8.5 km Overhead Spans"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className={labelClass}>Project Image</label>
              <div className="flex items-center gap-4">
                {formData.image && (
                  <div className="w-24 h-16 rounded-lg border border-slate-200 overflow-hidden shrink-0">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <label className="flex-1 flex items-center justify-center gap-2 h-16 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-[#224B88] hover:bg-slate-50 transition-colors text-slate-400">
                  {uploading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <UploadCloud size={18} />
                  )}
                  <span className="text-sm font-medium">
                    {uploading ? "Uploading..." : "Click to upload image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Textareas: Equipment */}
            <div>
              <label className={labelClass}>Machinery & Equipment</label>
              <textarea
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
                rows={3}
                className={inputClass + " resize-none"}
                placeholder="List the equipment used..."
              />
            </div>

            {/* Textareas: Description */}
            <div>
              <label className={labelClass}>Project Overview</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={inputClass + " resize-none"}
                placeholder="Brief description of the project..."
                required
              />
            </div>

            {/* Textareas: Challenge */}
            <div>
              <label className={labelClass}>The Challenge</label>
              <textarea
                name="challenge"
                value={formData.challenge}
                onChange={handleChange}
                rows={3}
                className={inputClass + " resize-none"}
                placeholder="What were the main challenges?"
              />
            </div>

            {/* Row 4: YouTube URL & Status/Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
              <div>
                <label className={labelClass}>YouTube Video URL</label>
                <input
                  type="url"
                  name="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <div className="flex flex-col justify-end gap-3">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#E55503] border-slate-300 rounded focus:ring-[#E55503]"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Featured Project
                    </span>
                  </label>
                </div>
                <div>
                  <label className={labelClass}>Publish Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="draft">Draft (Hidden)</option>
                    <option value="published">Published (Live)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ FIX: Footer INSIDE form, button is type="submit" with NO onClick */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#002253] text-white rounded-lg text-sm font-semibold hover:bg-[#00122e] transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {isEdit ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
