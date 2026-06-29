import mongoose from "mongoose";

const InquirySchema =
  new mongoose.Schema(
    {
      productCategory: {
        type: String,
        required: true,
      },

      productType: {
        type: String,
        required: true,
      },

      projectLocation: {
        type: String,
        required: true,
      },

      specifics: {
        type: String,
      },

      name: {
        type: String,
        required: true,
      },

      companyName: {
        type: String,
      },

      phone: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        enum: [
          "New",
          "In Progress",
          "Closed",
        ],
        default: "New",
      },
    },
    {
      timestamps: true,
    }
  );

const Inquiry =
  mongoose.models.Inquiry ||
  mongoose.model(
    "Inquiry",
    InquirySchema
  );

export default Inquiry;
