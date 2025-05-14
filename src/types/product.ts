export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  rating: number;
  inStock: boolean;
  featured?: boolean;
  colors?: string[];
  sizes?: string[];
};

export type Category = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};