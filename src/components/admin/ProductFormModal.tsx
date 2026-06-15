/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import ImageUploader from "./ImageUploader";

type Spec = { model: string; label: string; value: string };
type Feature = { title: string; description: string };

type ProductFormData = {
  _id?: string;
  title: string;
  subTitle: string;
  description: string;
  image: string;
  heroImage?: string;
  heroTitle?: string;
  heroSubTitle?: string;
  machineType: string;
  category: string;
  productId: number;
  modelId: number;
  price: number;
  features: Feature[];
  specs: Spec[];
  galleryImages: string[];
  galleryVideos: string[];
};

const emptyProduct: ProductFormData = {
  title: "",
  subTitle: "",
  description: "",
  image: "",
  heroImage: "",
  heroTitle: "",
  heroSubTitle: "",
  machineType: "",
  category: "",
  productId: 0,
  modelId: 0,
  price: 0,
  features: [],
  specs: [],
  galleryImages: [],
  galleryVideos: [],
};

type Props = {
  initialData?: any;
  onClose: () => void;
  onSaved: () => void;
};

export default function ProductFormModal({ initialData, onClose, onSaved }: Props) {
  const isEdit = Boolean(initialData?._id);

  const [form, setForm] = useState<ProductFormData>(
    initialData
      ? {
          ...emptyProduct,
          ...initialData,
        }
      : emptyProduct
  );
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Features
  const addFeature = () => update("features", [...form.features, { title: "", description: "" }]);
  const updateFeature = (i: number, key: keyof Feature, value: string) => {
    const updated = [...form.features];
    updated[i] = { ...updated[i], [key]: value };
    update("features", updated);
  };
  const removeFeature = (i: number) =>
    update("features", form.features.filter((_, idx) => idx !== i));

  // Specs
  const addSpec = () => update("specs", [...form.specs, { model: "", label: "", value: "" }]);
  const updateSpec = (i: number, key: keyof Spec, value: string) => {
    const updated = [...form.specs];
    updated[i] = { ...updated[i], [key]: value };
    update("specs", updated);
  };
  const removeSpec = (i: number) =>
    update("specs", form.specs.filter((_, idx) => idx !== i));

  // Gallery images
  const addGalleryImage = (url: string) => update("galleryImages", [...form.galleryImages, url]);
  const removeGalleryImage = (i: number) =>
    update("galleryImages", form.galleryImages.filter((_, idx) => idx !== i));

  // Gallery videos
  const addGalleryVideo = () => update("galleryVideos", [...form.galleryVideos, ""]);
  const updateGalleryVideo = (i: number, value: string) => {
    const updated = [...form.galleryVideos];
    updated[i] = value;
    update("galleryVideos", updated);
  };
  const removeGalleryVideo = (i: number) =>
    update("galleryVideos", form.galleryVideos.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const url = isEdit ? `/api/admin/products/${initialData._id}` : "/api/products";
    const method = isEdit ? "PUT" : "POST";

    const request = fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to save product");
      }
      return res.json();
    });

    toast.promise(request, {
      loading: isEdit ? "Updating product..." : "Creating product...",
      success: isEdit ? "Product updated" : "Product created",
      error: (err) => err.message || "Something went wrong",
    });

    try {
      await request;
      onSaved();
      onClose();
    } catch {
      // error already shown via toast
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#002253] text-white px-6 py-5 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold">{isEdit ? "Edit Product" : "Add New Product"}</h2>
            <p className="text-sm opacity-80">Machinery details</p>
          </div>
          <button onClick={onClose} className="text-3xl hover:text-red-300">
            ×
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="font-bold text-lg text-[#002253] mb-3">Basic Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#002253]">Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#002253]">Subtitle</label>
                <input
                  value={form.subTitle}
                  onChange={(e) => update("subTitle", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#002253]">Machine Type</label>
                <input
                  required
                  placeholder="e.g. excavator"
                  value={form.machineType}
                  onChange={(e) => update("machineType", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#002253]">Category</label>
                <input
                  required
                  placeholder="e.g. medium_excavator"
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#002253]">Product ID</label>
                <input
                  required
                  type="number"
                  value={form.productId}
                  onChange={(e) => update("productId", Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#002253]">Model ID</label>
                <input
                  required
                  type="number"
                  value={form.modelId}
                  onChange={(e) => update("modelId", Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#002253]">Price ($)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => update("price", Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1 text-[#002253]">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
              />
            </div>
          </div>

          {/* Hero + Images */}
          <div>
            <h3 className="font-bold text-lg text-[#002253] mb-3">Hero Section & Images</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#002253]">Hero Title</label>
                <input
                  value={form.heroTitle}
                  onChange={(e) => update("heroTitle", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#002253]">Hero Subtitle</label>
                <input
                  value={form.heroSubTitle}
                  onChange={(e) => update("heroSubTitle", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <ImageUploader label="Main Image" value={form.image} onChange={(url) => update("image", url)} />
              <ImageUploader
                label="Hero Image"
                value={form.heroImage ?? ""}
                onChange={(url) => update("heroImage", url)}
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg text-[#002253]">Features</h3>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-1 text-sm text-[#002253] font-medium"
              >
                <Plus size={14} /> Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {form.features.map((f, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <input
                    placeholder="Feature title"
                    value={f.title}
                    onChange={(e) => updateFeature(i, "title", e.target.value)}
                    className=" flex-1 border rounded-lg px-3 py-2 text-sm text-[#002253]"
                  />
                  <input
                    placeholder="Feature description"
                    value={f.description}
                    onChange={(e) => updateFeature(i, "description", e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm text-[#002253]"
                  />
                  <button type="button" onClick={() => removeFeature(i)} className="text-red-500 p-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {form.features.length === 0 && <p className="text-sm text-gray-400">No features added yet.</p>}
            </div>
          </div>

          {/* Specifications */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg text-[#002253]">Specifications</h3>
              <button
                type="button"
                onClick={addSpec}
                className="flex items-center gap-1 text-sm text-[#002253] font-medium "
              >
                <Plus size={14} /> Add Spec
              </button>
            </div>
            <div className="space-y-2">
              {form.specs.map((s, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <input
                    placeholder="Model (e.g. CAT 220)"
                    value={s.model}
                    onChange={(e) => updateSpec(i, "model", e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm text-[#002253]"
                  />
                  <input
                    placeholder="Label (e.g. Bucket Capacity)"
                    value={s.label}
                    onChange={(e) => updateSpec(i, "label", e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm text-[#002253]"
                  />
                  <input
                    placeholder="Value (e.g. 1.0 m3)"
                    value={s.value}
                    onChange={(e) => updateSpec(i, "value", e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm text-[#002253]"
                  />
                  <button type="button" onClick={() => removeSpec(i)} className="text-red-500 p-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {form.specs.length === 0 && <p className="text-sm text-gray-400">No specs added yet.</p>}
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="font-bold text-lg text-[#002253] mb-3">Gallery Images</h3>
            <div className="flex flex-wrap gap-3 mb-3">
              {form.galleryImages.map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg border overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute top-1 right-1 bg-black/60 rounded-full p-0.5 "
                  >
                    <Trash2 size={12} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
            <ImageUploader label="Add gallery image" value="" onChange={(url) => url && addGalleryImage(url)} />

            <h3 className="font-bold text-lg text-[#002253] mt-5 mb-3">Gallery Videos (URL)</h3>
            <div className="space-y-2">
              {form.galleryVideos.map((v, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    placeholder="Video URL or filename"
                    value={v}
                    onChange={(e) => updateGalleryVideo(i, e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm text-[#002253]"
                  />
                  <button type="button" onClick={() => removeGalleryVideo(i)} className="text-red-500 p-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addGalleryVideo}
              className="flex items-center gap-1 text-sm text-[#002253] font-medium mt-2"
            >
              <Plus size={14} /> Add Video
            </button>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded-lg text-gray-600">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm bg-[#002253] text-white rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}