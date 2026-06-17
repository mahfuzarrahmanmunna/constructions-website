/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, GripVertical, Phone, Mail, MapPin } from "lucide-react";
import toast from "react-hot-toast";
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

type NavLink = { id: string; label: string; link: string };

type Settings = {
  navbarLinks: NavLink[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
};

const defaultSettings: Settings = {
  navbarLinks: [],
  contactInfo: { phone: "", email: "", address: "" },
  socialMedia: { facebook: "", twitter: "", linkedin: "", youtube: "" },
};

// Sortable single nav link row
function SortableNavRow({
  item,
  index,
  onChange,
  onRemove,
}: {
  item: NavLink;
  index: number;
  onChange: (i: number, key: keyof NavLink, value: string) => void;
  onRemove: (i: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3">
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 p-1"
        type="button"
      >
        <GripVertical size={16} />
      </button>

      <div className="w-6 h-6 rounded-full bg-[#002253] text-white flex items-center justify-center text-xs font-bold shrink-0">
        {index + 1}
      </div>

      <input
        placeholder="Label (e.g. Home)"
        value={item.label}
        onChange={(e) => onChange(index, "label", e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2 text-sm text-gray-500"
      />

      <input
        placeholder="Link (e.g. /products)"
        value={item.link}
        onChange={(e) => onChange(index, "link", e.target.value)}
        className="flex-1 border rounded-lg px-3 py-2 text-sm font-mono text-gray-500"
      />

      <button
        type="button"
        onClick={() => onRemove(index)}
        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();

        setSettings({
          navbarLinks: (data.navbarLinks ?? []).map((l: any, i: number) => ({
            id: l._id ?? `link-${i}`,
            label: l.label ?? "",
            link: l.link ?? "",
          })),
          contactInfo: data.contactInfo ?? defaultSettings.contactInfo,
          socialMedia: data.socialMedia ?? defaultSettings.socialMedia,
        });
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);

    const payload = {
      ...settings,
      navbarLinks: settings.navbarLinks.map(({ label, link }) => ({
        label,
        link,
      })),
    };

    const request = fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to save settings");
      }
      return res.json();
    });

    toast.promise(request, {
      loading: "Saving settings...",
      success: "Settings saved successfully",
      error: (err) => err.message || "Failed to save settings",
    });

    try {
      await request;
    } catch {
      // handled by toast
    } finally {
      setSaving(false);
    }
  };

  // Navbar Links handlers
  const addNavLink = () =>
    setSettings((prev) => ({
      ...prev,
      navbarLinks: [
        ...prev.navbarLinks,
        { id: `link-${Date.now()}`, label: "", link: "" },
      ],
    }));

  const updateNavLink = (i: number, key: keyof NavLink, value: string) => {
    const updated = [...settings.navbarLinks];
    updated[i] = { ...updated[i], [key]: value };
    setSettings((prev) => ({ ...prev, navbarLinks: updated }));
  };

  const removeNavLink = (i: number) =>
    setSettings((prev) => ({
      ...prev,
      navbarLinks: prev.navbarLinks.filter((_, idx) => idx !== i),
    }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = settings.navbarLinks.findIndex((l) => l.id === active.id);
    const newIndex = settings.navbarLinks.findIndex((l) => l.id === over.id);

    setSettings((prev) => ({
      ...prev,
      navbarLinks: arrayMove(prev.navbarLinks, oldIndex, newIndex),
    }));
  };

  // Contact Info handler
  const updateContactInfo = (
    key: keyof Settings["contactInfo"],
    value: string
  ) =>
    setSettings((prev) => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [key]: value },
    }));

  // Social Media handler
  const updateSocialMedia = (
    key: keyof Settings["socialMedia"],
    value: string
  ) =>
    setSettings((prev) => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [key]: value },
    }));

  if (loading) {
    return (
      <p className="p-6 text-center text-gray-400">Loading settings...</p>
    );
  }

  return (
    <div className="p-6 mt-6 max-w-4xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#002253]">
            Site Content (CMS)
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Navbar, Contact Info, and Social Media
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-[#002253] text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          <Save size={16} /> Save All Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* Navbar Links */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-[#002253]">Navbar Links</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Drag to reorder links
              </p>
            </div>
            <button
              onClick={addNavLink}
              className="flex items-center gap-1 text-sm text-[#002253] font-medium"
            >
              <Plus size={14} /> Add Link
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={settings.navbarLinks.map((l) => l.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {settings.navbarLinks.map((link, i) => (
                  <SortableNavRow
                    key={link.id}
                    item={link}
                    index={i}
                    onChange={updateNavLink}
                    onRemove={removeNavLink}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {settings.navbarLinks.length === 0 && (
            <p className="text-sm text-gray-400 mt-2">
              No navbar links added yet.
            </p>
          )}
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-[#002253] mb-4">
            Contact Information
          </h2>


          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-[#002253] flex items-center gap-2">
               < Phone size={16} /> Phone / Hotline
              </label>
              <input
                placeholder="+880 1XXX-XXXXXX"
                value={settings.contactInfo.phone}
                onChange={(e) => updateContactInfo("phone", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#002253] flex items-center gap-2">
                < Mail size={16} /> Email
              </label>
              <input
                placeholder="info@example.com"
                value={settings.contactInfo.email}
                onChange={(e) => updateContactInfo("email", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm text-gray-500" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#002253] flex items-center gap-2">
                < MapPin size={16} /> Address
              </label>
              <textarea
                rows={2}
                placeholder="Chittagong, Bangladesh"
                value={settings.contactInfo.address}
                onChange={(e) => updateContactInfo("address", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-[#002253] mb-4">
            Social Media
          </h2>

          <div className="space-y-4">
            {(
              [
                {
                  key: "facebook",
                  label: "Facebook",
                  placeholder: "https://facebook.com/yourpage",
                },
                {
                  key: "twitter",
                  label: "Twitter / X",
                  placeholder: "https://twitter.com/yourhandle",
                },
                {
                  key: "linkedin",
                  label: "LinkedIn",
                  placeholder: "https://linkedin.com/company/yourcompany",
                },
                {
                  key: "youtube",
                  label: "YouTube",
                  placeholder: "https://youtube.com/@yourchannel",
                },
              ] as const
            ).map((s) => (
              <div key={s.key}>
                <label className="block text-sm font-medium mb-1 text-[#002253]">
                  {s.label}
                </label>
                <input
                  placeholder={s.placeholder}
                  value={settings.socialMedia[s.key]}
                  onChange={(e) => updateSocialMedia(s.key, e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm font-mono text-gray-700"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}