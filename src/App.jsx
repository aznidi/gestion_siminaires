import { RouterProvider } from 'react-router-dom';
import { router } from './router';

// Importation de l'intercepteur pour l'initialiser
import './interceptors/axios';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
