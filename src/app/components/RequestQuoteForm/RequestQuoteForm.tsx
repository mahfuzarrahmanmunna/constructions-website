"use client";

import React, { useState } from "react";
import {
  Check,
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  FileText,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

// --- Color Palette Constants ---
const COLORS = {
  navy: "#002253",
  blue: "#224B88",
  orange: "#E55503",
  orangeLight: "#FF8B28",
};

// --- SUB-COMPONENTS ---
const Select = ({
  name,
  value,
  onChange,
  children,
  hasIcon = false,
  ...rest
}: any) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    required
    className={`
      w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 
      rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55503]/20 focus:border-[#E55503]
      transition-all duration-300 shadow-sm hover:border-gray-300 cursor-pointer
      ${hasIcon ? "pl-10" : ""}
    `}
    {...rest}
  >
    {children}
  </select>
);

const Input = ({
  name,
  value,
  onChange,
  type = "text",
  hasIcon = false,
  ...rest
}: any) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    required
    className={`
      w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 
      rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55503]/20 focus:border-[#E55503]
      transition-all duration-300 shadow-sm hover:border-gray-300
      ${hasIcon ? "pl-10" : ""}
    `}
    {...rest}
  />
);

const FormField = ({ label, name, required, children, icon: Icon }: any) => (
  <div className="flex flex-col gap-2 group">
    <label
      htmlFor={name}
      className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#002253] transition-colors group-hover:text-[#224B88]"
    >
      {label}
      {required && (
        <span className="text-[#E55503] text-sm leading-none">*</span>
      )}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E55503] transition-colors pointer-events-none">
          <Icon size={18} />
        </div>
      )}
      {children}
    </div>
  </div>
);

// --- MAIN COMPONENT ---

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestQuoteModal({
  isOpen,
  onClose,
}: RequestQuoteModalProps) {
  const [formData, setFormData] = useState({
    productCategory: "",
    productType: "",
    projectLocation: "",
    specifics: "",
    name: "",
    companyName: "",
    phone: "",
    email: "",
    privacyPolicy: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    toast.loading("Submitting your quote request...");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Quote submitted successfully!");
        onClose(); // Call parent close function

        setFormData({
          productCategory: "",
          productType: "",
          projectLocation: "",
          specifics: "",
          name: "",
          companyName: "",
          phone: "",
          email: "",
          privacyPolicy: false,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Only render if open

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" />

      <div
        className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="bg-[#002253] px-8 py-6 md:px-12 md:py-8 flex-shrink-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FileText className="text-[#FF8B28]" size={28} />
            Request a Quote
          </h2>
          <p className="text-gray-300 mt-2 text-sm font-light">
            Please fill out the form below and our team will get back to you
            within 24 hours.
          </p>
        </div>

        <div className="overflow-y-auto flex-1">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-8 md:p-12 space-y-10"
          >
            <div>
              <h3 className="text-lg font-bold text-[#002253] mb-6 border-b-2 border-gray-100 pb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E55503]"></span>
                Equipment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Product Category"
                  name="productCategory"
                  required
                >
                  <Select
                    name="productCategory"
                    value={formData.productCategory}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="excavators">Excavators</option>
                    <option value="cranes">Cranes</option>
                    <option value="loaders">Loaders</option>
                  </Select>
                </FormField>
                <FormField label="Product Type" name="productType" required>
                  <Select
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                  >
                    <option value="">Select Type</option>
                    <option value="medium">Medium Duty</option>
                    <option value="heavy">Heavy Duty</option>
                    <option value="compact">Compact</option>
                  </Select>
                </FormField>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#002253] mb-6 border-b-2 border-gray-100 pb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E55503]"></span>
                Project & Timing
              </h3>
              <FormField
                label="Project Location"
                name="projectLocation"
                required
                icon={MapPin}
              >
                <Input
                  name="projectLocation"
                  value={formData.projectLocation}
                  onChange={handleChange}
                  placeholder="City, Country"
                  hasIcon
                />
              </FormField>
              <div className="mt-6">
                <FormField
                  label="More Specifics"
                  name="specifics"
                  required={false}
                >
                  <textarea
                    name="specifics"
                    value={formData.specifics}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Please describe your specific requirements..."
                    className="w-full bg-white border border-gray-200 text-gray-700 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55503]/20 focus:border-[#E55503] transition-all duration-300 shadow-sm hover:border-gray-300 resize-none"
                  />
                </FormField>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#002253] mb-6 border-b-2 border-gray-100 pb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E55503]"></span>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FormField label="Name" name="name" required icon={User}>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    hasIcon
                  />
                </FormField>
                <FormField
                  label="Company Name"
                  name="companyName"
                  required
                  icon={Building}
                >
                  <Input
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company"
                    hasIcon
                  />
                </FormField>
                <FormField label="Phone" name="phone" required icon={Phone}>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="+1 234 567 890"
                    hasIcon
                  />
                </FormField>
                <FormField label="Email" name="email" required icon={Mail}>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="name@company.com"
                    hasIcon
                  />
                </FormField>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <label className="flex items-start gap-3 cursor-pointer group select-none">
                <div className="relative flex items-center mt-0.5">
                  <input
                    type="checkbox"
                    name="privacyPolicy"
                    checked={formData.privacyPolicy}
                    onChange={handleChange}
                    required
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded bg-white checked:bg-[#E55503] checked:border-[#E55503] transition-all cursor-pointer"
                  />
                  <Check
                    className="absolute left-0.5 top-0.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                    size={16}
                  />
                </div>
                <span className="text-sm text-gray-600 leading-snug group-hover:text-[#002253] transition-colors">
                  I agree to the{" "}
                  <span className="text-[#E55503] font-semibold underline cursor-pointer">
                    Privacy Policy
                  </span>{" "}
                  and{" "}
                  <span className="text-[#E55503] font-semibold underline cursor-pointer">
                    Terms of Service
                  </span>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-10 py-3.5 bg-[#E55503] text-white font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-[#E55503]/30 hover:bg-[#FF8B28] hover:shadow-[#FF8B28]/40 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Send"}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
