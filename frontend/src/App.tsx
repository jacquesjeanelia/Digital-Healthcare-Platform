import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AuthProvider } from './lib/AuthContext';

const router = createBrowserRouter(AppRoutes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App; 