// src/scripts/seedCategories.ts
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

// Category schema inline
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    machineType: { type: String, required: true },
    icon: { type: String, default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

const categories = [
  { name: "Concrete Machinery",      slug: "concrete-machinery",   machineType: "concrete",   icon: "/category/1st.png",  order: 1  },
  { name: "Excavator",               slug: "excavator",            machineType: "excavation", icon: "/category/2nd.png",  order: 2  },
  { name: "Crane",                   slug: "crane",                machineType: "lifting",    icon: "/category/3rd.png",  order: 3  },
  { name: "Port Machinery",          slug: "port-machinery",       machineType: "port",       icon: "/category/4th.png",  order: 4  },
  { name: "Road Machinery",          slug: "road-machinery",       machineType: "road",       icon: "/category/5th.png",  order: 5  },
  { name: "Mining & Tunneling",      slug: "mining-tunneling",     machineType: "mining",     icon: "/category/6th.png",  order: 6  },
  { name: "Truck",                   slug: "truck",                machineType: "transport",  icon: "/category/7th.png",  order: 7  },
  { name: "Piling Machinery",        slug: "piling-machinery",     machineType: "piling",     icon: "/category/8th.png",  order: 8  },
  { name: "Fire-fighting Equipment", slug: "fire-fighting",        machineType: "safety",     icon: "/category/9th.png",  order: 9  },
  { name: "Mobile Crusher",          slug: "mobile-crusher",       machineType: "crushing",   icon: "/category/10th.png", order: 10 },
  { name: "Hydrogen Energy",         slug: "hydrogen-energy",      machineType: "energy",     icon: "/category/11th.png", order: 11 },
  { name: "Petroleum Equipment",     slug: "petroleum-equipment",  machineType: "petroleum",  icon: "/category/12th.png", order: 12 },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  // ✅ পুরনো data মুছবে না — শুধু নতুন গুলো insert করবে
  let inserted = 0;
  let skipped = 0;

  for (const cat of categories) {
    const exists = await Category.findOne({ slug: cat.slug });
    if (exists) {
      console.log(`⏭️  Already exists, skipped: ${cat.name}`);
      skipped++;
    } else {
      await Category.create(cat);
      console.log(`✅ Inserted: ${cat.name}`);
      inserted++;
    }
  }

  console.log(`\n🎉 Done! Inserted: ${inserted}, Skipped: ${skipped}`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});