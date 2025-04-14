import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut, User, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { cn } from '../utils/cn';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isOpen: isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50 shadow-sm transition-all duration-300" 
         style={{ 
           paddingLeft: isSidebarOpen ? "calc(18rem + 1rem)" : "1rem",
           transition: 'padding-left 0.3s ease-in-out'
         }}>
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-2 text-gray-600 rounded-lg hover:bg-gray-100 focus:outline-none"
            aria-label={isSidebarOpen ? "Fermer la sidebar" : "Ouvrir la sidebar"}
          >
            {isSidebarOpen ? 
              <PanelLeftClose className="w-5 h-5" /> : 
              <PanelLeftOpen className="w-5 h-5" />
            }
          </button>
          <Link to="/dashboard" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">Admin Panel</span>
          </Link>
        </div>

        <div className="flex items-center md:order-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-sm bg-gray-800 rounded-full md:mr-0 p-1"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
            </button>
            
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow z-10">
                <div className="px-4 py-3 text-sm text-gray-900">
                  <div className="font-semibold">{user?.name}</div>
                  <div className="truncate">{user?.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Profil
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">
                      Paramètres
                    </Link>
                  </li>
                </ul>
                <div className="py-2">
                  <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 