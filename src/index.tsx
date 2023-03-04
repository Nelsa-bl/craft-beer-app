import ReactDOM from 'react-dom/client';

// Import React Router
import { BrowserRouter } from 'react-router-dom';

// Import providers
import { ProductProvider } from './context/product.context';
import { FavoriteProvider } from './context/favourites.context';
import { CommentsProvider } from './context/comment.context';

// Import styles
import './styles/index.scss';

//Import Components
import App from './App';

// Import WebVitals
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <CommentsProvider>
      <ProductProvider>
        <FavoriteProvider>
          <App />
        </FavoriteProvider>
      </ProductProvider>
    </CommentsProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
