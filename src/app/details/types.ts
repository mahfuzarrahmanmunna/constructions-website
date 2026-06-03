export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  specs: ProductSpec[];
  models: string[];
}

export interface Service {
  name: string;
  icon: React.ReactNode;
}
