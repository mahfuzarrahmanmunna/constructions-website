import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
  {
    navbarLinks: [
      {
        label: String,
        link: String,
      },
    ],

    contactInfo: {
      phone: String,
      email: String,
      address: String,
      workingHours: String, 
    },

    socialMedia: {
      facebook: String,
      twitter: String,
      linkedin: String,
      youtube: String,
    },
  },
  {
    timestamps: true,
  }
);

const SiteSettings =
  mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);

export default SiteSettings;