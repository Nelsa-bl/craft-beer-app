export type ProductsTypes = {
  id: number;
  title: string;
  status: boolean;
  name: string;
  image_url: string;
  tagline: string;
  description: string;
  food_pairing: string[];
  amount: number;
  first_brewed: string;
  year: string;
  createdByUser?: boolean;
};
