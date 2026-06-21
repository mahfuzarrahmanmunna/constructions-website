import mongoose, { Schema, Document } from "mongoose";

export interface IEstimate extends Document {
  projectType: string;
  area: string;
  location: string;
  email: string;
  phone: string;
  status: "pending" | "reviewed" | "completed" | "rejected";
  estimatedCost: number | null;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const EstimateSchema = new Schema<IEstimate>(
  {
    projectType: {
      type: String,
      required: true,
      enum: ["residential", "commercial", "industrial"],
    },
    area: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "reviewed", "completed", "rejected"],
      default: "pending",
    },
    estimatedCost: { type: Number, default: null },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export default mongoose.models.Estimate ||
  mongoose.model<IEstimate>("Estimate", EstimateSchema);
