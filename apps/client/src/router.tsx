import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@components/pages/home';
import CreateOfferPage from '@components/pages/create-offer';
import LoginPage from '@components/pages/login';
import OfferPage from '@components/pages/offer';
import OfferResultsPage from '@components/pages/offer-results';
import NotFoundPage from '@components/pages/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/create',
    element: <CreateOfferPage />,
  },
  {
    path: '/offer/:id',
    element: <OfferPage />,
  },
  {
    path: '/query',
    element: <OfferResultsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
