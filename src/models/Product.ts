import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    subTitle: String,
    image: String,
    machineType: String,
    category: String,

    productId: {
      type: Number,
      required: true,
      unique: true,
    },

    modelId: {
      type: Number,
      required: true,
    },
    brochure: {
  type: String,
  default: null,
},
    heroTitle: String,
    heroSubTitle: String,
    heroImage: String,
    description: String,

    features: [
      {
        title: String,
        description: String,
      },
    ],

    specs: [
      {
        model: String,
        label: String,
        value: String,
      },
    ],
    galleryImages: [String],
    galleryVideos: [String],
    
    price: {
      type: Number,
      default: 0,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },

  
  {
    timestamps: true,
  }
);

const Product = 
  mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);

export default Product;