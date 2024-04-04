import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@components/pages/home';
import CreateOfferPage from '@components/pages/create-offer';
import LoginPage from '@components/pages/login';

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
]);

export default router;
