import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@components/pages/home';
import CreateOfferPage from '@components/pages/create-offer';
import LoginPage from '@components/pages/auth';
import OfferPage from '@components/pages/offer';
import SearchResultsPage from '@components/pages/search-results';
import NotFoundPage from '@components/pages/not-found';
import DashboardPage from '@components/pages/dashboard';
import AdminPage from '@components/pages/admin';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/auth',
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
    path: '/search',
    element: <SearchResultsPage />,
  },
  {
    path: '/dashboard/:section',
    element: <DashboardPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '/admin/:section',
    element: <AdminPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
