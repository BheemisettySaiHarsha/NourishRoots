export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  ingredients: string[];
  bestseller: boolean;
  dateAdded: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface FilterState {
  categories: string[];
  ingredients: string[];
  priceRange: [number, number];
}