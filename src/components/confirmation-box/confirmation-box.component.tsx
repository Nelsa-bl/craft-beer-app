import { useEffect } from 'react';

// Import style
import './confirmation-box.style.scss';

type ConfirmationProps = {
  message: string;
  type: 'added' | 'edited' | 'deleted';
  setConfirmationMessage: React.Dispatch<
    React.SetStateAction<{
      message: string;
      type: 'added' | 'edited' | 'deleted';
    } | null>
  >;
};

const ConfirmationBox = ({
  message,
  type,
  setConfirmationMessage,
}: ConfirmationProps) => {
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (message) {
      timer = setTimeout(() => {
        setConfirmationMessage(null);
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [message, setConfirmationMessage]);

  return (
    <div className={`confirmation-box ${type}`}>
      {message}
      <span className='in'></span>
    </div>
  );
};

export default ConfirmationBox;
