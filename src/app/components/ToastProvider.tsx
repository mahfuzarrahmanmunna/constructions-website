"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        success: {
          style: {
            background: "#002253",
            color: "#fff",
          },
        },
        error: {
          style: {
            background: "#dc2626",
            color: "#fff",
          },
        },
      }}
    />
  );
}