export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  location: string;
  type: string;
  colors: string[];
  sizes: string[];
  category: string;
  finishType: 'Readymade' | 'Unpolished';
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface RoomCategory {
  name: string;
  products: number;
  image: string;
  link: string;
}