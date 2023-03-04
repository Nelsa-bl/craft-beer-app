// Import Routes
import { Outlet, Link } from 'react-router-dom';

// Import components
import FavouritesCounter from '../../components/favourites-counter/favourites-counter.component';

// Import logo
import Logo from '../../assets/logo.png';

// Import add beer icon
import AddBeerIcon from '../../assets/add-icon.png';

// import style
import './navigation.style.scss';

const Navigation = () => {
  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <img src={Logo} alt='logo' className='logo' />
          <span className='logo-name'>Craft beers</span>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link home-link' to='/'>
            Home
          </Link>
          <Link className='nav-link' to='/favourites'>
            Favorites <FavouritesCounter />
          </Link>
          <Link className='nav-link' to='/addproduct' title='Add a new beer'>
            <img src={AddBeerIcon} className='add-beer-icon' alt='icon' />
            <span className='add-beer-link'>Add a new beer</span>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
