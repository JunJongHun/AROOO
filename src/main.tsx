import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { worker } from './mocks/browsers.ts';
import { ChakraProvider } from '@chakra-ui/react';

if (import.meta.env.DEV) {
  await worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
  //  </React.StrictMode>
);
