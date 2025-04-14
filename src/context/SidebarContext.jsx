import { createContext, useState, useContext, useEffect, useMemo } from 'react';

const SidebarContext = createContext(undefined);

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const value = useMemo(() => ({
    isOpen,
    toggleSidebar
  }), [isOpen]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}; 