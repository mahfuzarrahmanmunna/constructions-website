/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, GripVertical, Eye } from "lucide-react";
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
import ProjectFormModal from "./ProjectFormModal";

// --- Status Badge Helper ---
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    published: "bg-emerald-100 text-emerald-700",
    draft: "bg-amber-100 text-amber-700",
    archived: "bg-slate-100 text-slate-500",
  };
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${styles[status] || styles.draft}`}
    >
      {status}
    </span>
  );
};

// --- Sortable Table Row ---
function SortableRow({
  project,
  index,
  onEdit,
  onDelete,
  onView,
}: {
  project: any;
  index: number;
  onEdit: (p: any) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: project._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
    >
      <td className="px-3 py-4 w-10">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors"
        >
          <GripVertical size={16} />
        </button>
      </td>
      <td className="px-3 py-4 text-sm text-slate-500 font-medium">
        {index + 1}
      </td>

      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-10 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[10px] text-gray-400">No Img</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-[#002253] text-sm truncate max-w-[220px]">
              {project.title}
            </h3>
            <p className="text-xs text-slate-400 truncate max-w-[220px] flex items-center gap-1 mt-0.5">
              📍 {project.location}
            </p>
          </div>
        </div>
      </td>

      <td className="px-3 py-4 text-sm text-slate-600 font-medium">
        {project.category}
      </td>

      <td className="px-3 py-4 text-sm text-slate-500 max-w-[180px] truncate">
        {project.client}
      </td>

      <td className="px-3 py-4 text-center">
        <StatusBadge status={project.status} />
      </td>

      <td className="px-1 py-3 text-center">
        <div className="flex justify-center items-center gap-1.5">
          <button
            onClick={() => onView(project._id)}
            className="p-1.5 text-xs rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            title="View Live Page"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => onEdit(project)}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1"
          >
            <Pencil size={12} /> Edit
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="px-2.5 py-1.5 text-xs rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1"
          >
            <Trash2 size={12} /> Del
          </button>
        </div>
      </td>
    </tr>
  );
}

// --- Main Page Component ---
export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      // ✅ FIX: Fetch ALL projects for admin (no status filter)
      const res = await fetch("/api/projects?admin=true");
      const data = await res.json();
      setProjects(Array.isArray(data.projects) ? data.projects : []);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAdd = () => {
    setEditingProject(null);
    setModalOpen(true);
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleView = (id: string) => {
    window.open(`/ourWorks/${id}`, "_blank");
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Project?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    const request = fetch(`/api/projects/${id}`, { method: "DELETE" }).then(
      async (res) => {
        if (!res.ok) throw new Error("Failed to delete");
        return res.json();
      },
    );

    toast.promise(request, {
      loading: "Deleting project...",
      success: "Project deleted successfully",
      error: "Failed to delete project",
    });

    try {
      await request;
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch {
      // Error handled by toast
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p._id === active.id);
    const newIndex = projects.findIndex((p) => p._id === over.id);

    const reordered = arrayMove(projects, oldIndex, newIndex);
    setProjects(reordered);
    toast.success("Visual order updated");
  };

  return (
    <div className="p-6 mt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#002253]">
            Project Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Total: {projects.length} projects
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#002253] text-white rounded-lg text-sm font-semibold hover:bg-[#00122e] transition-colors shadow-sm"
        >
          <Plus size={16} /> Add New Project
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
        {loading ? (
          <div className="p-12 text-center text-gray-400">
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            No projects found. Click &quot;Add New Project&quot; to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#002253] text-white">
                <tr>
                  <th className="px-3 py-4 w-10"></th>
                  <th className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    No:
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Project Info
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-semibold uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-3 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-4 text-center text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={projects.map((p) => p._id)}
                  strategy={verticalListSortingStrategy}
                >
                  <tbody>
                    {projects.map((project, index) => (
                      <SortableRow
                        key={project._id}
                        project={project}
                        index={index}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                      />
                    ))}
                  </tbody>
                </SortableContext>
              </DndContext>
            </table>
          </div>
        )}
      </div>

      {/* Modal Render */}
      {modalOpen && (
        <ProjectFormModal
          initialData={editingProject}
          onClose={() => setModalOpen(false)}
          onSaved={fetchProjects}
        />
      )}
    </div>
  );
}
