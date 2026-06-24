// src/scripts/seedServices.ts
import * as dotenv from "dotenv";
import * as path from "path";


dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

// Service schema inline 
const ServiceSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, enum: ["primary", "secondary"], default: "primary" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);

const primaryServices = [
  { id: 1, title: "Road Construction", description: "We build durable highways, city roads, and transportation networks using premium asphalt and advanced compaction technologies.", image: "/services/road.jpg", type: "primary", order: 1 },
  { id: 2, title: "Bridge Construction", description: "Modern bridge structures engineered for long-term durability, safety, and efficient transportation connectivity.", image: "/services/bridge.jpg", type: "primary", order: 2 },
  { id: 3, title: "Drain & Culvert Construction", description: "Advanced drainage systems, culverts, and water management solutions built to withstand heavy monsoon conditions.", image: "/services/drain.jpg", type: "primary", order: 3 },
  { id: 4, title: "Residential Buildings", description: "Modern residential developments designed for comfort, safety, sustainability, and long-term living quality.", image: "/services/residential.jpg", type: "primary", order: 4 },
  { id: 5, title: "Commercial Buildings", description: "Office towers, shopping centers, and business facilities equipped with smart technologies and efficient layouts.", image: "/services/commercial.jpg", type: "primary", order: 5 },
  { id: 6, title: "Factory Buildings & Special Buildings", description: "Industrial facilities, warehouses, and specialized structures tailored to operational and manufacturing needs.", image: "/services/factory.jpg", type: "primary", order: 6 },
  { id: 7, title: "Land Development", description: "Site clearing, filling, leveling, and foundation preparation for successful project execution.", image: "/services/land.jpg", type: "primary", order: 7 },
  { id: 8, title: "Piling Works & Soil Management", description: "Deep piling, soil stabilization, and embankment reinforcement solutions for strong foundations.", image: "/services/piling.jpg", type: "primary", order: 8 },
  { id: 9, title: "Public Infrastructure", description: "Railway stations, airports, seaports, river terminals, mosques, tourism facilities, and public landmarks.", image: "/services/infrastructure.jpg", type: "primary", order: 9 },
];

const secondaryServices = [
  { id: 10, title: "Construction Material Supply", description: "Supply of aggregates, cement, steel, scaffolding systems, electrical items, safety equipment, and construction accessories.", image: "/services/material.jpg", type: "secondary", order: 1 },
  { id: 11, title: "Equipment Rental Services", description: "Excavators, cranes, rollers, bulldozers, demolition equipment, and specialized machinery with certified operators.", image: "/services/equipment.jpg", type: "secondary", order: 2 },
  { id: 12, title: "Consultancy Services", description: "Engineering design, workforce supply, sourcing solutions, maintenance support, logistics, and chartering services.", image: "/services/consultancy.jpg", type: "secondary", order: 3 },
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  await Service.deleteMany({});
  console.log("🗑️  Old services cleared");

  await Service.insertMany([...primaryServices, ...secondaryServices]);
  console.log("✅ Services seeded successfully! Total:", primaryServices.length + secondaryServices.length);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
