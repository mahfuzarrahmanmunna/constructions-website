/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import MetricCard from "@/components/admin/MetricCard";
import InquiryChart from "../InquiryChart";
import { useEffect, useState, } from "react";
import Link from "next/link";
import {
  Package,
  FileText,
  Users,
  Globe,
} from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardPage() {


  
const [dashboardData,
setDashboardData] =useState({

  totalProducts: 0,
  totalInquiries: 0,

  recentProducts: [],
  recentInquiries: [],
});



// Fetch dashboard data on mount

useEffect(() => {
  const loadDashboard = async () => {
    const request = fetch("/api/dashboard")
      .then(async (res) => {
        const data = await res.json();

        if (!data.success) {
          throw new Error("Failed to load dashboard");
        }

        setDashboardData(data);

        return data;
      });

    toast.promise(request, {
      loading: "Loading dashboard...",
      error: "Failed to load dashboard",
    });
  };

  loadDashboard();
}, []);


  return (

    <div className="p-6">

      <h1 className="text-3xl text-black font-bold mb-6">
        Dashboard Overview
      </h1>

      <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <Link href="/admin/products">
          <MetricCard
          title="Total Products"
          value={dashboardData.totalProducts}
          icon={<Package />}
        />
        </Link>

        <Link href="/admin/inquiries">
          <MetricCard
            title="Total Inquiries"
            value={dashboardData.totalInquiries}
            icon={<FileText />}
          />
        </Link>

        <Link href="/admin/users">
          <MetricCard
            title="Active Users"
            value={80}
            icon={<Users />}
          />
        </Link> 

        <MetricCard
          title="Website Visits"
          value={12450}
          icon={<Globe />}
        />
      </div>

       <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">

        {/* Recent Inquiries */}
          <div
            className="
            xl:col-span-8
            bg-white
            rounded-xl
            shadow
            p-4
            md:p-6
            "
          >

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl md:text-2xl font-bold text-[#002253]">
              Recent Inquiries
            </h2>

            <Link
              href="/admin/inquiries"
              className="
              text-sm
              font-medium
              text-blue-600
              hover:text-blue-800
              "
            >
              View All
            </Link>

          </div>

          <div className="space-y-4">
            <div
              className="
              hidden lg:grid
              lg:grid-cols-[2fr_1fr_1fr_140px]
              gap-6
              px-4
              pb-3
              text-xs
              font-semibold
              text-gray-500
              uppercase
              "
            >
              <div>Customer</div>
              <div>Product</div>
              <div>Phone</div>
              <div>Status</div>
            </div>

            {dashboardData.recentInquiries?.map(
              (item: any) => (

                <div
                  key={item._id}
                  className="
                  grid
                  grid-cols-1
                  lg:grid-cols-[2fr_1fr_1fr_140px]
                  gap-4
                  items-center
                  p-4
                  rounded-xl
                  border
                  border-slate-200
                  hover:bg-slate-50
                  transition-all
                  "
                >

                  {/* User */}
                  <div
                    className="
                    flex
                    items-center
                    gap-4
                    min-w-0
                    "
                  >

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
                      shrink-0
                      "
                    >
                      {item.name?.charAt(0)}
                    </div>

                    <div className="min-w-0">

                      <h3 className="font-semibold text-base text-[#002253] truncate">
                        {item.name}
                      </h3>

                      <p className="text-xs text-gray-500 truncate">
                        {item.email}
                      </p>

                    </div>

                  </div>

                  {/* Product */}
                  <div className="min-w-0 text-black">
                    <p className="font-sm text-base truncate">
                      {item.productName}
                    </p>

                    <p className="font-medium truncate">
                      {item.productCategory}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="min-w-0">

                    <p className=" text-black text-sm">
                      {item.phone}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="justify-self-start lg:justify-self-end">
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        whitespace-nowrap

                        ${
                          item.status === "New"
                            ? "bg-blue-100 text-blue-700"
                            : item.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {item.status || "New"}
                    </span>
                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* Analytics */}
        <div
          className="
          xl:col-span-4
          bg-white
          rounded-xl
          shadow
          p-4
          "
        >
          <InquiryChart
            totalProducts={dashboardData.totalProducts}
            totalInquiries={dashboardData.totalInquiries}
            totalUsers={80}
          />
        </div>

      </div>

    </div>

    

  );
}
