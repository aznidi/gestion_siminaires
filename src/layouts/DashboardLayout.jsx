import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '../context/SidebarContext';

function DashboardContent() {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      
      <div 
        className={`transition-all duration-300 ease-in-out p-4 pt-20 ${
          isOpen ? 'md:ml-72' : 'ml-0'
        }`}
        style={{ 
          transition: 'margin-left 0.3s ease-in-out' 
        }}
      >
        <div className="p-4 border-2 border-gray-200 rounded-lg bg-white min-h-[calc(100vh-112px)] shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout() {
  const { isAuthenticated, loading } = useAuth();
  
  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!loading && !isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  // Afficher un indicateur de chargement pendant la vérification de l'authentification
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
} 