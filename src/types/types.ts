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

export interface ButtonProps {
  buttonText: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface SpinnerProps {
  color?: string,
  size?: number
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface DiscountCardProps {
  title: string;
  discount: string;
  description: string;
  image: string;
  bgColor: string;
  link: string;
}