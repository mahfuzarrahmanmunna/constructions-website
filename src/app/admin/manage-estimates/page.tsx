"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Mail,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Loader2,
  DollarSign,
  MapPin,
  Home,
  Ruler,
  Phone,
  Building2,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface Estimate {
  _id: string;
  projectType: string;
  area: string;
  location: string;
  email: string;
  phone: string;
  status: "pending" | "reviewed" | "completed" | "rejected";
  estimatedCost: number | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface Counts {
  all: number;
  pending: number;
  reviewed: number;
  completed: number;
  rejected: number;
}

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    icon: Clock,
  },
  reviewed: {
    label: "Reviewed",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    icon: AlertCircle,
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    icon: XCircle,
  },
};

const DEFAULT_COUNTS: Counts = {
  all: 0,
  pending: 0,
  reviewed: 0,
  completed: 0,
  rejected: 0,
};

export default function ManageEstimatesPage() {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [counts, setCounts] = useState<Counts>(DEFAULT_COUNTS);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [viewModal, setViewModal] = useState<Estimate | null>(null);
  const [emailModal, setEmailModal] = useState<Estimate | null>(null);
  const [deleteModal, setDeleteModal] = useState<Estimate | null>(null);

  const [emailSubject, setEmailSubject] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  // Ref for the rich text editor
  const editorRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(
    async (filter: string, q: string, p: number) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filter !== "all") params.set("status", filter);
        if (q) params.set("search", q);
        params.set("page", p.toString());
        params.set("limit", "10");

        const res = await fetch(`/api/estimate?${params}`);
        const data = await res.json();

        if (data.success) {
          setEstimates(data.estimates || []);
          setCounts(data.counts || DEFAULT_COUNTS);
          setTotalPages(data.pagination?.pages || 1);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => fetchData("all", "", 1), 0);
    return () => clearTimeout(timer);
  }, [fetchData]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setPage(1);
    fetchData(filter, search, 1);
  };

  const handleSearchChange = (q: string) => {
    setSearch(q);
    setPage(1);
    fetchData(activeFilter, q, 1);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    fetchData(activeFilter, search, p);
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingStatus(id);
    try {
      const res = await fetch(`/api/estimate/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setEstimates((prev) =>
          prev.map((e) =>
            e._id === id ? { ...e, status: status as Estimate["status"] } : e,
          ),
        );
        if (viewModal && viewModal._id === id) {
          setViewModal({ ...viewModal, status: status as Estimate["status"] });
        }
        fetchData(activeFilter, search, page);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const deleteEstimate = async (id: string) => {
    try {
      const res = await fetch(`/api/estimate/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setDeleteModal(null);
        fetchData(activeFilter, search, page);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = async () => {
    if (!emailModal || !emailSubject) return;

    // Grab the HTML content directly from the editor
    const messageHtml = editorRef.current?.innerHTML || "";

    if (!messageHtml || messageHtml === "<br>") return;

    setSendingEmail(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailModal.email,
          subject: emailSubject,
          message: messageHtml,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailSent(true);
        setTimeout(() => closeEmailModal(), 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSendingEmail(false);
    }
  };

  // ═══ Rich Text Editor Commands ═══
  const execCmd = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const openEmailModal = (estimate: Estimate) => {
    setEmailModal(estimate);
    setEmailSent(false);
    setEmailSubject(
      `Your CPL Construction Estimate — ${estimate.projectType.charAt(0).toUpperCase() + estimate.projectType.slice(1)} Project`,
    );

    // Set initial content after a tick so the ref is mounted
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = `
          <p>Dear Client,</p>
          <br/>
          <p>Thank you for your interest in CPL Construction. We have reviewed your project requirements for a <strong>${estimate.projectType}</strong> building at <strong>${estimate.location}</strong> with an area of <strong>${estimate.area} sq.ft</strong>.</p>
          <br/>
          <p>Please find our initial assessment below. For a detailed breakdown, our team will reach out to you at <strong>${estimate.phone}</strong>.</p>
          <br/>
          <p>Best regards,<br/>
          <strong>CPL Construction Team</strong></p>
        `;
      }
    }, 50);
  };

  const closeEmailModal = () => {
    setEmailModal(null);
    setEmailSubject("");
    setEmailSent(false);
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statCards = [
    {
      label: "Total Estimates",
      value: counts?.all ?? 0,
      icon: FileText,
      bgLight: "bg-slate-50",
      textColor: "text-slate-700",
    },
    {
      label: "Pending",
      value: counts?.pending ?? 0,
      icon: Clock,
      bgLight: "bg-amber-50",
      textColor: "text-amber-700",
    },
    {
      label: "Completed",
      value: counts?.completed ?? 0,
      icon: CheckCircle2,
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-700",
    },
    {
      label: "Rejected",
      value: counts?.rejected ?? 0,
      icon: XCircle,
      bgLight: "bg-red-50",
      textColor: "text-red-700",
    },
  ];

  // Toolbar button component
  // Toolbar button component
 function InfoItem({
   icon: Icon,
   label,
   value,
   capitalize,
   mono,
 }: {
   icon: React.ComponentType<{ className?: string }>;
   label: string;
   value: string;
   capitalize?: boolean;
   mono?: boolean;
 }) {
   return (
     <div className="bg-slate-50 rounded-xl p-3">
       <div className="flex items-center gap-1.5 mb-1">
         <Icon className="w-3.5 h-3.5 text-slate-400" />
         <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
           {label}
         </span>
       </div>
       <p
         className={`text-sm font-medium text-slate-800 ${capitalize ? "capitalize" : ""} ${mono ? "font-mono" : ""}`}
       >
         {value}
       </p>
     </div>
   );
 }

 function ToolBtn({
   onClick,
   children,
   title,
 }: {
   onClick: () => void;
   children: React.ReactNode;
   title: string;
 }) {
   return (
     <button
       type="button"
       onMouseDown={(e) => e.preventDefault()}
       onClick={onClick}
       title={title}
       className="p-2 rounded-md hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
     >
       {children}
     </button>
   );
 }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Manage Estimates</h1>
        <p className="text-sm text-slate-500 mt-1">
          Review, respond to, and manage all project estimate requests
        </p>
      </div>

      {/* ═══ STAT CARDS ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg ${card.bgLight} flex items-center justify-center`}
                >
                  <Icon className={`w-5 h-5 ${card.textColor}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* ═══ FILTER BAR ═══ */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by email, location, type..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="w-4 h-4 text-slate-400 mr-1" />
            {(
              ["all", "pending", "reviewed", "completed", "rejected"] as const
            ).map((s) => (
              <button
                key={s}
                onClick={() => handleFilterChange(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all capitalize ${
                  activeFilter === s
                    ? "bg-[#002253] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s}
                {s !== "all" && (counts?.[s as keyof Counts] ?? 0) > 0 && (
                  <span
                    className={`ml-1.5 text-[10px] ${activeFilter === s ? "text-white/70" : "text-slate-400"}`}
                  >
                    {counts?.[s as keyof Counts] ?? 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TABLE ═══ */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {[
                  "Type",
                  "Area",
                  "Location",
                  "Contact",
                  "Status",
                  "Date",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-5 py-3.5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <Loader2 className="w-6 h-6 text-slate-300 animate-spin mx-auto mb-3" />
                    <p className="text-sm text-slate-400">
                      Loading estimates...
                    </p>
                  </td>
                </tr>
              ) : estimates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm text-slate-400">No estimates found</p>
                  </td>
                </tr>
              ) : (
                estimates.map((est) => {
                  const statusCfg = STATUS_CONFIG[est.status];
                  return (
                    <tr
                      key={est._id}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                            <Building2 className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-slate-800 capitalize">
                            {est.projectType}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-600">
                          {est.area} sq.ft
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-sm text-slate-600">
                            {est.location}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium text-slate-800">
                            {est.email}
                          </p>
                          <p className="text-xs text-slate-400">{est.phone}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="relative">
                          <select
                            value={est.status}
                            onChange={(e) =>
                              updateStatus(est._id, e.target.value)
                            }
                            disabled={updatingStatus === est._id}
                            className={`appearance-none text-xs font-semibold px-3 py-1.5 pr-7 rounded-full border cursor-pointer transition-all ${statusCfg.color} ${updatingStatus === est._id ? "opacity-50" : ""} focus:outline-none focus:ring-2 focus:ring-offset-1`}
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                              backgroundPosition: "right 6px center",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "14px",
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          {updatingStatus === est._id && (
                            <Loader2 className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 animate-spin text-slate-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs text-slate-400">
                          {formatDate(est.createdAt)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setViewModal(est)}
                            className="p-2 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openEmailModal(est)}
                            className="p-2 rounded-lg hover:bg-amber-50 text-slate-400 hover:text-amber-600 transition-colors"
                            title="Email"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteModal(est)}
                            className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden divide-y divide-slate-100">
          {loading ? (
            <div className="px-5 py-16 text-center">
              <Loader2 className="w-6 h-6 text-slate-300 animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-400">Loading...</p>
            </div>
          ) : estimates.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <p className="text-sm text-slate-400">No estimates found</p>
            </div>
          ) : (
            estimates.map((est) => {
              const statusCfg = STATUS_CONFIG[est.status];
              return (
                <div key={est._id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-800 capitalize">
                        {est.projectType}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formatDate(est.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusCfg.color}`}
                    >
                      {statusCfg.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Ruler className="w-3 h-3" /> {est.area} sq.ft
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3 h-3" /> {est.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Mail className="w-3 h-3" /> {est.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Phone className="w-3 h-3" /> {est.phone}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setViewModal(est)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button
                      onClick={() => openEmailModal(est)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" /> Email
                    </button>
                    <button
                      onClick={() => setDeleteModal(est)}
                      className="py-2 px-3 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Page {page} of {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`w-8 h-8 text-xs font-semibold rounded-lg transition-all ${page === p ? "bg-[#002253] text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════ VIEW MODAL ═══════════ */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-bold text-slate-900">
                Estimate Details
              </h3>
              <button
                onClick={() => setViewModal(null)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${STATUS_CONFIG[viewModal.status].color}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${STATUS_CONFIG[viewModal.status].dot}`}
                  />
                  {STATUS_CONFIG[viewModal.status].label}
                </span>
                <span className="text-xs text-slate-400">
                  {formatDate(viewModal.createdAt)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InfoItem
                  icon={Home}
                  label="Project Type"
                  value={viewModal.projectType}
                  capitalize
                />
                <InfoItem
                  icon={Ruler}
                  label="Area"
                  value={`${viewModal.area} sq.ft`}
                />
                <InfoItem
                  icon={MapPin}
                  label="Location"
                  value={viewModal.location}
                />
                <InfoItem
                  icon={DollarSign}
                  label="Est. Cost"
                  value={
                    viewModal.estimatedCost
                      ? `$${viewModal.estimatedCost.toLocaleString()}`
                      : "Not set"
                  }
                  mono
                />
                <InfoItem icon={Mail} label="Email" value={viewModal.email} />
                <InfoItem icon={Phone} label="Phone" value={viewModal.phone} />
              </div>
              {viewModal.notes && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Notes
                  </p>
                  <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3 leading-relaxed">
                    {viewModal.notes}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Quick Status Update
                </p>
                <div className="flex gap-2 flex-wrap">
                  {(
                    ["pending", "reviewed", "completed", "rejected"] as const
                  ).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(viewModal._id, s)}
                      disabled={updatingStatus === viewModal._id}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all capitalize ${viewModal.status === s ? `${STATUS_CONFIG[s].color} ring-2 ring-offset-1 ring-current` : "border-slate-200 text-slate-500 hover:bg-slate-50"} disabled:opacity-50`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center gap-3 rounded-b-2xl">
              <button
                onClick={() => {
                  setViewModal(null);
                  openEmailModal(viewModal);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl bg-[#E55503] text-white hover:bg-[#cc4a03] transition-colors"
              >
                <Mail className="w-4 h-4" /> Send Email
              </button>
              <button
                onClick={() => setViewModal(null)}
                className="px-5 py-2.5 text-sm font-medium rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ EMAIL MODAL WITH RICH TEXT EDITOR ═══════════ */}
      {emailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Compose Email
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  To: {emailModal.email}
                </p>
              </div>
              <button
                onClick={closeEmailModal}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {emailSent ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  Email Sent!
                </h4>
                <p className="text-sm text-slate-400">
                  The estimate has been sent to {emailModal.email}
                </p>
              </div>
            ) : (
              <>
                {/* Recipient info bar */}
                <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-4 text-xs shrink-0">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Home className="w-3.5 h-3.5" />
                    <span className="capitalize">{emailModal.projectType}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Ruler className="w-3.5 h-3.5" /> {emailModal.area} sq.ft
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="w-3.5 h-3.5" /> {emailModal.location}
                  </div>
                </div>

                {/* Subject */}
                <div className="px-6 pt-4 shrink-0">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full text-gray-600 px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Email subject..."
                  />
                </div>

                {/* Rich Text Editor */}
                <div className="flex-1 flex flex-col px-6 pt-3 pb-0 min-h-0 overflow-hidden">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 shrink-0">
                    Message
                  </label>

                  {/* Toolbar */}
                  <div className="flex items-center gap-0.5 p-1.5 bg-slate-100 rounded-t-lg border border-b-0 border-slate-200 shrink-0 flex-wrap">
                    <ToolBtn onClick={() => execCmd("bold")} title="Bold">
                      <Bold className="w-4 h-4" />
                    </ToolBtn>
                    <ToolBtn onClick={() => execCmd("italic")} title="Italic">
                      <Italic className="w-4 h-4" />
                    </ToolBtn>
                    <ToolBtn
                      onClick={() => execCmd("underline")}
                      title="Underline"
                    >
                      <Underline className="w-4 h-4" />
                    </ToolBtn>

                    <div className="w-px h-5 bg-slate-300 mx-1" />

                    <ToolBtn
                      onClick={() => execCmd("insertUnorderedList")}
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </ToolBtn>
                    <ToolBtn
                      onClick={() => execCmd("insertOrderedList")}
                      title="Numbered List"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </ToolBtn>

                    <div className="w-px h-5 bg-slate-300 mx-1" />

                    <ToolBtn
                      onClick={() => execCmd("justifyLeft")}
                      title="Align Left"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </ToolBtn>
                    <ToolBtn
                      onClick={() => execCmd("justifyCenter")}
                      title="Align Center"
                    >
                      <AlignCenter className="w-4 h-4" />
                    </ToolBtn>
                    <ToolBtn
                      onClick={() => execCmd("justifyRight")}
                      title="Align Right"
                    >
                      <AlignRight className="w-4 h-4" />
                    </ToolBtn>
                  </div>

                  {/* Editable Area */}
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="flex-1 min-h-[300px] max-h-[400px] overflow-y-auto p-4 text-sm text-slate-700 leading-relaxed border border-slate-200 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white"
                    style={{ wordBreak: "break-word" }}
                  />
                </div>

                {/* Footer */}
                <div className="border-t border-slate-100 px-6 py-4 flex items-center gap-3 shrink-0">
                  <button
                    onClick={sendEmail}
                    disabled={sendingEmail || !emailSubject}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl bg-[#E55503] text-white hover:bg-[#cc4a03] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingEmail ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Email
                      </>
                    )}
                  </button>
                  <button
                    onClick={closeEmailModal}
                    className="px-5 py-2.5 text-sm font-medium rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══════════ DELETE MODAL ═══════════ */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Delete Estimate?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                This will permanently remove the estimate from{" "}
                <span className="font-medium text-slate-700">
                  {deleteModal.email}
                </span>
                . This action cannot be undone.
              </p>
            </div>
            <div className="px-6 pb-6 flex items-center gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteEstimate(deleteModal._id)}
                className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
  capitalize,
  mono,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  capitalize?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p
        className={`text-sm font-medium text-slate-800 ${capitalize ? "capitalize" : ""} ${mono ? "font-mono" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
