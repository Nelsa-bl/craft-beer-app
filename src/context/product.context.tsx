import { createContext, useState, useEffect, ReactNode } from 'react';

// Import Types
import { ProductsTypes } from '../@types/products';

// Import products
import { getProducts } from '../utils/api/api';

// Import localstorage
import useLocalStorage from '../utils/hooks/useLocalStorage';

// types
type ProductsContextType = {
  products: ProductsTypes[];
  isLoading: boolean;
  addProduct: (product: ProductsTypes) => void;
  removeProduct: (productToRemove: ProductsTypes) => void;
  editProduct: (productToUpdate: ProductsTypes) => void;
};

type ProductProviderProps = {
  children: ReactNode;
};

// Context
export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  isLoading: false,
  addProduct: () => {},
  removeProduct: () => {},
  editProduct: () => {},
});

// Provider
export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<ProductsTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Using a custom hook for useLocalStorage
  const [myProducts, setMyProducts] = useLocalStorage<ProductsTypes[]>(
    'userAddedProduct',
    []
  );

  // Get Products
  useEffect(() => {
    const getProductsMap = async () => {
      try {
        setIsLoading(true);
        const data = await getProducts();
        setIsLoading(false);
        setProducts(data);
      } catch (err) {
        // If error then show message
        let message;
        if (err instanceof Error) message = err.message;
        else message = String(err);
        // we'll proceed, but let's report it
        reportError({ message });
      }
    };
    getProductsMap();
  }, []);

  // Add Product
  const addProduct = (product: ProductsTypes) => {
    setMyProducts([...myProducts, product]);
  };

  // Remove Product
  const removeProduct = (productToRemove: ProductsTypes) => {
    setMyProducts((prevProducts) =>
      prevProducts.filter((myProducts) => myProducts.id !== productToRemove.id)
    );
  };

  // Edit product
  const editProduct = (productToUpdate: ProductsTypes) => {
    const updatedProducts = [...myProducts];
    const index = updatedProducts.findIndex(
      (product) => product.id === productToUpdate.id
    );
    if (index !== -1) {
      updatedProducts[index] = productToUpdate;
      setMyProducts(updatedProducts);
    }
  };

  // Created by user
  const allProducts = [...products, ...myProducts].map((product) =>
    product.createdByUser ? product : { ...product, createdByUser: false }
  );

  const value: ProductsContextType = {
    products: allProducts,
    addProduct,
    removeProduct,
    isLoading,
    editProduct,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
