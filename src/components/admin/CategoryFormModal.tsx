"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import ImageUploader from "./ImageUploader";

type CategoryFormData = {
  _id?: string;
  name: string;
  slug: string;
  machineType: string;
  icon: string | null;
  order: number;
};

const emptyCategory: CategoryFormData = {
  name: "",
  slug: "",
  machineType: "",
  icon: null,
  order: 0,
};

type Props = {
  initialData?: any;
  onClose: () => void;
  onSaved: () => void;
};

export default function CategoryFormModal({ initialData, onClose, onSaved }: Props) {
  const isEdit = Boolean(initialData?._id);

  const [form, setForm] = useState<CategoryFormData>(
    initialData ? { ...emptyCategory, ...initialData } : emptyCategory
  );
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof CategoryFormData>(key: K, value: CategoryFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

   const url = isEdit ? `/api/categories/${initialData._id}` : "/api/categories";
    const method = isEdit ? "PUT" : "POST";

    const request = fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to save category");
      }
      return res.json();
    });

    toast.promise(request, {
      loading: isEdit ? "Updating category..." : "Creating category...",
      success: isEdit ? "Category updated" : "Category created",
      error: (err) => err.message || "Something went wrong",
    });

    try {
      await request;
      onSaved();
      onClose();
    } catch {
      // handled by toast
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#002253] text-white px-6 py-5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{isEdit ? "Edit Category" : "Add Category"}</h2>
            <p className="text-sm opacity-80">Category details</p>
          </div>
          <button onClick={onClose} className="text-3xl hover:text-red-300">
            ×
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#002253]">Category Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#002253]">Slug</label>
            <input
              required
              placeholder="e.g. medium_excavator"
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
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
            <label className="block text-sm font-medium mb-1 text-[#002253]">Order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => update("order", Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 text-sm text-[#002253]"
            />
          </div>

        <div className="text-sm text-gray-500">
           <ImageUploader label="Icon / Image" value={form.icon ?? ""} onChange={(url) => update("icon", url)}   />
        </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border rounded-lg text-gray-600">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 text-sm bg-[#002253] text-white rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : isEdit ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}