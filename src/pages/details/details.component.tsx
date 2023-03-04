// Import Context
import { useContext } from 'react';

// Import ProductContext
import { ProductsContext } from '../../context/product.context';

// Import useParams
import { useParams } from 'react-router-dom';

// Import components
import ProductDetails from '../../components/product-details/product-details.component';
import Spinner from '../../components/spinner/spinner.component';

const Details = () => {
  const { products, isLoading } = useContext(ProductsContext);

  // Get id from URL
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  // Guard check
  if (!product && !isLoading) {
    return <div className='details-container'>Product not found</div>;
  }
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : product ? (
        <ProductDetails product={product} />
      ) : null}
    </>
  );
};

export default Details;
