// models/Service.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
  id: number;
  title: string;
  description: string;
  image: string;
  type: "primary" | "secondary";
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    type: {
      type: String,
      enum: ["primary", "secondary"],
      required: true,
      default: "primary",
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
