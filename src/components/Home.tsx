import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import ProjectForm from './project/ProjectForm';
import ProjectList from './project/ProjectList';

export function Home() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  return (
    <div>
      <h1>Página Inicial</h1>
      Olá
      { currentUser?.displayName }
      <button onClick={ handleLogout }>Logout</button>
      <ProjectForm />
      <ProjectList />
    </div>
  );
}
