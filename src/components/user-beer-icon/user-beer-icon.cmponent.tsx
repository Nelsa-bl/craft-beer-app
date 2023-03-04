// Import styles
import './user-beer-icon.style.scss';

// Import logo
import Logo from '../../assets/logo.png';

const UserBeerIcon = () => {
  return (
    <div className='user-beer-icon'>
      <img src={Logo} alt='logo-icon' />
    </div>
  );
};

export default UserBeerIcon;
