/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useEffect,
  useState,
} from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function InquiriesPage() {

  const [
    inquiries,
    setInquiries,
  ] = useState<any[]>([]);

  const [
    selectedInquiry,
    setSelectedInquiry,
    ] = useState<any>(null);

  useEffect(() => {

    const fetchInquiries =
      async () => {

      const res =
        await fetch(
          "/api/inquiries"
        );

      const data =
        await res.json();

      if (data.success) {
        setInquiries(
          data.inquiries
        );
      }
    };

    fetchInquiries();

  }, []);

  // Update Inquiry Status
  const updateStatus = async (
    id: string,
    status: string
  ) => {
    const loadingToast = toast.loading(
      "Updating status..."
    );

    try {
      const res = await fetch(
        `/api/inquiries/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setInquiries((prev: any) =>
          prev.map((item: any) =>
            item._id === id
              ? {
                  ...item,
                  status,
                }
              : item
          )
        );

        toast.success(
          `Status updated to ${status}`,
          {
            id: loadingToast,
          }
        );
      } else {
        toast.error(
          "Failed to update status",
          {
            id: loadingToast,
          }
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong",
        {
          id: loadingToast,
        }
      );
    }
  };

  // Delete Inquiry with Confirmation

  const deleteInquiry = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Inquiry?",
      text: "Are you sure you want to delete this inquiry?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setInquiries((prev: any) =>
          prev.filter((item: any) => item._id !== id)
        );

        toast.success("Inquiry deleted successfully");
      }
    } catch {
      toast.error("Failed to delete inquiry");
    }
  };

  // Export Functions

const exportCSV = () => {

  const headers = [
    "Name",
    "Email",
    "Phone",
    "Category",
    "Type",
    "Status",
    "Date",
  ];

  const rows = inquiries.map((item: any) => [
    item.name,
    item.email,
    item.phone,
    item.productCategory,
    item.productType,
    item.status,
    new Date(
      item.createdAt
    ).toLocaleDateString(),
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row.join(",")
    )
    .join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const url =
    window.URL.createObjectURL(
      blob
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    "inquiries.csv";

  link.click();
};


const exportPDF = () => {

  const doc =
    new jsPDF();

  doc.setFontSize(18);

  doc.text(
    "Inquiry Report",
    14,
    20
  );

  autoTable(doc, {

    startY: 30,

    head: [[
      "No",

      "Name",

      "Email",

      "Phone",

      "Category",

      "Status",

      "Date",

    ]],

    body: inquiries.map(
      (item: any, index: number) => [
        index + 1,

        item.name,

        item.email,

        item.phone,

        item.productCategory,

        item.status,

        new Date(
          item.createdAt
        ).toLocaleDateString(),

      ]
    ),

  });

  doc.save(
    `inquiries-${
      new Date()
        .toISOString()
        .split("T")[0]
    }.pdf`
  );

};

return (

       <div className="p-6 mt-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <h1 className="text-3xl font-bold text-[#002253]">
            Inquiry Inbox
            </h1>

              

            <div className="flex flex-col text-black sm:flex-row items-start sm:items-center gap-3">
              <select
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value === "csv") {
                    exportCSV();
                  }

                  if (e.target.value === "pdf") {
                    exportPDF();
                  }

                  // Reset select after export
                  e.target.value = "";
                }}
                className="
                  border
                  text-white
                  bg-[#002253]
                  rounded-lg
                  px-4
                  py-2
                "
              >
                <option value="">
                  Export
                </option>

                <option value="csv">
                  Download CSV
                </option>

                <option value="pdf">
                  Download PDF
                </option>
              </select>
            Total: {inquiries.length}
            </div>


        </div>

        <div
          className="
          bg-white
          rounded-2xl
          shadow-lg
          border
          border-slate-200
          overflow-hidden
          "
        >
        {/* MOBILE VIEW */}
        <div className="block lg:hidden space-y-4">

          {inquiries.map((item: any) => (

            <div
              key={item._id}
              className="
              bg-white
              rounded-xl
              border
              border-slate-200
              shadow-sm
              p-4
              "
            >

              <div className="flex items-center gap-3 mb-4">

                <div
                  className="
                  w-12
                  h-12
                  rounded-full
                  bg-[#002253]
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  "
                >
                  {item.name?.charAt(0)}
                </div>

                <div>

                  <h3 className="font-semibold text-[#002253]">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.companyName || "No Company"}
                  </p>

                </div>

              </div>

              <div className="space-y-2 text-sm text-gray-700">

                <p>
                  <span className="font-medium">
                    Email:
                  </span>
                  {" "}
                  {item.email}
                </p>

                <p>
                  <span className="font-medium">
                    Phone:
                  </span>
                  {" "}
                  {item.phone}
                </p>

                <p>
                  <span className="font-medium">
                    Product:
                  </span>
                  {" "}
                  {item.productCategory}
                </p>

                <p>
                  <span className="font-medium">
                    Type:
                  </span>
                  {" "}
                  {item.productType}
                </p>

              </div>

              <div className="mt-4 text-black">

                <select
                  value={item.status || "New"}
                  onChange={(e) =>
                    updateStatus(
                      item._id,
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  border
                  rounded-lg
                  px-3
                  py-2
                  "
                >

                  <option value="New">
                    New
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Closed">
                    Closed
                  </option>

                </select>

              </div>

              <div className="flex gap-2 mt-4">

                <button
                  onClick={() =>
                  {console.log("Selected Inquiry:", item);
                    setSelectedInquiry(item)
                  }}
                  className="
                  flex-1
                  py-2
                  rounded-lg
                  bg-blue-100
                  text-blue-700
                  "
                >
                  View
                </button>

                <button
                  onClick={() =>
                    deleteInquiry(item._id)
                  }
                  className="
                  flex-1
                  py-2
                  rounded-lg
                  bg-red-100
                  text-red-700
                  "
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

          {/* DESKTOP TABLE */}
            <div className="hidden lg:block w-full">

              <table className="w-full table-fixed text-sm">

                <thead className="bg-[#002253] text-white">

                  <tr>

                    <th className="w-[5%] px-3 py-4 text-left">
                      No:
                    </th>

                    <th className="w-[24%] px-3 py-4 text-left">
                      Customer
                    </th>

                    <th className="w-[24%] px-3 py-4 text-left">
                      Contact
                    </th>

                    <th className="w-[12%] px-3 py-4 text-left">
                      Product
                    </th>

                    <th className="w-[12%] px-3 py-4 text-center">
                      Status
                    </th>

                    <th className="w-[10%] px-3 py-4 text-center">
                      Date
                    </th>

                    <th className="w-[14%] px-3 py-4 text-center">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {inquiries.map((item: any, index: number) => (

                    <tr
                      key={item._id}
                      className="
                      border-b
                      border-slate-200
                      hover:bg-slate-50
                      transition
                      "
                    >
                       {/* Number */}
                    <td className="px-3 text-[#002253] py-4">
                      {index + 1}
                    </td>

                      {/* Customer */}
                      <td className=" py-4">


                          <div className="min-w-0">
                            <h3 className="font-semibold text-[#002253] truncate">
                              {item.name}
                            </h3>

                            <p className="text-xs text-gray-500 truncate">
                              {item.companyName || "No Company"}
                            </p>
                          </div>

                      </td>

                      {/* Contact */}
                      <td className="px-3 py-4">
                        <p className="truncate text-sm text-gray-700">
                          {item.email}
                        </p>

                        <p className="text-xs text-gray-500 truncate">
                          {item.phone}
                        </p>
                      </td>
                      {/* Product */}
                      <td className="px-3 py-4">
                      <p className="font-medium text-black capitalize truncate">
                        {item.productCategory}
                      </p>

                      <p className="text-xs text-gray-500 truncate">
                        {item.productType}
                      </p>
                    </td>

                      {/* Status */}
                      <td className="px-1 py-1 text-center">

                        <select
                          value={item.status || "New"}
                          onChange={(e) =>
                            updateStatus(
                              item._id,
                              e.target.value
                            )
                          }
                          className={`
                            px-2
                            py-1
                            rounded-lg
                            border
                            text-xs
                            font-medium

                            ${
                              item.status === "New"
                                ? "bg-blue-100 text-blue-700 border-blue-300"
                                : item.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                : "bg-green-100 text-green-700 border-green-300"
                            }
                          `}
                        >

                          <option value="New">
                            New
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Closed">
                            Closed
                          </option>

                        </select>

                      </td>

                      {/* Date */}
                      <td className="px-3 py-4 text-gray-700 text-center">

                        <p className="text-sm">
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </p>

                        <p className="text-xs text-gray-500">
                          {new Date(
                            item.createdAt
                          ).toLocaleTimeString()}
                        </p>

                      </td>

                      {/* Actions */}
                      <td className="px-1 py-3 text-center">

                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() => {
                              console.log(item);
                              setSelectedInquiry(item);
                            }}
                            className="
                            px-3
                            py-1
                            text-xs
                            rounded-lg
                            bg-blue-100
                            text-blue-700
                            hover:bg-blue-200
                            "
                          >
                            View
                          </button>

                          <button
                            onClick={() =>
                              deleteInquiry(item._id)
                            }
                            className="
                            px-1
                            py-1
                            text-xs
                            rounded-lg
                            bg-red-100
                            text-red-700
                            hover:bg-red-200
                            "
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

              {selectedInquiry && (
                <div
                  className="
                  fixed
                  inset-0
                  bg-black/60
                  flex
                  items-center
                  justify-center
                  z-[9999]
                  p-4
                  "
                >
                  <div
                    className="
                    bg-white
                    w-full
                    max-w-4xl
                    rounded-2xl
                    shadow-2xl
                    overflow-y-auto
                    max-h-[90vh]
                    "
                  >
                    {/* Header */}
                    <div
                      className="
                      bg-[#002253]
                      text-white
                      px-6
                      py-5
                      flex
                      justify-between
                      items-center
                      "
                    >
                      <div>
                        <h2 className="text-2xl font-bold">
                          Inquiry Details
                        </h2>

                        <p className="text-sm opacity-80">
                          Customer Information
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          setSelectedInquiry(null)
                        }
                        className="
                        text-3xl
                        hover:text-red-300
                        "
                      >
                        ×
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-6">

                      <div className="grid md:grid-cols-2 gap-6">

                        <div>
                          <h3 className="font-bold text-lg text-[#002253] mb-3">
                            Customer Information
                          </h3>
                          <div className="space-y-2 text-black">
                            <p>
                              <strong>Name:</strong>{" "}
                              {selectedInquiry.name}
                            </p>

                            <p className="text-[#002253]">
                              <strong>Company:</strong>{" "}
                              {selectedInquiry.companyName ||
                                "N/A"}
                            </p>

                            <p className="text-[#002253]">
                              <strong>Email:</strong>{" "}
                              {selectedInquiry.email}
                            </p>

                            <p className="text-[#002253]">
                              <strong>Phone:</strong>{" "}
                              {selectedInquiry.phone}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg text-[#002253] mb-3">
                            Product Information
                          </h3>
                          <div className="space-y-2  text-black">
                            <p>
                              <strong>Category:</strong>{" "}
                              {selectedInquiry.productCategory}
                            </p>

                            <p className="text-[#002253]">
                              <strong>Type:</strong>{" "}
                              {selectedInquiry.productType}
                            </p>
                          </div>
                        </div>

                      </div>

                      <div>
                        <h3 className="font-bold text-lg text-[#002253] mb-3">
                          Project Information
                        </h3>

                        <div>
                          <p className="text-gray-500">
                            Project Location
                          </p>
                          <p className="text-black">
                            {
                              selectedInquiry.projectLocation
                            }
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-lg text-[#002253] mb-3">
                          Customer Message
                        </h3>

                        <div
                          className="
                          border
                          rounded-xl
                          p-4
                          text-black
                          bg-slate-50
                          text-[#002253]
                          "
                        >
                          {selectedInquiry.specifics ||
                            "No additional message"}
                        </div>
                      </div>

                      <div
                        className="
                        flex
                        justify-between
                        items-center
                        border-t
                        pt-4
                        "
                      >
                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-sm
                            font-medium

                            ${
                              selectedInquiry.status === "Closed"
                                ? "bg-green-100 text-green-700"
                                : selectedInquiry.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          `}
                        >
                          {selectedInquiry.status || "New"}
                        </span>

                        <span className="text-sm text-gray-500">
                          Submitted:
                          {" "}
                          {new Date(
                            selectedInquiry.createdAt
                          ).toLocaleString()}
                        </span>
                      </div>

                    </div>
                  </div>
                </div>
              )}
          </div>
         </div>
);
}