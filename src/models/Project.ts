import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  category: string;
  title: string;
  location: string;
  client: string;
  equipment: string;
  description: string;
  challenge: string;
  duration: string;
  stats: string;
  image: string;
  youtubeUrl?: string;
  isFeatured: boolean;
  status: "draft" | "published" | "archived"; // Added for CMS control
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    category: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    equipment: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    challenge: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    stats: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    youtubeUrl: { type: String, trim: true, default: "" },
    isFeatured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
