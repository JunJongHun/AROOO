import { createBrowserRouter } from 'react-router-dom';
import ContentListPage from './pages/ContentListPage';
import RootLayout from './pages/RootLayout';
import ContentDetailPage from './pages/ContentDetailPage';
import QueryErrorBoundary from './components/QueryErrorBoundary';
import { Suspense } from 'react';
import Fallback from './components/Fallback';
import SkeletonContentList from './components/SkeletonContentList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <QueryErrorBoundary FallbackComponent={Fallback}>
            <Suspense fallback={<SkeletonContentList />}>
              <ContentListPage />
            </Suspense>
          </QueryErrorBoundary>
        ),
      },
      {
        path: '/content/:contentId',
        element: <ContentDetailPage />,
      },
    ],
  },
]);
