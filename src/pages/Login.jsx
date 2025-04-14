import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // Rediriger si déjà connecté
  if (!loading && isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  // Schéma de validation du formulaire
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email invalide')
      .required('Email requis'),
    password: Yup.string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .required('Mot de passe requis'),
  });

  // Configuration Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const result = await login(values.email, values.password);
      if (result.success) {
        navigate('/dashboard');
      }
    },
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-50 items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md p-8"
        >
          <h1 className="text-4xl font-bold text-blue-800 mb-6">Gestion de Séminaires</h1>
          <p className="text-slate-700 mb-4">Plateforme professionnelle pour la gestion efficace de vos séminaires et événements.</p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-slate-800">Planification</h3>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-slate-800">Participants</h3>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-slate-800">Rapports</h3>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-slate-800">Configuration</h3>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Connexion</h2>
              <p className="text-slate-500 mt-2">Accédez à votre espace administrateur</p>
            </div>

            <form className="space-y-5" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="votre@email.com"
                    className={`block w-full pl-11 pr-3 py-3 border ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-slate-200 focus:ring-blue-500'
                    } rounded-xl bg-slate-50 focus:outline-none focus:ring-2 text-slate-900 transition-all duration-200`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="mt-1 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{formik.errors.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-blue-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className={`block w-full pl-11 pr-10 py-3 border ${
                      formik.touched.password && formik.errors.password
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-slate-200 focus:ring-blue-500'
                    } rounded-xl bg-slate-50 focus:outline-none focus:ring-2 text-slate-900 transition-all duration-200`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="mt-1 flex items-center text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{formik.errors.password}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  Mot de passe oublié?
                </button>
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {formik.isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connexion en cours...
                    </div>
                  ) : (
                    'Se connecter'
                  )}
                </span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Informations de démonstration
                </h3>
                <div className="text-sm text-slate-700 space-y-1">
                  <p className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-blue-600" />
                    admin@gmail.com
                  </p>
                  <p className="flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-blue-600" />
                    password
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>© 2025 Gestion de Séminaires. Tous droits réservés.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Composants manquants pour la partie gauche
const Calendar = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const Users = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const Settings = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const FileText = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);