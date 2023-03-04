import {
  ButtonHTMLAttributes,
  ReactNode,
  CSSProperties,
  MouseEventHandler,
} from 'react';

// Import style
import './button.style.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ children, ...otherProps }: ButtonProps) => {
  return (
    <button className='btn-small' {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
