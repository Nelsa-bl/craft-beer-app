import { useContext, useState, useCallback, useMemo, ChangeEvent } from 'react';

// Import Context
import { ProductsContext } from '../../context/product.context';

// Import components
import ProductList from '../../components/product-list/product-list.component';
import Search from '../../components/search/search.component';
import Spinner from '../../components/spinner/spinner.component';
import Filter from '../../components/filter/filter.component';
import Sorting, {
  SortingOption,
  SortBy,
  SortOrder,
} from '../../components/sorting/sorting.component';
// Custom useSessionStorage hook
import useSessionStorage from '../../utils/hooks/useSessionStorage';

// Import types
import { ProductsTypes } from '../../@types/products';

const Products = () => {
  // Product context
  const { products, isLoading } = useContext(ProductsContext);
  // State for shearching
  const [searchQuery, setSearchQuery] = useSessionStorage<string>(
    'searchQuery',
    ''
  );
  // Default sorting values
  const [sortBy, setSortBy] = useState<SortBy>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  // State for active filter
  const [activeFilter, setActiveFilter] = useSessionStorage<
    'all' | 'createdByUser'
  >('activeFilter', 'all');

  // Handle serach value
  const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter Products on search and filters
  const filteredProducts = useMemo(() => {
    return (
      products?.filter((product) => {
        return (
          (activeFilter === 'all' ||
            (activeFilter === 'createdByUser' &&
              product.createdByUser === true)) &&
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }) || []
    );
  }, [products, searchQuery, activeFilter]);

  // Sort products
  const sortedProducts: ProductsTypes[] = useMemo(() => {
    return filteredProducts?.slice()?.sort((a, b) => {
      let result = 0;

      if (sortBy === 'year') {
        const aDate = new Date(`01/${a.first_brewed}`);
        const bDate = new Date(`01/${b.first_brewed}`);

        if (sortOrder === 'desc') {
          result = Number(aDate) - Number(bDate);
        } else {
          result = Number(aDate) - Number(bDate);
        }
      } else if (sortBy === 'name') {
        result = a[sortBy]?.localeCompare(b[sortBy] ?? '');
      } else {
        const key = sortBy as keyof typeof a;
        result = Number(a[key]) - Number(b[key]);
      }

      return sortOrder === 'asc' ? result : -result;
    });
  }, [filteredProducts, sortBy, sortOrder]);

  // Options for dropdown sorting
  const options: SortingOption[] = [
    { value: 'id', label: 'Default' },
    { value: 'year-asc', label: 'Year (asc)' },
    { value: 'year-desc', label: 'Year (desc)' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
  ];

  // useCallback to handle new state
  const handleSort = useCallback((sortBy: SortBy, sortOrder: SortOrder) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  }, []);

  // Get all products length
  const allProductsLength = useMemo(() => {
    return (
      products?.filter((product) => {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase());
      }).length || 0
    );
  }, [products, searchQuery]);

  // Get own products length
  const ownProductsLength = useMemo(() => {
    return (
      filteredProducts?.filter((pro) => pro.createdByUser === true).length || 0
    );
  }, [filteredProducts]);

  const checkOwnProducts = useMemo(() => {
    return products.filter((pro) => pro.createdByUser === true).length;
  }, [products]);

  const handleReset = () => {
    // clear session storage
    sessionStorage.clear();
    // clear search query state
    setSearchQuery('');
    // set active filter to 'all'
    // setActiveFilter('all');
  };

  return (
    <>
      <Search
        searchQuery={searchQuery}
        handleSearchInputChange={handleSearchInputChange}
        onReset={handleReset}
      />
      <Filter
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
        allProductsLength={allProductsLength}
        ownProductsLength={ownProductsLength}
        checkOwnProducts={checkOwnProducts}
      />
      <Sorting options={options} onChange={handleSort} />
      {isLoading ? (
        <Spinner />
      ) : sortedProducts.length > 0 ? (
        <ProductList products={sortedProducts} />
      ) : (
        <p>No products found.</p>
      )}
    </>
  );
};

export default Products;
