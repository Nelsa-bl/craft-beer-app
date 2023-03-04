import { useCallback, ChangeEvent } from 'react';

// Import styling
import './sorting.style.scss';

// Types
export type SortingOption = {
  value: string;
  label: string;
};

export type SortBy = 'id' | 'year' | 'name';
export type SortOrder = 'asc' | 'desc';

type SortingProps = {
  options: SortingOption[];
  onChange: (sortBy: SortBy, sortOrder: SortOrder) => void;
};

const Sorting = ({ options, onChange }: SortingProps) => {
  const handleSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;

      switch (true) {
        case value.includes('name'):
          onChange('name', value.includes('-asc') ? 'asc' : 'desc');
          break;
        case value.includes('year'):
          onChange('year', value.includes('-asc') ? 'asc' : 'desc');
          break;
        default:
          onChange('id', 'asc');
      }
    },
    [onChange]
  );

  return (
    <div className='sorting-container'>
      <label htmlFor='sort-by-select'>Sort by:</label>
      <select id='sort-by-select' onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorting;
