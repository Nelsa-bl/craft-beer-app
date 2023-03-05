import {
  useContext,
  useState,
  MouseEventHandler,
  ChangeEventHandler,
} from 'react';

import { useNavigate } from 'react-router-dom';

// Import components
import FavouritesButton from '../favourites-button/favourites-button.component';
import Comments from '../comments/comments.component';
import Button from '../button/button.component';
import UserBeerIcon from '../user-beer-icon/user-beer-icon.cmponent';
import FoodPairings from '../food-pairings/food-pairings.component';
import UploadImage from '../upload-image/upload-image.component';
import ConfirmationBox from '../confirmation-box/confirmation-box.component';
import ConfirmationModal from '../confimation-modal/confimation-modal.comonent';
import WarningBox from '../warning-box/warning-box.component';

import { DEFAULT_IMAGE_URL } from '../../utils/constants/constants';

// Import Types
import { ProductsTypes } from '../../@types/products';

// Import context
import { ProductsContext } from '../../context/product.context';
import { FavoriteContext } from '../../context/favourites.context';
import { CommentsContext } from '../../context/comment.context';

// Import style
import './product-details.style.scss';

// Types
type ProductDetailsProps = {
  product: ProductsTypes;
};

type ProductFormData = {
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  food_pairing: string;
  first_brewed: string;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { removeProduct, editProduct } = useContext(ProductsContext);
  const { removeFavorite, updateFavourite } = useContext(FavoriteContext);
  const { comments, deleteComment } = useContext(CommentsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [foodPairingValues, setFoodPairingValues] = useState<string[]>(
    product.food_pairing
  );
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    product.image_url
  );
  const [confirmationMessage, setConfirmationMessage] = useState<{
    message: string;
    type: 'added' | 'edited' | 'deleted';
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState<ProductFormData>({
    name: product.name,
    tagline: product.tagline,
    description: product.description,
    image_url: product.image_url,
    food_pairing: product.food_pairing.join(', '),
    first_brewed: product.first_brewed,
  });

  // Default image
  const defaultImageUrl = DEFAULT_IMAGE_URL;

  // Handle input change
  const handleInputChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData: ProductFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle Submit
  const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    // If the form is invalid, return and do not submit
    const form = event.currentTarget.form;
    if (!form || !form.checkValidity()) {
      return;
    }

    // Update product
    const updatedProduct = {
      ...product,
      ...formData,
      food_pairing: foodPairingValues,
      image_url: imagePreview || defaultImageUrl,
    };

    editProduct(updatedProduct);
    setIsEditing(false);
    updateFavourite(updatedProduct);
    setConfirmationMessage({ message: 'Beer edited', type: 'added' });
  };

  // Handle edit product
  const handleEditProduct: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  // Handle Cancel
  const handleCancelEdit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    setFormData({
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      image_url: product.image_url,
      food_pairing: product.food_pairing.join(', '),
      first_brewed: product.first_brewed,
    });
    setIsEditing(false);
    setFormSubmitted(false);
  };

  // Delete all comments
  const deleteAllProductComments = () => {
    const productComments = comments.filter(
      (comment) => comment.productId === product.id
    );
    productComments.forEach((comment) => deleteComment(comment.id));
  };

  // Handle delete product
  const handleRemoveProduct: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    removeProduct(product);
    removeFavorite(product);
    deleteAllProductComments();
    setIsModalOpen(false);

    navigateToHome();
  };

  const navigate = useNavigate();

  // Navigate to home
  const navigateToHome = () => {
    navigate('/');
  };

  // Render the error message when the form is submitted and the name field is empty
  const isNameInvalid = formSubmitted && formData.name.trim() === '';

  return (
    <div className='details-container'>
      {!isEditing && (
        <>
          <div className='details-container-image'>
            <div className='product-image'>
              <img src={product?.image_url} alt={product?.name} />
            </div>
          </div>
        </>
      )}

      <div className='product-container-info'>
        {!isEditing && (
          <>
            <h2>{product?.name}</h2>
            <div className='icons-box'>
              {product.createdByUser && <UserBeerIcon />}
              <FavouritesButton product={product} />
            </div>
            <span className='tagline'>{product?.tagline}</span>
            <span className='description'>{product?.description}</span>
            <span className='first-brewed'>
              <span>First brewed:</span>
              {product?.first_brewed}
            </span>
            <div className='extra-info'>
              <p className='food-parings'>Food Pairing</p>
              {product?.food_pairing.map((el, index) => (
                <span className='info' key={index}>
                  {el}
                </span>
              ))}
            </div>
            <div className='comment-section'>
              <h3>Comments</h3>
              <Comments product={product} />
            </div>
          </>
        )}

        {isEditing && (
          <>
            <form className='edit-product-form'>
              <h2>Edit Product</h2>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                name='name'
                className={isNameInvalid ? 'error' : ''}
                required
                placeholder='Name of the beer'
                value={formData.name}
                onChange={handleInputChange}
              />
              {isNameInvalid && (
                <WarningBox errorMessage='Please enter a name' />
              )}
              <label htmlFor='tagline'>Tagline:</label>
              <input
                type='text'
                id='tagline'
                name='tagline'
                placeholder='Slogan for the beer'
                value={formData.tagline}
                onChange={handleInputChange}
              />
              <label htmlFor='description'>Description:</label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                placeholder='Write a description...'
                onChange={handleInputChange}
              ></textarea>
              <label style={{ marginBottom: '20px' }} htmlFor='image_url'>
                Image:
              </label>
              <UploadImage
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                setImageFile={setImageFile}
              />
              <label style={{ marginBottom: '20px' }} htmlFor='food_pairing'>
                Food Pairing:
              </label>
              <FoodPairings
                foodPairingValues={foodPairingValues}
                setFoodPairingValues={setFoodPairingValues}
              />
              <label htmlFor='first_brewed'>First brewed:</label>
              <input
                type='text'
                id='first_brewed'
                name='first_brewed'
                placeholder='mm/yyyy'
                value={formData.first_brewed}
                onChange={handleInputChange}
              />

              <Button className='cancel-btn' onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button
                className='save-btn'
                style={{ marginLeft: '5px' }}
                onClick={handleFormSubmit}
              >
                Save
              </Button>
            </form>
          </>
        )}
        {product.createdByUser && (
          <>
            {!isEditing && (
              <>
                <Button className='edit-beer-btn' onClick={handleEditProduct}>
                  Edit this beer
                </Button>
                <Button
                  className='del-beer-btn'
                  onClick={() => setIsModalOpen(true)}
                >
                  Delete this beer
                </Button>
              </>
            )}
          </>
        )}
      </div>
      {confirmationMessage && (
        <ConfirmationBox
          message={confirmationMessage.message}
          type={confirmationMessage.type}
          setConfirmationMessage={setConfirmationMessage}
        />
      )}
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleRemoveProduct}
          title='Are you sure you want to delete this beer?'
        />
      )}
    </div>
  );
};

export default ProductDetails;
