import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, FileText, ChevronLeft, Menu, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../context/SidebarContext';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Utilisateurs', href: '/dashboard/users', icon: Users },
  { name: 'Séminaires', href: '/dashboard/seminars', icon: Calendar },
  { name: 'Rapports', href: '/dashboard/reports', icon: FileText },
  { name: 'Paramètres', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();
  const { isOpen, toggleSidebar } = useSidebar();

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen && window.innerWidth < 768) {
        toggleSidebar();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <>
      <button 
        onClick={toggleSidebar}
        className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-30 md:hidden"
              onClick={toggleSidebar}
            />
            
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed left-0 top-0 z-40 h-screen pt-16 w-72 bg-white border-r border-slate-100 shadow-sm"
            >
              <div className="absolute right-2 top-2 md:hidden">
                <button 
                  onClick={toggleSidebar}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              
              <div className="hidden md:block absolute -right-4 top-20">
                <button 
                  onClick={toggleSidebar}
                  className="p-2 bg-white rounded-full shadow-md text-slate-600 hover:text-blue-600 hover:bg-slate-50 border border-slate-200"
                  aria-label={isOpen ? "Fermer la sidebar" : "Ouvrir la sidebar"}
                >
                  {isOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="h-full px-4 py-6 overflow-y-auto">
                <ul className="space-y-1.5">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.href || location.pathname.startsWith(`${item.href}/`);
                    const Icon = item.icon;
                    
                    return (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={cn(
                            "flex items-center px-4 py-3 rounded-xl transition-colors",
                            isActive 
                              ? "bg-blue-50 text-blue-700 font-medium" 
                              : "text-slate-700 hover:bg-slate-50"
                          )}
                          onClick={() => window.innerWidth < 768 && toggleSidebar()}
                        >
                          <div className={cn(
                            "flex items-center justify-center w-9 h-9 rounded-lg",
                            isActive ? "bg-blue-100" : "bg-slate-100"
                          )}>
                            <Icon className={cn(
                              "w-5 h-5",
                              isActive ? "text-blue-600" : "text-slate-500"
                            )} />
                          </div>
                          <span className="ms-3 font-medium">{item.name}</span>
                          {isActive && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                
                <div className="mt-8 px-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h3 className="text-sm font-medium text-blue-700 mb-2">Besoin d'aide?</h3>
                    <p className="text-xs text-slate-600 mb-3">Consultez notre documentation pour plus d'informations.</p>
                    <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700">
                      Voir la documentation
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {!isOpen && (
        <div className="fixed left-4 top-20 z-30 hidden md:block">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-white rounded-full shadow-md text-slate-600 hover:text-blue-600 hover:bg-slate-50 border border-slate-200"
            aria-label="Ouvrir la sidebar"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}