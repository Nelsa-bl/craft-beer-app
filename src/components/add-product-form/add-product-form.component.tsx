import React, { useRef, useContext, FormEvent, useState } from 'react';

// Import product context
import { ProductsContext } from '../../context/product.context';

// Import components
import ConfirmationBox from '../confirmation-box/confirmation-box.component';
import UploadImage from '../upload-image/upload-image.component';
import Button from '../button/button.component';
import FoodPairings from '../food-pairings/food-pairings.component';

// Import types
import { ProductsTypes } from '../../@types/products';

import { DEFAULT_IMAGE_URL } from '../../utils/constants/constants';

// Import styles
import './add-product-form.style.scss';

const AddProductForm = () => {
  const nameValue = useRef<HTMLInputElement>(null);
  const taglineValue = useRef<HTMLInputElement>(null);
  const descriptionValue = useRef<HTMLTextAreaElement>(null);
  const firstBrewedValue = useRef<HTMLInputElement>(null);
  const [foodPairingValues, setFoodPairingValues] = useState<string[]>(['']);
  const [confirmationMessage, setConfirmationMessage] = useState<{
    message: string;
    type: 'added' | 'edited' | 'deleted';
  } | null>(null);

  const { addProduct } = useContext(ProductsContext);

  // Image preview
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  // Default image
  const defaultImageUrl = DEFAULT_IMAGE_URL;

  // Handle submit
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmationMessage({ message: 'Beer added', type: 'added' });

    const newProduct: ProductsTypes = {
      id: Date.now(),
      name: nameValue.current?.value ?? '',
      status: false,
      title: '',
      image_url: imagePreview || defaultImageUrl,
      tagline: taglineValue.current?.value ?? '',
      description: descriptionValue.current?.value ?? '',
      food_pairing: foodPairingValues,
      amount: 0,
      first_brewed: firstBrewedValue.current?.value ?? '',
      year: '',
      createdByUser: true,
    };

    // Add the new product
    addProduct(newProduct);

    // reset the form inputs
    resetInputValues();
  };

  // Reset all the fields
  const resetInputValues = () => {
    if (nameValue.current) nameValue.current.value = '';
    if (taglineValue.current) taglineValue.current.value = '';
    if (descriptionValue.current) descriptionValue.current.value = '';
    setFoodPairingValues(['']);
    if (firstBrewedValue.current) firstBrewedValue.current.value = '';
    setImagePreview(undefined);
  };

  return (
    <>
      <form className='add-product-form' onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            placeholder='Name of the beer'
            required
            type='text'
            ref={nameValue}
          />
        </label>
        <label>
          Tagline:
          <input
            placeholder='Slogan for the beer'
            type='text'
            ref={taglineValue}
          />
        </label>
        <label>
          Description:
          <textarea
            rows={4}
            cols={40}
            ref={descriptionValue}
            placeholder='Write a description...'
            className='comment-field'
          />
        </label>
        <UploadImage
          setImagePreview={setImagePreview}
          setImageFile={setImageFile}
          imagePreview={imagePreview}
        />
        <FoodPairings
          foodPairingValues={foodPairingValues}
          setFoodPairingValues={setFoodPairingValues}
        />
        <label>
          First Brewed:
          <input placeholder='mm/yyyy' type='text' ref={firstBrewedValue} />
        </label>
        <Button className='submit-new-btn' type='submit'>
          Add Product
        </Button>
      </form>
      {confirmationMessage && (
        <ConfirmationBox
          message={confirmationMessage.message}
          type={confirmationMessage.type}
          setConfirmationMessage={setConfirmationMessage}
        />
      )}
    </>
  );
};

export default AddProductForm;
