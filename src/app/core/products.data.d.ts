export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  color: string;
  image: string;
  images: string[];
  desc: string;
}

export const PRODUCTS: Product[];
export const SIZES: string[];
