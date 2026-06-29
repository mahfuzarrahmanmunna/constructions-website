"use client";
// app/admin/services/page.tsx

import { useEffect, useRef, useState } from "react";
import {
  Pencil, Trash2, Plus, X, Check,
  ToggleLeft, ToggleRight, GripVertical,
} from "lucide-react";

type ServiceType = "primary" | "secondary";

interface Service {
  _id: string;
  id: number;
  title: string;
  description: string;
  image: string;
  type: ServiceType;
  order: number;
  isActive: boolean;
}

const EMPTY_FORM = {
  title: "",
  description: "",
  image: "",
  type: "primary" as ServiceType,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ServiceType>("primary");
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [reordering, setReordering] = useState(false);

  // drag state
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Fetch ──
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services?admin=true");
      const data = await res.json();
      setServices(data);
    } catch {
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const filtered = services
    .filter((s) => s.type === activeTab)
    .sort((a, b) => a.order - b.order);

  // ── Drag handlers ──
  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOver.current = index;

    // live preview swap
    setServices((prev) => {
      const tabItems = prev
        .filter((s) => s.type === activeTab)
        .sort((a, b) => a.order - b.order);
      const others = prev.filter((s) => s.type !== activeTab);

      const from = dragItem.current!;
      const to = index;
      if (from === to) return prev;

      const reordered = [...tabItems];
      const [moved] = reordered.splice(from, 1);
      reordered.splice(to, 0, moved);

      // reassign order values
      const updated = reordered.map((s, i) => ({ ...s, order: i + 1 }));
      dragItem.current = to; // keep in sync

      return [...others, ...updated];
    });
  };

  const handleDragEnd = async () => {
    dragItem.current = null;
    dragOver.current = null;

    // persist to DB
    const tabItems = services
      .filter((s) => s.type === activeTab)
      .sort((a, b) => a.order - b.order);

    const payload = tabItems.map((s) => ({ _id: s._id, order: s.order }));

    setReordering(true);
    try {
      await fetch("/api/admin/services/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      setError("Failed to save order. Please try again.");
      fetchServices(); // rollback
    } finally {
      setReordering(false);
    }
  };

  // ── Modal ──
  const openAdd = () => {
    setEditingService(null);
    setForm({ ...EMPTY_FORM, type: activeTab });
    setShowModal(true);
    setError("");
  };

  const openEdit = (s: Service) => {
    setEditingService(s);
    setForm({
      title: s.title,
      description: s.description,
      image: s.image,
      type: s.type,
    });
    setShowModal(true);
    setError("");
  };

  // ── Save ──
  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.image.trim()) {
      setError("Please fill all required fields");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (editingService) {
        const res = await fetch(`/api/admin/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Create failed");
      }
      setShowModal(false);
      fetchServices();
    } catch {
      setError("Failed to save service. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ──
  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      setDeleteId(null);
      fetchServices();
    } catch {
      setError("Failed to delete service.");
    }
  };

  // ── Toggle ──
  const handleToggle = async (s: Service) => {
    await fetch(`/api/admin/services/${s.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !s.isActive }),
    });
    fetchServices();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#002253] text-white px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wide">Services Manager</h1>
          <p className="text-blue-300 text-sm mt-0.5">
            Drag rows to reorder · Toggle visibility · Add, edit, or remove services
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#E55503] hover:bg-[#cc4a02] text-white font-bold px-5 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-8">
        <div className="flex gap-1">
          {(["primary", "secondary"] as ServiceType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? "border-[#E55503] text-[#E55503]"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab} Services ({services.filter((s) => s.type === tab).length})
            </button>
          ))}
        </div>
      </div>

      {/* Reorder saving indicator */}
      {reordering && (
        <div className="bg-blue-50 border-b border-blue-100 px-8 py-2 text-sm text-blue-600 font-medium flex items-center gap-2">
          <span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin inline-block" />
          Saving new order...
        </div>
      )}

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-gray-400">
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No services available.</p>
            <button onClick={openAdd} className="mt-4 text-[#E55503] font-bold hover:underline">
              Add your first service
            </button>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((s, index) => (
              <div
                key={s._id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`bg-white rounded-2xl border shadow-sm flex items-center gap-5 p-4 
                  transition-all duration-150 select-none
                  ${s.isActive ? "border-gray-100" : "border-dashed border-gray-300 opacity-60"}
                  cursor-grab active:cursor-grabbing active:shadow-xl active:scale-[1.01] active:z-10 active:border-[#002253]/30`}
              >
                {/* Drag handle */}
                <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0 hover:text-gray-500 transition-colors" />

                {/* Order badge */}
                <span className="text-xs font-black text-gray-300 w-5 text-center flex-shrink-0">
                  {s.order}
                </span>

                <div className="w-20 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/80x64/f3f4f6/9ca3af?text=IMG";
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#E55503] uppercase tracking-widest">
                      #{s.id}
                    </span>
                    {!s.isActive && (
                      <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 px-2 py-0.5 rounded-full">
                        Hidden
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-[#002253] truncate">
                    {s.title}
                  </h3>
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">
                    {s.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleToggle(s)}
                    className="text-gray-400 hover:text-[#002253] transition-colors"
                    title={
                      s.isActive ? "Hide from frontend" : "Show on frontend"
                    }
                  >
                    {s.isActive
                      ? <ToggleRight className="w-6 h-6 text-green-500" />
                      : <ToggleLeft className="w-6 h-6" />}
                  </button>

                  <button
                    onClick={() => openEdit(s)}
                    className="w-8 h-8 rounded-lg bg-[#224B88]/10 hover:bg-[#224B88]/20 flex items-center justify-center transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5 text-[#224B88]" />
                  </button>

                  {deleteId === s.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="w-8 h-8 rounded-lg bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                      >
                        <Check className="w-3.5 h-3.5 text-white" />
                      </button>
                      <button
                        onClick={() => setDeleteId(null)}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteId(s.id)}
                      className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-black text-[#002253] text-lg">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-4">
              {error && (
                <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
                  {error}
                </p>
              )}

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Service Type
                </label>
                <div className="flex gap-3">
                  {(["primary", "secondary"] as ServiceType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm((f) => ({ ...f, type: t }))}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold capitalize border-2 transition-colors ${
                        form.type === t
                          ? "border-[#002253] bg-[#002253] text-white"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g. Road Construction"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#224B88] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Service description..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#224B88] transition-colors resize-none text-gray-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Service Image *
                </label>

                {form.image ? (
                  /* Preview State */
                  <div className="relative w-full h-40 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 group">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/400x100/f3f4f6/9ca3af?text=Invalid+Image";
                      }}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  /* Dropzone State */
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                      dragActive
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-400 bg-gray-50"
                    }`}
                  >
                    {uploading ? (
                      <Loader2
                        size={32}
                        className="animate-spin text-blue-500"
                      />
                    ) : (
                      <>
                        <div className="p-3 bg-gray-200 rounded-full mb-3">
                          <ImagePlus size={24} className="text-gray-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-600">
                          {dragActive
                            ? "Drop image here"
                            : "Drag & drop or click to upload"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG, WEBP (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="px-6 py-2.5 rounded-xl bg-[#002253] hover:bg-[#001a40] text-white text-sm font-bold transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <Loader2 size={16} className="animate-spin" />}
                {saving
                  ? "Saving..."
                  : editingService
                    ? "Update"
                    : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}