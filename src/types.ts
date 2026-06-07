export interface Product {
  id: number;
  name: string;
  category: 'Dry Food' | 'Wet Food' | 'Treats';
  price: number;
  featured: boolean;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
