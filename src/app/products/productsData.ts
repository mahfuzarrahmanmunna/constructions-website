export interface Product {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  model: string;
  brochure?: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Crawler Crane",
    category: "Heavy Equipment",
    model: "CC-500",
    image: "/images/products/crane.jpg",
    description:
      "Heavy lifting crawler crane for bridge and industrial projects.",
  },

  {
    id: 2,
    title: "Excavator",
    category: "Earth Moving",
    model: "EX-220",
    image: "/images/products/excavator.jpg",
    description:
      "High performance hydraulic excavator for construction works.",
  },

  {
    id: 3,
    title: "Concrete Pump",
    category: "Concrete Equipment",
    model: "CP-120",
    image: "/images/products/pump.jpg",
    description:
      "Efficient concrete pumping for high-rise construction.",
  },

  {
    id: 4,
    title: "Boom Lift",
    category: "Access Equipment",
    model: "BL-80",
    image: "/images/products/boomlift.jpg",
    description:
      "Safe elevated access solution for industrial projects.",
  },
];