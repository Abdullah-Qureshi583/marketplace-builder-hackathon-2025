export type Product = {
  category: string;
  description: string | null;
  discountPercentage: number;
  image: any;
  isFeaturedProduct: boolean;
  name: string;
  price: number;
  stockLevel: number;
  id: string;
  // for detialization
  rating?: number;
  tags?: string[];
};




export interface CartItemProps {
  name: string;
  price: number;
  description: string;
  image: any;
  currency: string;
  id: string;
}