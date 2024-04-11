import { createBrowserRouter } from 'react-router-dom';
import ContentListPage from './pages/ContentListPage';
import RootLayout from './pages/RootLayout';
import ContentDetailPage from './pages/ContentDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <ContentListPage /> },
      { path: '/content/:contentId', element: <ContentDetailPage /> },
    ],
  },
]);
