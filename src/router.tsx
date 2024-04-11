import { createBrowserRouter } from 'react-router-dom';
import ContentListPage from './pages/ContentListPage';
import RootLayout from './pages/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{ path: '/', element: <ContentListPage /> }],
  },
]);
