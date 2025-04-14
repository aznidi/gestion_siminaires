import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { Toaster } from 'react-hot-toast';

// Composant qui wrap l'application avec les providers nécessaires
const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
        <Toaster position="top-right" />
      </ThemeProvider>
    </AuthProvider>
  );
};

// Définition des routes de l'application
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // Autres routes du dashboard peuvent être ajoutées ici
      {
        path: 'users',
        element: <div className="p-4">Gestion des utilisateurs</div>,
      },
      {
        path: 'seminars',
        element: <div className="p-4">Gestion des séminaires</div>,
      },
      {
        path: 'reports',
        element: <div className="p-4">Rapports</div>,
      },
      {
        path: 'settings',
        element: <div className="p-4">Paramètres</div>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

export { router, AppProviders };
