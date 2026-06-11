/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";

import {
  categories,
  productTypes,
  purchaseTimeframes,
} from "@/constants/inquiryOptions";

export default function InquiryForm() {

  const initialState = {

    productCategory: "",
    productType: "",
    equipmentModel: "",

    projectLocation: "",
    purchaseTimeframe: "",
    specifics: "",

    name: "",
    companyName: "",
    phone: "",
    email: "",
  };

  const [formData, setFormData] =
    useState(initialState);

  const [loading, setLoading] =
    useState(false);

  const [inquiries, setInquiries] =
    useState([]);

  const [editId, setEditId] =
    useState<string | null>(null);



  // FETCH ALL INQUIRIES
  const fetchInquiries =
    async () => {

    try {

      const res = await fetch(
        "/api/inquiries"
      );

      const data =
        await res.json();

      if (data.success) {
        setInquiries(data.inquiries);
      }

    } catch (error) {

      console.log(error);

    }
  };



  useEffect(() => {

    fetchInquiries();

  }, []);



  // HANDLE INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };



  // CREATE OR UPDATE
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      let url =
        "/api/inquiries";

      let method = "POST";

      // UPDATE MODE
      if (editId) {

        url =
          `/api/inquiries/${editId}`;

        method = "PUT";
      }

      const res = await fetch(
        url,
        {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await res.json();

      if (data.success) {

        alert(
          editId
            ? "Inquiry Updated"
            : "Inquiry Submitted"
        );

        setFormData(initialState);

        setEditId(null);

        fetchInquiries();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    } finally {

      setLoading(false);

    }
  };



  // DELETE
  const deleteInquiry =
    async (id: string) => {

    try {

      const confirmDelete =
        confirm(
          "Delete this inquiry?"
        );

      if (!confirmDelete) {
        return;
      }

      const res = await fetch(
        `/api/inquiries/${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (data.success) {

        alert("Deleted");

        fetchInquiries();

      }

    } catch (error) {

      console.log(error);

    }
  };



  // EDIT
  const editInquiry =
    (inquiry: any) => {

    setEditId(inquiry._id);

    setFormData({

      productCategory:
        inquiry.productCategory,

      productType:
        inquiry.productType,

      equipmentModel:
        inquiry.equipmentModel,

      projectLocation:
        inquiry.projectLocation,

      purchaseTimeframe:
        inquiry.purchaseTimeframe,

      specifics:
        inquiry.specifics,

      name:
        inquiry.name,

      companyName:
        inquiry.companyName,

      phone:
        inquiry.phone,

      email:
        inquiry.email,
    });
  };



  return (

    <div className="max-w-6xl mx-auto p-8">

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-lg shadow"
      >

        <h1 className="text-3xl font-bold">

          {
            editId
              ? "Update Inquiry"
              : "Request a Quote"
          }

        </h1>



        {/* Equipment */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          >

            <option value="">
              Select Category
            </option>

            {categories.map((category) => (

              <option
                key={category}
                value={category}
              >
                {category}
              </option>

            ))}

          </select>



          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          >

            <option value="">
              Select Type
            </option>

            {productTypes.map((type) => (

              <option
                key={type}
                value={type}
              >
                {type}
              </option>

            ))}

          </select>



          <input
            type="text"
            name="equipmentModel"
            placeholder="Equipment Model"
            value={formData.equipmentModel}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

        </div>



        {/* Project */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input
            type="text"
            name="projectLocation"
            placeholder="Project Location"
            value={formData.projectLocation}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />



          <select
            name="purchaseTimeframe"
            value={formData.purchaseTimeframe}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          >

            <option value="">
              Select Timeframe
            </option>

            {purchaseTimeframes.map((timeframe) => (

              <option
                key={timeframe}
                value={timeframe}
              >
                {timeframe}
              </option>

            ))}

          </select>

        </div>



        <textarea
          name="specifics"
          placeholder="More Specifics"
          value={formData.specifics}
          onChange={handleChange}
          className="border p-3 rounded w-full h-32"
        />



        {/* Contact */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />



          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="border p-3 rounded"
          />



          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />



          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

        </div>



        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-3 rounded"
        >

          {
            loading
              ? "Loading..."
              : editId
              ? "Update Inquiry"
              : "Send Inquiry"
          }

        </button>

      </form>



      {/* TABLE */}

      <div className="mt-10 overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">
                Name
              </th>

              <th className="border p-3">
                Email
              </th>

              <th className="border p-3">
                Phone
              </th>

              <th className="border p-3">
                Actions
              </th>

            </tr>

          </thead>



          <tbody>

            {inquiries.map(
              (inquiry: any) => (

              <tr key={inquiry._id}>

                <td className="border p-3">
                  {inquiry.name}
                </td>

                <td className="border p-3">
                  {inquiry.email}
                </td>

                <td className="border p-3">
                  {inquiry.phone}
                </td>

                <td className="border p-3 flex gap-2">

                  <button
                    onClick={() =>
                      editInquiry(
                        inquiry
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>



                  <button
                    onClick={() =>
                      deleteInquiry(
                        inquiry._id
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}