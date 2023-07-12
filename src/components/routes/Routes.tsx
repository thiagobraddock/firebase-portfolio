import { Route, Routes } from 'react-router-dom';
import RedirectIfLoggedIn from './RedirectIfLoggedIn';
import { Login } from '../Login';
import { Home } from '../Home'; // Você precisará criar este componente
import ProtectedRoute from './ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={ <RedirectIfLoggedIn><Login /></RedirectIfLoggedIn> }
      />
      <Route path="/projects" element={ <ProtectedRoute><Home /></ProtectedRoute> } />
    </Routes>
  );
}
