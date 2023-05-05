import { createBrowserRouter } from 'react-router-dom';

import DefaultLayout from './layouts/default.layout';
import ErrorPage from './pages/errors';
import HomePage from './pages';
import BookmarksPage from './pages/bookmarks';
import DetailPage from './pages/detail/[id]';

const router = createBrowserRouter([
  {
    path: '/',
    Component: DefaultLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/bookmarks',
        element: <BookmarksPage />,
      },
      {
        path: '/detail/:id',
        element: <DetailPage />,
      },
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
