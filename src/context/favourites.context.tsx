import { createContext, ReactNode, useMemo, useCallback } from 'react';

// Import localStorage
import useLocalStorage from '../utils/hooks/useLocalStorage';

// Import types
import { ProductsTypes } from '../@types/products';

type FavoriteItem = ProductsTypes;

type FavoriteContextType = {
  favoriteItem: FavoriteItem[];
  addFavorite: (productToAdd: ProductsTypes) => void;
  removeFavorite: (favoriteItemToRemove: FavoriteItem) => void;
  updateFavourite: (productToUpdate: ProductsTypes) => void;
  favoriteCount: number;
};

type FavoriteProviderProps = {
  children: ReactNode;
};

// Add
const addFavoriteItem = (
  favoriteItem: FavoriteItem[],
  productToAdd: ProductsTypes
) => {
  const existingFavoriteItem = favoriteItem.find(
    (favoriteItem) => favoriteItem.id === productToAdd.id
  );

  if (existingFavoriteItem) {
    return favoriteItem.map((favoriteItem) =>
      favoriteItem.id === productToAdd.id ? { ...favoriteItem } : favoriteItem
    );
  }

  return [...favoriteItem, { ...productToAdd }];
};

// Remove
const removeFavoriteItem = (
  favoriteItem: FavoriteItem[],
  favoriteItemToRemove: FavoriteItem
) => {
  const existingFavoriteItem = favoriteItem.find(
    (favoriteItem) => favoriteItem.id === favoriteItemToRemove.id
  );

  if (existingFavoriteItem) {
    return favoriteItem.filter(
      (favoriteItem) => favoriteItem.id !== favoriteItemToRemove.id
    );
  }

  return favoriteItem.map((favoriteItem) =>
    favoriteItem.id === favoriteItemToRemove.id
      ? { ...favoriteItem }
      : favoriteItem
  );
};

// Update
const updateFavoriteItem = (
  favoriteItem: FavoriteItem[],
  productToUpdate: ProductsTypes
) => {
  const existingFavoriteItem = favoriteItem.find(
    (favoriteItem) => favoriteItem.id === productToUpdate.id
  );

  if (existingFavoriteItem) {
    return favoriteItem.map((favoriteItem) =>
      favoriteItem.id === productToUpdate.id
        ? { ...favoriteItem, ...productToUpdate }
        : favoriteItem
    );
  }

  return favoriteItem;
};

// Context
export const FavoriteContext = createContext<FavoriteContextType>({
  favoriteItem: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  updateFavourite: () => {},
  favoriteCount: 0,
});

// FavoriteProvider
export const FavoriteProvider = ({ children }: FavoriteProviderProps) => {
  // Using a custom hook for useLocalStorage
  const [favoriteItem, setFavoritesItem] = useLocalStorage<FavoriteItem[]>(
    'favouritesItems',
    []
  );

  // useEffect(() => {
  //   const items = JSON.parse(
  //     localStorage.getItem('items') || '[]'
  //   ) as FavoriteItem[];
  //   if (items) {
  //     setFavoritesItem(items);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('items', JSON.stringify(favoriteItem));
  // }, [favoriteItem]);

  // Add Favourites
  const addFavorite = (productToAdd: ProductsTypes) => {
    setFavoritesItem(addFavoriteItem(favoriteItem, productToAdd));
  };

  // Remove Favourite
  const removeFavorite = (favoriteItemToRemove: FavoriteItem) => {
    setFavoritesItem(removeFavoriteItem(favoriteItem, favoriteItemToRemove));
  };

  // Update Favourite
  const updateFavourite = useCallback(
    (productToUpdate: ProductsTypes) => {
      setFavoritesItem((prevFavorites) =>
        updateFavoriteItem(prevFavorites, productToUpdate)
      );
    },
    [setFavoritesItem]
  );

  // Count
  const favoriteCount = useMemo(
    () => favoriteItem.reduce((count, item) => count + item.amount, 0),
    [favoriteItem]
  );

  const value = {
    addFavorite,
    removeFavorite,
    favoriteItem,
    favoriteCount,
    updateFavourite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
