import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export function Login() {
  console.log('Login');

  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/projects');
    } catch (error) {
      console.error('Failed to sign in with Google', error);
    }
  };

  return (
    <div>
      <button onClick={ handleLogin }>Sign in with Google</button>
    </div>
  );
}
