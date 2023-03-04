import { SetStateAction, Dispatch } from 'react';

// Import styles
import './filter.style.scss';

// Import components
import Button from '../button/button.component';

// types
type FilterProps = {
  setActiveFilter: Dispatch<SetStateAction<'all' | 'createdByUser'>>;
  activeFilter: 'all' | 'createdByUser';
  allProductsLength: number;
  ownProductsLength: number;
  checkOwnProducts: number;
};

const Filter = ({
  setActiveFilter,
  activeFilter,
  allProductsLength,
  ownProductsLength,
  checkOwnProducts,
}: FilterProps) => {
  const handleSetFilter = (filter: 'all' | 'createdByUser') => {
    setActiveFilter(filter);
  };

  // Check for own products if empty
  if (checkOwnProducts === 0 && activeFilter === 'createdByUser') {
    setActiveFilter('all');
    return (
      <div className='filter-container'>
        <Button
          className={`btn-filter active`}
          onClick={() => handleSetFilter('all')}
          disabled={true}
        >
          All beers ({allProductsLength})
        </Button>
      </div>
    );
  }

  return (
    <div className='filter-container'>
      <Button
        className={`btn-filter ${activeFilter === 'all' ? 'active' : ''}`}
        onClick={() => handleSetFilter('all')}
      >
        All beers ({allProductsLength})
      </Button>

      {checkOwnProducts > 0 && (
        <Button
          className={`btn-filter ${
            activeFilter === 'createdByUser' ? 'active' : ''
          }`}
          onClick={() => handleSetFilter('createdByUser')}
        >
          Own beers ({ownProductsLength})
        </Button>
      )}
    </div>
  );
};

export default Filter;
