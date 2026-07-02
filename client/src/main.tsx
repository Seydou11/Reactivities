import { StrictMode } from 'react';
import { createRoot as reactCreateRoot, type Root } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './app/layout/styles.css';
import 'leaflet/dist/leaflet.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router/internal/react-server-client';
import { router } from './app/router/Routes';
import { store, StoreContext } from './lib/stores/store';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function createRoot(element: HTMLElement): Root {
  return reactCreateRoot(element);
}

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StoreContext.Provider value={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StoreContext.Provider>
    </LocalizationProvider>
  </StrictMode>,
)