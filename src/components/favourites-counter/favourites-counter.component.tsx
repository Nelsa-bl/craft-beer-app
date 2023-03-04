// Import Context
import { useContext } from 'react';
import { FavoriteContext } from '../../context/favourites.context';

const FavouritesCounter = () => {
  const { favoriteItem } = useContext(FavoriteContext);
  const total = favoriteItem.length;
  return (
    <span style={{ position: 'absolute', marginLeft: '3px' }}>
      {total ? `(${total})` : ''}
    </span>
  );
};

export default FavouritesCounter;
