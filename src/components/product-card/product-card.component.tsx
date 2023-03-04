// Import Link
import { Link } from 'react-router-dom';

// Import components
import FavouritesButton from '../favourites-button/favourites-button.component';
import CommentCountIcon from '../commentCountIcon/commentCountIcon.component';
import UserBeerIcon from '../user-beer-icon/user-beer-icon.cmponent';

// Import types
import { ProductsTypes } from '../../@types/products';

// Import syles
import './product-card.style.scss';

type ProductCardProps = {
  product: ProductsTypes;
};

const ProductCard = ({ product }: ProductCardProps) => {
  // Desturucture
  const { name, tagline, image_url } = product;

  return (
    <div className='product-card-container'>
      <Link to={`/details/${product.id}`}>
        <div className='icons-left'>
          <CommentCountIcon product={product} />
          {product.createdByUser && <UserBeerIcon />}
        </div>

        <div
          className='image'
          style={{ backgroundImage: `url(${image_url})` }}
        />
        <div className='footer'>
          <span className='name'>{name}</span>
          <span className='first-brewed'>
            First brewed: {product.first_brewed}
          </span>
          <span className='tagline'>{tagline}</span>
        </div>
      </Link>
      <FavouritesButton product={product} />
    </div>
  );
};

export default ProductCard;
