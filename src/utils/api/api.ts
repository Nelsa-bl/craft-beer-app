// Import types
import { ProductsTypes } from '../../@types/products';

// Import constants
import { API_URL } from '../constants/constants';

export async function getProducts(): Promise<ProductsTypes[]> {
  const getProductsFromAPI = await fetch(API_URL);
  if (!getProductsFromAPI.ok) {
    throw new Error(
      `Problem getting products. Status: ${getProductsFromAPI.status}`
    );
  }
  const data = await getProductsFromAPI.json();
  return data;
}
