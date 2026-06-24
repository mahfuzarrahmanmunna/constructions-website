// lib/categoryData.ts
// Save this file at: src/lib/categoryData.ts

export interface ProductSpec {
  label: string;
  value: string;
}

export interface CategoryProduct {
  id: number;
  name: string;
  model: string;
  image: string;
  price: string;
  condition: "New" | "Used" | "Refurbished";
  year: number;
  specs: ProductSpec[];
  description: string;
  available: boolean;
}

export interface CategoryInfo {
  machineType: string;
  category: string;
  label: string;
  image: string;
  description: string;
  products: CategoryProduct[];
}

export const categoryData: CategoryInfo[] = [
  {
    machineType: "concrete-machinery",
    category: "concrete-machinery",
    label: "Concrete Machinery",
    image: "/category/1st.png",
    description:
      "High-performance concrete machinery for construction projects of all scales.",
    products: [
      {
        id: 1,
        name: "Concrete Pump Truck",
        model: "CPM-37",
        image: "/featured/below45.jfif",
        price: "$85,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Max Output", value: "130 m³/h" },
          { label: "Max Pressure", value: "11 MPa" },
          { label: "Boom Length", value: "37m" },
          { label: "Engine Power", value: "350 HP" },
        ],
        description:
          "Truck-mounted concrete pump with 37m boom, ideal for mid-rise buildings.",
        available: true,
      },
      {
        id: 2,
        name: "Concrete Batching Plant",
        model: "CBP-90",
        image: "/featured/90T.jpg",
        price: "$120,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Capacity", value: "90 m³/h" },
          { label: "Mixer Volume", value: "1500L" },
          { label: "Storage Bins", value: "4 x 15m³" },
          { label: "Power", value: "380V/50Hz" },
        ],
        description:
          "Stationary concrete batching plant for large construction projects.",
        available: true,
      },
      {
        id: 3,
        name: "Self-Loading Mixer",
        model: "SLM-4.0",
        image: "/featured/crainetrack.avif",
        price: "$45,000",
        condition: "Used",
        year: 2022,
        specs: [
          { label: "Drum Capacity", value: "4.0 m³" },
          { label: "Loading Height", value: "3.6m" },
          { label: "Engine", value: "74 kW" },
          { label: "Water Tank", value: "400L" },
        ],
        description: "Self-loading concrete mixer for remote job sites.",
        available: true,
      },
    ],
  },
  {
    machineType: "excavator",
    category: "excavator",
    label: "Excavator",
    image: "/category/2nd.png",
    description:
      "Powerful excavators built for earthmoving, mining, and demolition work.",
    products: [
      {
        id: 1,
        name: "Crawler Excavator",
        model: "EX-220",
        image: "/featured/below45.jfif",
        price: "$95,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Operating Weight", value: "22,000 kg" },
          { label: "Engine Power", value: "122 kW" },
          { label: "Bucket Capacity", value: "0.93 m³" },
          { label: "Max Dig Depth", value: "6.7m" },
        ],
        description:
          "Standard crawler excavator for general earthmoving and trenching.",
        available: true,
      },
      {
        id: 2,
        name: "Mini Excavator",
        model: "EX-35",
        image: "/featured/90T.jpg",
        price: "$38,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Operating Weight", value: "3,500 kg" },
          { label: "Engine Power", value: "24 kW" },
          { label: "Bucket Capacity", value: "0.14 m³" },
          { label: "Max Dig Depth", value: "3.5m" },
        ],
        description:
          "Compact mini excavator for tight spaces and utility work.",
        available: true,
      },
      {
        id: 3,
        name: "Long Reach Excavator",
        model: "EX-350LR",
        image: "/featured/crainetrack.avif",
        price: "$180,000",
        condition: "New",
        year: 2023,
        specs: [
          { label: "Operating Weight", value: "35,000 kg" },
          { label: "Engine Power", value: "210 kW" },
          { label: "Max Reach", value: "18m" },
          { label: "Max Dig Depth", value: "14m" },
        ],
        description:
          "Long-reach excavator for dredging and deep excavation work.",
        available: false,
      },
    ],
  },
  {
    machineType: "crane",
    category: "crane",
    label: "Crane",
    image: "/category/3rd.png",
    description:
      "Heavy-duty cranes for lifting and positioning loads at construction sites.",
    products: [
      {
        id: 1,
        name: "Truck Crane 50T",
        model: "CPL-500",
        image: "/featured/below45.jfif",
        price: "$210,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Max Lifting Capacity", value: "50T" },
          { label: "Max Boom Length", value: "48m" },
          { label: "Max Radius", value: "42m" },
          { label: "Engine Power", value: "280 kW" },
        ],
        description:
          "50-ton truck crane with excellent mobility and lifting performance.",
        available: true,
      },
      {
        id: 2,
        name: "All Terrain Crane 100T",
        model: "CPL-1000",
        image: "/featured/90T.jpg",
        price: "$450,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Max Lifting Capacity", value: "100T" },
          { label: "Max Boom Length", value: "70m" },
          { label: "Max Radius", value: "60m" },
          { label: "Drive", value: "8x8 All Terrain" },
        ],
        description:
          "100-ton all-terrain crane for major infrastructure projects.",
        available: true,
      },
      {
        id: 3,
        name: "Tower Crane",
        model: "TC-6015",
        image: "/featured/crainetrack.avif",
        price: "$320,000",
        condition: "Used",
        year: 2021,
        specs: [
          { label: "Max Load", value: "8T" },
          { label: "Jib Length", value: "60m" },
          { label: "Max Height", value: "80m" },
          { label: "Tip Load", value: "1.5T" },
        ],
        description:
          "Self-erecting tower crane for high-rise building construction.",
        available: true,
      },
    ],
  },
  {
    machineType: "port-machinery",
    category: "port-machinery",
    label: "Port Machinery",
    image: "/category/4th.png",
    description:
      "Specialized port handling equipment for container terminals and bulk cargo.",
    products: [
      {
        id: 1,
        name: "Reach Stacker",
        model: "RS-45",
        image: "/featured/below45.jfif",
        price: "$380,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Lifting Capacity", value: "45T" },
          { label: "Max Stack Height", value: "4 high" },
          { label: "Engine", value: "260 kW" },
          { label: "Transmission", value: "Powershift" },
        ],
        description:
          "Heavy-duty reach stacker for container handling in port terminals.",
        available: true,
      },
      {
        id: 2,
        name: "Empty Container Handler",
        model: "ECH-10",
        image: "/featured/90T.jpg",
        price: "$160,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Lifting Capacity", value: "10T" },
          { label: "Stack Height", value: "9 high empty" },
          { label: "Engine", value: "130 kW" },
          { label: "Mast Height", value: "16m" },
        ],
        description:
          "Efficient empty container handler for high-stack storage.",
        available: true,
      },
    ],
  },
  {
    machineType: "road-machinery",
    category: "road-machinery",
    label: "Road Machinery",
    image: "/category/5th.png",
    description:
      "Professional road construction and maintenance machinery for all terrains.",
    products: [
      {
        id: 1,
        name: "Asphalt Paver",
        model: "AP-5000",
        image: "/featured/below45.jfif",
        price: "$195,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Paving Width", value: "2.55m - 9m" },
          { label: "Paving Speed", value: "0–25 m/min" },
          { label: "Layer Thickness", value: "10–300mm" },
          { label: "Engine Power", value: "112 kW" },
        ],
        description:
          "High-efficiency asphalt paver for highway and urban road construction.",
        available: true,
      },
      {
        id: 2,
        name: "Road Roller",
        model: "RR-22",
        image: "/featured/90T.jpg",
        price: "$55,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Operating Weight", value: "22,000 kg" },
          { label: "Drum Width", value: "2,130mm" },
          { label: "Vibration Force", value: "430 kN" },
          { label: "Engine Power", value: "149 kW" },
        ],
        description:
          "Tandem vibratory road roller for compaction of asphalt layers.",
        available: true,
      },
    ],
  },
  {
    machineType: "mining-tunneling",
    category: "mining-tunneling",
    label: "Mining & Tunneling",
    image: "/category/6th.png",
    description:
      "Robust underground and open-pit mining machinery for tough conditions.",
    products: [
      {
        id: 1,
        name: "Tunnel Boring Machine",
        model: "TBM-6000",
        image: "/featured/below45.jfif",
        price: "On Request",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Cutter Head Diameter", value: "6,000mm" },
          { label: "Boring Speed", value: "20–80 mm/min" },
          { label: "Max Thrust", value: "35,000 kN" },
          { label: "Total Power", value: "3,200 kW" },
        ],
        description:
          "Full-face tunnel boring machine for metro and highway tunnels.",
        available: true,
      },
      {
        id: 2,
        name: "Mining Drill Rig",
        model: "DR-150",
        image: "/featured/90T.jpg",
        price: "$290,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Hole Diameter", value: "90–165mm" },
          { label: "Max Depth", value: "30m" },
          { label: "Engine Power", value: "186 kW" },
          { label: "Feed Force", value: "32 kN" },
        ],
        description: "Hydraulic drill rig for open-pit and quarry operations.",
        available: true,
      },
    ],
  },
  {
    machineType: "truck",
    category: "truck",
    label: "Truck",
    image: "/category/7th.png",
    description:
      "Heavy-duty construction and mining trucks for material transport.",
    products: [
      {
        id: 1,
        name: "Dump Truck 30T",
        model: "DT-300",
        image: "/featured/below45.jfif",
        price: "$125,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Payload", value: "30T" },
          { label: "Engine Power", value: "336 kW" },
          { label: "Transmission", value: "Automatic 6-speed" },
          { label: "Body Volume", value: "18 m³" },
        ],
        description:
          "Heavy-duty dump truck for large-scale earthmoving and mining transport.",
        available: true,
      },
      {
        id: 2,
        name: "Articulated Dump Truck",
        model: "ADT-25",
        image: "/featured/90T.jpg",
        price: "$285,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Payload", value: "25T" },
          { label: "Engine Power", value: "261 kW" },
          { label: "Drive", value: "6x6 AWD" },
          { label: "Body Volume", value: "15 m³" },
        ],
        description:
          "Articulated dump truck for off-road haulage in rough terrain.",
        available: true,
      },
    ],
  },
  {
    machineType: "piling-machinery",
    category: "piling-machinery",
    label: "Piling Machinery",
    image: "/category/8th.png",
    description:
      "Advanced piling equipment for foundation construction projects.",
    products: [
      {
        id: 1,
        name: "Hydraulic Piling Rig",
        model: "PR-280",
        image: "/featured/below45.jfif",
        price: "$550,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Max Torque", value: "280 kN·m" },
          { label: "Max Drilling Depth", value: "60m" },
          { label: "Drill Diameter", value: "800–2500mm" },
          { label: "Engine Power", value: "298 kW" },
        ],
        description:
          "High-torque rotary piling rig for bored pile construction.",
        available: true,
      },
    ],
  },
  {
    machineType: "fire-fighting",
    category: "fire-fighting",
    label: "Fire-fighting Equipment",
    image: "/category/9th.png",
    description:
      "Specialized fire-fighting vehicles and equipment for industrial use.",
    products: [
      {
        id: 1,
        name: "Airport Fire Truck",
        model: "AFT-8000",
        image: "/featured/below45.jfif",
        price: "$620,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Water Tank", value: "8,000L" },
          { label: "Foam Tank", value: "1,000L" },
          { label: "Pump Flow Rate", value: "6,000 L/min" },
          { label: "Engine Power", value: "600 kW" },
        ],
        description:
          "ARFF vehicle designed for rapid emergency response at airports.",
        available: true,
      },
    ],
  },
  {
    machineType: "mobile-crusher",
    category: "mobile-crusher",
    label: "Mobile Crusher",
    image: "/category/10th.png",
    description:
      "Track-mounted mobile crushing and screening solutions for quarrying.",
    products: [
      {
        id: 1,
        name: "Mobile Jaw Crusher",
        model: "MJC-110",
        image: "/featured/below45.jfif",
        price: "$380,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Feed Opening", value: "1,100 x 700mm" },
          { label: "Output Capacity", value: "400 T/h" },
          { label: "Engine Power", value: "280 kW" },
          { label: "Weight", value: "47,000 kg" },
        ],
        description:
          "Track-mounted mobile jaw crusher for primary crushing of rock.",
        available: true,
      },
      {
        id: 2,
        name: "Mobile Cone Crusher",
        model: "MCC-300",
        image: "/featured/90T.jpg",
        price: "$420,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Feed Size", value: "≤ 215mm" },
          { label: "Output Capacity", value: "300 T/h" },
          { label: "Engine Power", value: "315 kW" },
          { label: "Cone Diameter", value: "1,300mm" },
        ],
        description:
          "Mobile cone crusher for secondary and tertiary crushing applications.",
        available: true,
      },
    ],
  },
  {
    machineType: "hydrogen-energy",
    category: "hydrogen-energy",
    label: "Hydrogen Energy",
    image: "/category/11th.png",
    description:
      "Next-generation hydrogen-powered construction machinery for zero-emission sites.",
    products: [
      {
        id: 1,
        name: "Hydrogen Fuel Cell Excavator",
        model: "HFE-200",
        image: "/featured/below45.jfif",
        price: "$320,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Operating Weight", value: "20,000 kg" },
          { label: "Fuel Cell Power", value: "80 kW" },
          { label: "H₂ Tank Capacity", value: "10 kg" },
          { label: "Working Hours", value: "8h per fill" },
        ],
        description:
          "Zero-emission hydrogen fuel cell excavator for green construction sites.",
        available: true,
      },
    ],
  },
  {
    machineType: "petroleum-equipment",
    category: "petroleum-equipment",
    label: "Petroleum Equipment",
    image: "/category/12th.png",
    description:
      "Oil and gas field equipment for drilling, extraction, and processing.",
    products: [
      {
        id: 1,
        name: "Oil Drilling Rig",
        model: "ODR-2000",
        image: "/featured/below45.jfif",
        price: "On Request",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Drill Depth", value: "2,000m" },
          { label: "Hook Load", value: "900 kN" },
          { label: "Engine Power", value: "550 kW" },
          { label: "Mast Height", value: "42m" },
        ],
        description:
          "Truck-mounted oil drilling rig for onshore exploration projects.",
        available: true,
      },
      {
        id: 2,
        name: "Workover Rig",
        model: "WOR-600",
        image: "/featured/90T.jpg",
        price: "$890,000",
        condition: "New",
        year: 2024,
        specs: [
          { label: "Hook Load", value: "600 kN" },
          { label: "Mast Height", value: "32m" },
          { label: "Engine Power", value: "336 kW" },
          { label: "Drawworks Power", value: "300 kW" },
        ],
        description:
          "Mobile workover rig for well servicing and production operations.",
        available: true,
      },
    ],
  },
];

// Helper: find category info by slug
export function getCategoryInfo(category: string): CategoryInfo | undefined {
  return categoryData.find((c) => c.category === category);
}

// Helper: find single product
export function getProduct(
  category: string,
  id: number
): CategoryProduct | undefined {
  const cat = getCategoryInfo(category);
  return cat?.products.find((p) => p.id === id);
}