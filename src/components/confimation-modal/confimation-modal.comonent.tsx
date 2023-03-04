import { MouseEventHandler } from 'react';

// Import components
import Button from '../button/button.component';

// Import styles
import './confimation-modal.style.scss';

type ConfirmationModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  title: string;
};

const ConfirmationModal = ({
  isOpen,
  onCancel,
  onConfirm,
  title,
}: ConfirmationModalProps) => {
  return (
    <>
      {isOpen && (
        <div className='modal confirmation-container'>
          <div className='modal-content'>
            <p>{title}</p>
            <div className='modal-buttons'>
              <Button className='delte-btn' onClick={onConfirm}>
                YES
              </Button>
              <Button className='cancel-btn' onClick={onCancel}>
                NO
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
