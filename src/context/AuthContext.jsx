import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import axios from '../interceptors/axios'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (email && password) {
        const response = await axios.post('/login', {email, password});

        if(response.data && response.data.user)
        {
          setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('token', userData.token);
          
          
          setUser(userData);
          
          axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
          
          toast.success('Connexion réussie');
          return { success: true, message: 'Connexion réussi' };
        }else{
          return { success: false, message: 'Email ou mot de passe incorrect' };
        }
        
      }
    } catch (error) {
      toast.error('Erreur de connexion');
      return { success: false, message: 'Erreur de connexion' };
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Déconnexion réussie');
  };

  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = () => !!user;

  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    isAuthenticated
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;   