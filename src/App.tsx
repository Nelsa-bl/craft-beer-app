import { lazy, Suspense } from 'react';

// Import Routes
import { Routes, Route } from 'react-router-dom';

// Import compomnents
import Navigation from './routes/navigation/navigation.component';
import Spinner from './components/spinner/spinner.component';

// Lazy loaded components
const Home = lazy(() => import('./pages/home/home.component'));
const Details = lazy(() => import('./pages/details/details.component'));
const Favourites = lazy(
  () => import('./pages/favourites/favourites.component')
);
const AddProduct = lazy(
  () => import('./pages/add-product/add-product.component')
);

// Main
const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='details/:id' element={<Details />} />
          <Route path='favourites' element={<Favourites />} />
          <Route path='addproduct' element={<AddProduct />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
