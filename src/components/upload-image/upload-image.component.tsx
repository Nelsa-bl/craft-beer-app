import React, {
  DragEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

// Import components
import Button from '../button/button.component';
import WarningBox from '../warning-box/warning-box.component';
import {
  IMAGE_UPLOAD_MAX_SIZE,
  IMAGE_UPLOAD_MAX_SIZE_MESSAGE,
} from '../../utils/constants/constants';

// Import style
import './upload-image.style.scss';

type UploadImageProps = {
  imagePreview: string | undefined;
  setImagePreview: Dispatch<SetStateAction<string | undefined>>;
  setImageFile: Dispatch<SetStateAction<File | undefined>>;
};

const UploadImage = ({
  setImagePreview,
  setImageFile,
  imagePreview,
}: UploadImageProps) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // Helper function to handle image file selection
  const handleImageFileSelection = (
    file: File,
    setImagePreview: Dispatch<SetStateAction<string | undefined>>,
    setImageFile: Dispatch<SetStateAction<File | undefined>>,
    setErrorMessage: Dispatch<SetStateAction<string | undefined>>
  ) => {
    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      setErrorMessage(IMAGE_UPLOAD_MAX_SIZE_MESSAGE);
    } else if (file.type.startsWith('image/')) {
      setErrorMessage(undefined);
      setImageFile(file);
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setErrorMessage('File type is not supported. Please upload an image.');
    }
  };

  // Handle image drag and drop
  const handleImageDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  // Handle image drag and drop
  const handleImageDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    handleImageFileSelection(
      file,
      setImagePreview,
      setImageFile,
      setErrorMessage
    );
  };

  // Handle uplaod file btn
  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    selectedFile &&
      handleImageFileSelection(
        selectedFile,
        setImagePreview,
        setImageFile,
        setErrorMessage
      );
  };

  // Handle delete image
  const handleDeleteImage = () => {
    setImageFile(undefined);
    setImagePreview(undefined);
  };

  return (
    <>
      {imagePreview && (
        <div className='image-preview'>
          <img
            src={imagePreview}
            className='img-preview'
            alt='Product Preview'
          />
          <Button
            type='button'
            className='del-btn btn-small'
            onClick={handleDeleteImage}
          >
            Delete
          </Button>
        </div>
      )}

      {!imagePreview && (
        <div
          className='upload-image-box'
          onDrop={handleImageDrop}
          onDragOver={handleImageDragOver}
        >
          {errorMessage || 'Drag an image here to upload (Max size 1MB)'}
        </div>
      )}

      {!imagePreview && (
        <div>
          <span className='seperator'>or</span>
          <input
            style={{ height: '40px' }}
            type='file'
            accept='image/*'
            onChange={handleImageFileChange}
          />
          <span className='max-file-size-info'>(Max size 1MB)</span>
          {errorMessage && <WarningBox errorMessage={errorMessage} />}
        </div>
      )}
    </>
  );
};

export default UploadImage;
