// Import Context
import { useContext } from 'react';

// Import contex
import { FavoriteContext } from '../../context/favourites.context';

// import components
import ProductList from '../../components/product-list/product-list.component';

const Favourites = () => {
  const { favoriteItem } = useContext(FavoriteContext);
  return (
    <>
      <h2>Favourites</h2>
      <ProductList products={favoriteItem} />
    </>
  );
};

export default Favourites;
