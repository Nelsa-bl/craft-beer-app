// Import syle
import './warning-box.style.scss';

type WarningBoxProps = {
  errorMessage: string;
};

const WarningBox = ({ errorMessage }: WarningBoxProps) => {
  return <div className='warning-container'>{errorMessage}</div>;
};

export default WarningBox;
