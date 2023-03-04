// Import Context
import { useContext } from 'react';
import { FavoriteContext } from '../../context/favourites.context';

// Import types
import { ProductsTypes } from '../../@types/products';

// Import styles
import './favourites-button.style.scss';

type FavouritesButtonProps = {
  product: ProductsTypes;
};

const FavouritesButton = ({ product }: FavouritesButtonProps) => {
  const { addFavorite, removeFavorite, favoriteItem } =
    useContext(FavoriteContext);
  const isFavourite =
    favoriteItem &&
    favoriteItem.map((el) => el.id.toString()).includes(product.id.toString());

  return (
    <span
      className='fav-icon'
      onClick={() => {
        if (isFavourite) {
          removeFavorite(product);
        } else {
          addFavorite(product);
        }
      }}
    >
      {isFavourite ? '❤️' : '🤍'}
    </span>
  );
};

export default FavouritesButton;
