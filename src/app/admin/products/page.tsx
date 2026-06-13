/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ProductFormModal from "@/components/admin/ProductFormModal";

function SortableRow({
  product,
  index,
  onEdit,
  onDelete,
}: {
  product: any;
  index: number;
  onEdit: (p: any) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: product._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b border-slate-200 hover:bg-slate-50 transition">
      <td className="px-3 py-4">
        <button {...attributes} {...listeners} className="cursor-grab text-gray-400">
          <GripVertical size={16} />
        </button>
      </td>
      <td className="px-3 py-4">{index + 1}</td>
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg border overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
            {product.image ? (
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-gray-400">No image</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-[#002253] truncate">{product.title}</h3>
            <p className="text-xs text-gray-500 truncate">{product.subTitle}</p>
          </div>
        </div>
      </td>
      <td className="px-3 py-4">
        <p className="font-medium text-[#002253]">{product.machineType}</p>
        <p className="text-xs text-gray-500">{product.category}</p>
      </td>
      <td className="px-3 py-4 text-center font-mono text-[#002253]">
        ${product.price?.toLocaleString() ?? 0}
      </td>
      <td className="px-1 py-3 text-center">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onEdit(product)}
            className="px-3 py-1 text-xs rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1"
          >
            <Pencil size={12} /> Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="px-3 py-1 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200 flex items-center gap-1"
          >
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "Are you sure you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    const request = fetch(`/api/admin/products/${id}`, { method: "DELETE" }).then(async (res) => {
      if (!res.ok) throw new Error("Failed to delete product");
      return res.json();
    });

    toast.promise(request, {
      loading: "Deleting product...",
      success: "Product deleted successfully",
      error: "Failed to delete product",
    });

    try {
      await request;
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      // handled by toast
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = products.findIndex((p) => p._id === active.id);
    const newIndex = products.findIndex((p) => p._id === over.id);

    const reordered = arrayMove(products, oldIndex, newIndex);
    setProducts(reordered);

    const payload = reordered.map((p, index) => ({ _id: p._id, sortOrder: index }));

    try {
      await fetch("/api/admin/products/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      toast.success("Order updated");
    } catch {
      toast.error("Failed to update order");
    }
  };

  return (
    <div className="p-6 mt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#002253]">Product Management</h1>
          <p className="text-sm text-gray-500 mt-1">Total: {products.length} products</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#002253] text-white rounded-lg text-sm font-medium"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {loading ? (
          <p className="p-6 text-center text-gray-400">Loading...</p>
        ) : products.length === 0 ? (
          <p className="p-6 text-center text-gray-400">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#002253] text-white">
                <tr>
                  <th className="px-3 py-4 w-10"></th>
                  <th className="px-3 py-4 text-left">No:</th>
                  <th className="px-3 py-4 text-left">Product</th>
                  <th className="px-3 py-4 text-left">Type / Category</th>
                  <th className="px-3 py-4 text-center">Price</th>
                  <th className="px-3 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={products.map((p) => p._id)} strategy={verticalListSortingStrategy}>
                  <tbody>
                    {products.map((product, index) => (
                      <SortableRow
                        key={product._id}
                        product={product}
                        index={index}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </SortableContext>
              </DndContext>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <ProductFormModal
          initialData={editingProduct}
          onClose={() => setModalOpen(false)}
          onSaved={fetchProducts}
        />
      )}
    </div>
  );
}