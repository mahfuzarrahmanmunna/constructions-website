/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import CategoryFormModal from "@/components/admin/CategoryFormModal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Category?",
      text: "Are you sure you want to delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    const request = fetch(`api/categories/${id}`, { method: "DELETE" }).then(async (res) => {
      if (!res.ok) throw new Error("Failed to delete category");
      return res.json();
    });

    toast.promise(request, {
      loading: "Deleting category...",
      success: "Category deleted successfully",
      error: "Failed to delete category",
    });

    try {
      await request;
      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch {
      // handled by toast
    }
  };

  return (
    <div className="p-6 mt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#002253]">Category Management</h1>
          <p className="text-sm text-gray-500 mt-1">Total: {categories.length} categories</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#002253] text-white rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {loading ? (
        <p className="p-6 text-center text-gray-400">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="p-6 text-center text-gray-400">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <div
              key={cat._id}
              className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-lg border bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                {cat.icon ? (
                  <img src={cat.icon} alt={cat.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={20} className="text-gray-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-0.5">#{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-semibold text-[#002253] truncate">{cat.name}</h3>
                <p className="text-xs text-gray-500 truncate">{cat.machineType}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <CategoryFormModal
          initialData={editingCategory}
          onClose={() => setModalOpen(false)}
          onSaved={fetchCategories}
        />
      )}
    </div>
  );
}