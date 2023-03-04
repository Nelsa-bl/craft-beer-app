// Import components
import AddProductForm from '../../components/add-product-form/add-product-form.component';

// Import styles
import './add-product.style.scss';

const AddProduct = () => {
  return (
    <div className='add-product-container'>
      <h2>Add a new beer</h2>
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
