"use client";

// app/admin/services/page.tsx
// Admin panel — services add/edit/delete/toggle

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X, Check, ToggleLeft, ToggleRight, GripVertical } from "lucide-react";

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

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState("");

  // ── Fetch ──
  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(" /api/admin/services");
      const data = await res.json();
      setServices(data);
    } catch {
      setError("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filtered = services
    .filter((s) => s.type === activeTab)
    .sort((a, b) => a.order - b.order);

  // ── Open modal ──
  const openAdd = () => {
    setEditingService(null);
    setForm({ ...EMPTY_FORM, type: activeTab });
    setShowModal(true);
    setError("");
  };

  const openEdit = (s: Service) => {
    setEditingService(s);
    setForm({ title: s.title, description: s.description, image: s.image, type: s.type });
    setShowModal(true);
    setError("");
  };

  // ── Save (add or edit) ──
  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.image.trim()) {
      setError("please fill all required fields");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (editingService) {
        // PUT
        const res = await fetch(`/api/admin/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        // POST
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
      setError("Failed to delete service. Please try again.");
    }
  };

  // ── Toggle active ──
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
          <p className="text-blue-300 text-sm mt-0.5">Add, edit, or remove services shown on the frontend</p>
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No services available.</p>
            <button onClick={openAdd} className="mt-4 text-[#E55503] font-bold hover:underline">
                Add your first service
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((s) => (
              <div
                key={s._id}
                className={`bg-white rounded-2xl border ${
                  s.isActive ? "border-gray-100" : "border-dashed border-gray-300 opacity-60"
                } shadow-sm flex items-center gap-5 p-4 group`}
              >
                {/* Drag handle (visual only) */}
                <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />

                {/* Image */}
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/80x64/f3f4f6/9ca3af?text=IMG";
                    }}
                  />
                </div>

                {/* Info */}
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
                  <h3 className="font-bold text-[#002253] truncate">{s.title}</h3>
                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{s.description}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Toggle active */}
                  <button
                    onClick={() => handleToggle(s)}
                    className="text-gray-400 hover:text-[#002253] transition-colors"
                    title={s.isActive ? "Hide from frontend" : "Show on frontend"}
                  >
                    {s.isActive ? (
                      <ToggleRight className="w-6 h-6 text-green-500" />
                    ) : (
                      <ToggleLeft className="w-6 h-6" />
                    )}
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => openEdit(s)}
                    className="w-8 h-8 rounded-lg bg-[#224B88]/10 hover:bg-[#224B88]/20 flex items-center justify-center transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5 text-[#224B88]" />
                  </button>

                  {/* Delete */}
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

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            {/* Modal header */}
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

            {/* Modal body */}
            <div className="px-6 py-5 flex flex-col gap-4">
              {error && (
                <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>
              )}

              {/* Type */}
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

              {/* Title */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Road Construction"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#224B88] transition-colors "
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Service description..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#224B88] transition-colors resize-none text-gray-700"
                />
              </div>

              {/* Image path */}
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">
                  Image Path *
                </label>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="/services/road.jpg or https://..."
                  className="w-full border border-gray-200 rounded-xl text-gray-700 px-4 py-2.5 text-sm focus:outline-none focus:border-[#224B88] transition-colors font-mono"
                />
                {form.image && (
                  <div className="mt-2 w-full h-24 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={form.image}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/400x100/f3f4f6/9ca3af?text=Invalid+Image";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-[#002253] hover:bg-[#001a40] text-white text-sm font-bold transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : editingService ? "Update" : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
