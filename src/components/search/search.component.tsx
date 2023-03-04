import { ChangeEvent } from 'react';

// Imort components
import Button from '../button/button.component';

// Import styles
import './search.style.scss';

type SearchProps = {
  searchQuery: string;
  handleSearchInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
};

const Search = ({
  searchQuery,
  handleSearchInputChange,
  onReset,
}: SearchProps) => {
  return (
    <div className='search-container'>
      <input
        type='search'
        placeholder='Search by name'
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      {searchQuery && (
        <Button className='reset-btn' onClick={onReset}>
          Reset
        </Button>
      )}
    </div>
  );
};

export default Search;
