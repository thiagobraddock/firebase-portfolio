import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';

function RedirectIfLoggedIn({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/projects');
    }
  }, [currentUser, navigate]);

  return children as JSX.Element;
}

export default RedirectIfLoggedIn;
