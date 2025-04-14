/**
 * Données fictives pour l'application de gestion des séminaires
 */

// Utilisateurs fictifs
export const users = [
  {
    id: 1,
    email: 'admin@gmail.com',
    name: 'Admin',
    role: 'admin',
    password: 'password', // En production, stocker les hashs et non les mots de passe en clair
    createdAt: '2023-01-15T10:00:00Z'
  },
  {
    id: 2,
    email: 'user1@example.com',
    name: 'Jean Dupont',
    role: 'user',
    password: 'password1',
    createdAt: '2023-02-10T14:30:00Z'
  },
  {
    id: 3,
    email: 'user2@example.com',
    name: 'Marie Laurent',
    role: 'user',
    password: 'password2',
    createdAt: '2023-03-05T09:15:00Z'
  }
];

// Séminaires fictifs
export const seminars = [
  {
    id: 1,
    title: 'Marketing Digital',
    description: 'Stratégies avancées de marketing digital pour les entreprises',
    date: '2023-06-12T09:00:00Z',
    endDate: '2023-06-12T17:00:00Z',
    location: 'Paris',
    capacity: 50,
    participants: 45,
    price: 450,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Leadership et Management',
    description: 'Techniques de leadership pour les managers intermédiaires',
    date: '2023-06-08T10:00:00Z',
    endDate: '2023-06-09T16:00:00Z',
    location: 'Lyon',
    capacity: 40,
    participants: 38,
    price: 700,
    status: 'completed'
  },
  {
    id: 3,
    title: 'Intelligence Artificielle',
    description: 'Introduction à l\'IA et ses applications en entreprise',
    date: '2023-06-03T09:30:00Z',
    endDate: '2023-06-03T18:00:00Z',
    location: 'Marseille',
    capacity: 80,
    participants: 62,
    price: 550,
    status: 'completed'
  },
  {
    id: 4,
    title: 'Design Thinking',
    description: 'Méthodologie de design thinking pour l\'innovation',
    date: '2023-07-15T10:00:00Z',
    endDate: '2023-07-15T17:30:00Z',
    location: 'Bordeaux',
    capacity: 35,
    participants: 12,
    price: 400,
    status: 'upcoming'
  },
  {
    id: 5,
    title: 'Cybersécurité',
    description: 'Protection des données et prévention des cyberattaques',
    date: '2023-07-20T09:00:00Z',
    endDate: '2023-07-21T17:00:00Z',
    location: 'Lille',
    capacity: 60,
    participants: 25,
    price: 800,
    status: 'upcoming'
  }
];

// Activités récentes fictives
export const activities = [
  {
    id: 1,
    type: 'user_registration',
    description: 'Nouvel utilisateur inscrit',
    user: 'Sophie Martin',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 2,
    type: 'seminar_created',
    description: 'Nouveau séminaire créé',
    title: 'Développement Durable',
    user: 'Admin',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 3,
    type: 'report_available',
    description: 'Rapport mensuel disponible',
    month: 'Mai 2023',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 4,
    type: 'seminar_registration',
    description: 'Inscription à un séminaire',
    seminar: 'Cybersécurité',
    user: 'Jean Dupont',
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString()
  }
];

// Statistiques fictives
export const stats = {
  totalUsers: 125,
  totalSeminars: 48,
  activeUsers: 83,
  revenue: '€ 45.680',
  conversionRate: 64,
  growth: 12.5
};
