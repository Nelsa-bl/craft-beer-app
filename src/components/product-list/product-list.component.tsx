// Import components
import ProductCard from '../product-card/product-card.component';

// Import Types
import { ProductsTypes } from '../../@types/products';

// Import style
import './product-list.style.scss';

type ProductListProps = {
  products: ProductsTypes[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className='products-container'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
