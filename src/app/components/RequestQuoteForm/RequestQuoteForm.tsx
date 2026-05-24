"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Check,
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  FileText,
} from "lucide-react";

// --- Color Palette Constants ---
const COLORS = {
  navy: "#002253", // Pantone 2768 C (Text, Headings)
  blue: "#224B88", // Pantone 2154 C (Secondary Accents)
  orange: "#E55503", // Pantone 1655 C (Primary Actions, Required *)
  orangeLight: "#FF8B28", // Pantone 1495 C (Hover States)
};

// --- SUB-COMPONENTS (Defined Outside Main Component) ---

// Custom Select Component
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

// Custom Text Input Component
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

// Reusable Input Wrapper Component
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

export default function RequestQuoteForm() {
  const [formData, setFormData] = useState({
    productCategory: "",
    productType: "",
    equipmentModel: "",
    projectLocation: "",
    purchaseTimeframe: "",
    moreSpecifics: "",
    name: "",
    companyName: "",
    phone: "",
    email: "",
    privacyPolicy: false,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add your submission logic here
  };

  return (
    <div className="w-full bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Form Header */}
        <div className="bg-[#002253] px-8 py-6 md:px-12 md:py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <FileText className="text-[#FF8B28]" size={28} />
            Request a Quote
          </h2>
          <p className="text-gray-300 mt-2 text-sm font-light">
            Please fill out the form below and our team will get back to you
            within 24 hours.
          </p>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
          {/* 1. Equipment Section */}
          <div>
            <h3 className="text-lg font-bold text-[#002253] mb-6 border-b-2 border-gray-100 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E55503]"></span>
              Equipment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              <FormField label="Equipment Model" name="equipmentModel" required>
                <Input
                  name="equipmentModel"
                  value={formData.equipmentModel}
                  onChange={handleChange}
                  placeholder="e.g. ZE215E"
                />
              </FormField>
            </div>
          </div>

          {/* 2. Project & Details Section */}
          <div>
            <h3 className="text-lg font-bold text-[#002253] mb-6 border-b-2 border-gray-100 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E55503]"></span>
              Project & Timing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <FormField
                label="Purchase Timeframe"
                name="purchaseTimeframe"
                required
              >
                <Select
                  name="purchaseTimeframe"
                  value={formData.purchaseTimeframe}
                  onChange={handleChange}
                >
                  <option value="">Select Timeframe</option>
                  <option value="immediate">Immediately</option>
                  <option value="1-3months">1-3 Months</option>
                  <option value="3-6months">3-6 Months</option>
                  <option value="6+months">More than 6 Months</option>
                </Select>
              </FormField>
            </div>

            {/* Full Width Textarea */}
            <div className="mt-6">
              <FormField
                label="More Specifics"
                name="moreSpecifics"
                required={false}
              >
                <textarea
                  name="moreSpecifics"
                  value={formData.moreSpecifics}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Please describe your specific requirements, terrain conditions, or any additional details..."
                  className="w-full bg-white border border-gray-200 text-gray-700 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E55503]/20 focus:border-[#E55503] transition-all duration-300 shadow-sm hover:border-gray-300 resize-none"
                />
              </FormField>
            </div>
          </div>

          {/* 3. Contact Information Section */}
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

          {/* 4. Footer: Privacy & Action */}
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
              className="w-full md:w-auto px-10 py-3.5 bg-[#E55503] text-white font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-[#E55503]/30 hover:bg-[#FF8B28] hover:shadow-[#FF8B28]/40 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Send
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
  );
}
