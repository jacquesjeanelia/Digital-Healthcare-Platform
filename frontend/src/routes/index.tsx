import { RouteObject } from 'react-router-dom';
import { Homepage } from '../screens/Homepage/Homepage';
import { About } from '../screens/About/About';
import { Services } from '../screens/Services/Services';
import { Contact } from '../screens/Contact/Contact';
import { Doctors } from '../screens/Doctors/Doctors';
import { DoctorProfile } from '../screens/DoctorProfile/DoctorProfile';
import { Login } from '../screens/Auth/Login';
import { Register } from '../screens/Auth/Register';
import Dashboard from '../screens/Dashboard/Dashboard';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Layout } from '../components/Layout';

export const AppRoutes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/services',
        element: <Services />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/doctors',
        element: <Doctors />,
      },
      {
        path: '/doctors/:id',
        element: <DoctorProfile />,
      },
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/register',
        element: <Register />,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]; 