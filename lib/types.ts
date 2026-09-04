export type Product = {
  id: string;
  name: string;
  category: "Men" | "Women" | "Kids" | "Beauty";
  subcategory: string;
  price: number;
  salePrice: number;
  rating: number;
  sizes: string[];
  colors: string[];
  description: string;
  stock: number;
  image?: string;
  images?: string[];
  tone: "dark" | "light";
};

export type CartItem = {
  productId: string;
  size: string;
  color: string;
  qty: number;
};

export type Order = {
  id: string;
  userEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  address: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
};

export type User = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};
