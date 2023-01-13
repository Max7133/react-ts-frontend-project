import { CategoryInterface } from './categoryInterface';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: CategoryInterface;
  images: string[];
}

export interface AddProduct {
  title: string;
  description: string;
  price: number;
  categoryId: number;
  images: string[];
}

export interface EditProduct {
  id: number;
  update: Partial<Product>;
}

export interface CreateFormForProduct {
  images: File[];
  product: AddProduct;
}
