export interface Book {
  id?: string;
  title: string;
  author: string;
  coverUrl: string;
  epubUrl: string;
  description: string;
  slug?: string;
  url?: string;
  total_rating?: number;
  total_rates?: number;
  rating?: number;
  views?: number;
  paid: boolean;
  price?: number;
  comments?: any[];
  createdAt?: string;
  updatedAt?: string;
}
