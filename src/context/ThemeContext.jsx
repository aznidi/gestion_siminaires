import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Vérifier s'il y a une préférence stockée dans localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Vérifier si l'utilisateur préfère le mode sombre dans son navigateur
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Retourner le thème sauvegardé ou la préférence système ou 'light' par défaut
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  // Mettre à jour l'attribut de thème sur l'élément html
  useEffect(() => {
    const root = document.documentElement;
    
    // Basculer la classe dark sur l'élément html
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Sauvegarder le thème dans localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte de thème
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme doit être utilisé à l\'intérieur d\'un ThemeProvider');
  }
  return context;
} 