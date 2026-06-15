export const productOptions = [
  { label: "Excavators", active: true },
  { label: "Cranes" },
  { label: "Earthmoving" },
  { label: "Mining" },
  { label: "Roadwork" },
  { label: "All products" },
];

export const caseStudies = [
  { title: "Large-scale earthmoving", country: "Bangladesh", project: "Regional infrastructure development", equipment: "90T excavator", image: "/featured/90T.jpg" },
  { title: "Heavy lifting at height", country: "United States", project: "Industrial construction", equipment: "All-terrain crane", image: "/featured/allcraine.avif" },
  { title: "Urban foundation excavation", country: "United Kingdom", project: "Commercial development", equipment: "45T excavator", image: "/featured/below45.jfif" },
  { title: "Tracked crane operation", country: "Germany", project: "Energy infrastructure", equipment: "Crawler crane", image: "/featured/crainetrack.avif" },
  { title: "High-output quarry excavation", country: "Australia", project: "Aggregate production", equipment: "Large excavator", image: "/featured/largeexcuvator.jpg" },
  { title: "Reliable power for demanding sites", country: "Indonesia", project: "Quarry expansion", equipment: "Heavy excavator fleet", image: "/images/image1.png" },
  { title: "Infrastructure built to last", country: "Malaysia", project: "Transport corridor", equipment: "Excavator and crane fleet", image: "/images/image2.png" },
];

export const footerColumns = [
  { title: "Products", links: ["Excavators", "Cranes", "Earthmoving", "Mining"] },
  { title: "Solutions", links: ["Construction", "Quarrying", "Roadwork", "Infrastructure"] },
  { title: "Support", links: ["Service", "Parts", "Training", "Warranty"] },
  { title: "Company", links: ["About", "News", "Careers", "Contact"] },
  { title: "Resources", links: ["Cases", "Downloads", "Dealer network", "FAQ"] },
];

// ─── New Cases Page Types ─────────────────────────────────────────────────────

export type ProductOption = {
  label: string;
  active?: boolean;
};

export type CaseStudy = {
  title: string;
  country: string;
  equipment: string;
  image: string;
  project?: string;
};

// ─── New Cases Page Data ──────────────────────────────────────────────────────

export const casesProductOptions: ProductOption[] = [
  { label: "Excavator", active: true },
  { label: "Concrete Machinery" },
  { label: "Hoisting Machinery" },
  { label: "Road Machinery" },
  { label: "Port Machinery" },
  { label: "Heavy Truck" },
];

export const casesStudies: CaseStudy[] = [
  {
    title: "Manair Mid Manair water reservoir (Dam)",
    country: "India",
    project: "Manair Mid Manair water reservoir (Dam)",
    equipment: "5 units of SY210C",
    image: "/images/cases-photos/case-hero.webp",
  },
  {
    title: "The tabular foundation of living areas",
    country: "USA",
    equipment: "SY235C",
    image: "/images/cases-photos/case-foundation.webp",
  },
  {
    title: "Infrastructure construction",
    country: "Turkey",
    equipment: "6 excavators",
    image: "/images/cases-photos/case-infrastructure.webp",
  },
  {
    title: "Maldives International",
    country: "Maldives",
    equipment: "SY215, SY235, SY335LR",
    image: "/images/cases-photos/case-maldives.webp",
  },
  {
    title: "Rio Olympic Park",
    country: "Brazil",
    equipment: "SY215C",
    image: "/images/cases-photos/case-rio.webp",
  },
  {
    title: "Dutch field construction",
    country: "Netherlands",
    equipment: "SY750H",
    image: "/images/cases-photos/case-dutch.webp",
  },
  {
    title: "Sri Lanka southern railway",
    country: "Sri Lanka",
    equipment: "SY365H, SY750H",
    image: "/images/cases-photos/case-railway.webp",
  },
];

export const buildSlides = [
  {
    title: "Hong Kong Zhuhai Macao Bridge",
    image: "/images/cases-photos/case-railway.webp",
    eyebrow: "Bridge erection",
  },
  {
    title: "Green Point Stabilization Works",
    image: "/images/cases-photos/case-dutch.webp",
    eyebrow: "Heavy-duty performance",
  },
  {
    title: "Maldives International",
    image: "/images/cases-photos/case-maldives.webp",
    eyebrow: "Marine logistics",
  },
  {
    title: "Rio Olympic Park",
    image: "/images/cases-photos/case-rio.webp",
    eyebrow: "Urban earthworks",
  },
];

export const casesFooterColumns = [
  {
    title: "Products",
    links: ["Concrete Machinery", "Excavator", "Crane", "Road Machinery", "Port Machinery", "Mining & Tunneling", "Truck"],
  },
  {
    title: "Solutions",
    links: ["Earthworks", "Urban Construction", "Mining", "Large Excavators", "Wind Farm Solutions"],
  },
  {
    title: "Cases",
    links: ["Excavator", "Concrete Machinery", "Hoisting Machinery", "Road Machinery", "Port Machinery"],
  },
  {
    title: "Service",
    links: ["Maintenance", "Parts", "Service Network", "Contact Support"],
  },
  {
    title: "About",
    links: ["About Us", "Milestones", "Leadership", "Innovation", "Sustainability", "Careers", "News"],
  },
];