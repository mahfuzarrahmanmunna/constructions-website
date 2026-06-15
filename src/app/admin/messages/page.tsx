"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] =
      useState<any>(null);

    useEffect(() => {
    const fetchMessages = async () => {
        const res = await fetch("/api/contact");
        const data = await res.json();

        if (data.success) {
        setMessages(data.contacts);
        }
        
    };

    fetchMessages();
    }, []);

    const deleteMessage = async (
    id: string
    ) => {
    const result = await Swal.fire({
        title: "Delete Message?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;
    toast.loading("Deleting message...");

    try {
        const res = await fetch(
        `/api/contact/${id}`,
        {
            method: "DELETE",
        }
        );

        const data = await res.json();

        if (data.success) {
        setMessages((prev: any) =>
            prev.filter(
            (item: any) =>
                item._id !== id
            )
        );

        toast.success(
            "Message deleted successfully"
        );
        }
    } catch {
        toast.error(
        "Failed to delete message"
        );
    }
    };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-[#002253] font-bold mb-6">
        Contact Messages
      </h1>

    {/* /Mobile view */}

    <div className="block lg:hidden space-y-4">

        {messages.map((item: any) => (

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

            <div className="mb-3">

                <h3 className="font-semibold text-[#002253]">
                {item.name}
                </h3>

                <p className="text-sm text-gray-500">
                {item.email}
                </p>

            </div>

            <div className="space-y-2 text-sm text-gray-700">

                <p>
                <span className="font-medium">
                    Phone:
                </span>{" "}
                {item.phone}
                </p>

                <p>
                <span className="font-medium">
                    Subject:
                </span>{" "}
                {item.subject}
                </p>

            </div>

            <div className="flex gap-2 mt-4">

                <button
                onClick={() =>
                    setSelectedMessage(item)
                }
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
                    deleteMessage(item._id)
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

    {/* /Desktop view */}

    <div className="hidden lg:block w-full">

        <table className="w-full table-fixed text-sm">

            <thead className="bg-[#002253] text-white">

            <tr>

                <th className="w-[5%] px-3 py-4">
                No
                </th>

                <th className="w-[20%] px-3 py-4 text-left">
                Name
                </th>

                <th className="w-[25%] px-3 py-4 text-left">
                Email
                </th>

                <th className="w-[20%] px-3 py-4 text-left">
                Subject
                </th>

                <th className="w-[15%] px-3 py-4 text-center">
                Date
                </th>

                <th className="w-[15%] px-3 py-4 text-center">
                Actions
                </th>

            </tr>

            </thead>

            <tbody>

            {messages.map(
                (item: any, index: number) => (

                <tr
                    key={item._id}
                    className="
                    border-b
                    hover:bg-slate-50
                    "
                >

                    <td className="px-3 text-[#002253] py-4">
                    {index + 1}
                    </td>
                        {/* customersName */}
                    <td className="px-3 py-4">

                    <p className="font-semibold text-[#002253]">
                        {item.name}
                    </p>

                    </td>
                        {/* contact details */}
                      <td className="px-3 py-4">
                        <p className="truncate text-sm text-gray-700">
                          {item.email}
                        </p>

                        <p className="text-xs text-gray-500 truncate">
                          {item.phone}
                        </p>
                      </td>
                          {/* subject */}
                    <td className="px-3 py-4 text-gray-700 truncate">
                    {item.subject}
                    </td>
                        {/* Date & Time */}
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

                    <td className="px-3 py-4">

                    <div className="flex justify-center gap-2">

                        <button
                        onClick={() =>
                            setSelectedMessage(item)
                        }
                        className="
                        px-3
                        py-1
                        rounded-lg
                        bg-blue-100
                        text-blue-700
                        "
                        >
                        View
                        </button>

                        <button
                        onClick={() =>
                            deleteMessage(item._id)
                        }
                        className="
                        px-3
                        py-1
                        rounded-lg
                        bg-red-100
                        text-red-700
                        "
                        >
                        Delete
                        </button>

                    </div>

                    </td>

                </tr>

                )
            )}

            </tbody>

        </table>

    </div>
   
            {selectedMessage && (

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
                    max-w-3xl
                    rounded-2xl
                    shadow-2xl
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
                        "
                    >

                        <div>

                        <h2 className="text-2xl font-bold">
                            Message Details
                        </h2>

                        <p className="text-sm opacity-80">
                            Contact Form Submission
                        </p>

                        </div>

                        <button
                        onClick={() =>
                            setSelectedMessage(null)
                        }
                        className="text-3xl"
                        >
                        ×
                        </button>

                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4 text-black">

                        <p>
                        <strong>Name:</strong>{" "}
                        {selectedMessage.name}
                        </p>

                        <p>
                        <strong>Email:</strong>{" "}
                        {selectedMessage.email}
                        </p>

                        <p>
                        <strong>Phone:</strong>{" "}
                        {selectedMessage.phone}
                        </p>

                        <p>
                        <strong>Subject:</strong>{" "}
                        {selectedMessage.subject}
                        </p>

                        <div>

                        <p className="font-semibold mb-2">
                            Message
                        </p>

                        <div
                            className="
                            p-4
                            rounded-xl
                            bg-slate-50
                            border
                            "
                        >
                            {selectedMessage.message}
                        </div>

                        </div>

                        <div className="text-sm text-gray-500">

                        Submitted:
                        {" "}
                        {new Date(
                            selectedMessage.createdAt
                        ).toLocaleString()}

                        </div>

                    </div>

                    </div>

                </div>

                )}
    </div>
  );
}