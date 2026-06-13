import mongoose from "mongoose";

const SlideSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    subtitle: String,

    buttonText: String,

    buttonLink: String,

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Slide =
  mongoose.models.Slide ||
  mongoose.model("Slide", SlideSchema);

export default Slide;