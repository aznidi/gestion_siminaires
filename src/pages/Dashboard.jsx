import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { BarChart3, Users, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

// Composant pour les cartes d'informations
const StatsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-xl shadow-sm p-6 flex items-center border border-gray-100"
  >
    <div className={`p-3 rounded-lg ${color} text-white mr-4`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSeminars: 0,
    activeUsers: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simuler un chargement de données
  useEffect(() => {
    setLoading(true);
    // Dans un cas réel, ce serait un appel API
    const timer = setTimeout(() => {
      try {
        setStats({
          totalUsers: 125,
          totalSeminars: 48,
          activeUsers: 83,
          revenue: '€ 45.680'
        });
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les données");
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-xl shadow-sm p-6">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
        <p className="text-gray-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <div className="px-4 py-2 bg-blue-50 rounded-lg text-sm font-medium text-blue-700">
          Bienvenue, {user?.name}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 h-24 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))
        ) : (
          <>
            <StatsCard
              title="Utilisateurs totaux"
              value={stats.totalUsers}
              icon={Users}
              color="bg-blue-600"
            />
            <StatsCard
              title="Séminaires"
              value={stats.totalSeminars}
              icon={Calendar}
              color="bg-green-600"
            />
            <StatsCard
              title="Utilisateurs actifs"
              value={stats.activeUsers}
              icon={Users}
              color="bg-purple-600"
            />
            <StatsCard
              title="Chiffre d'affaires"
              value={stats.revenue}
              icon={TrendingUp}
              color="bg-amber-600"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Séminaires récents</h2>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              {loading ? '...' : '3 nouveaux'}
            </span>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participants
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                          <Calendar className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Marketing Digital</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      12 Juin 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        45
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                          <Calendar className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Leadership et Management</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      8 Juin 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        38
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center mr-3">
                          <Calendar className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Intelligence Artificielle</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      3 Juin 2023
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        62
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Activité récente</h2>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
              Aujourd'hui
            </span>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="ml-4 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900">
                      Nouvel utilisateur inscrit
                    </p>
                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Nouveau</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
                  <p className="text-sm text-gray-600 mt-2">Un nouvel utilisateur s'est inscrit sur la plateforme.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    Nouveau séminaire créé
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Il y a 5 heures</p>
                  <p className="text-sm text-gray-600 mt-2">Un nouveau séminaire "Design Thinking" a été créé.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    Rapport mensuel disponible
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Il y a 1 jour</p>
                  <p className="text-sm text-gray-600 mt-2">Le rapport d'activité du mois de mai est maintenant disponible.</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}