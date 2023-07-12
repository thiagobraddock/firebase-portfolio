import './App.css';
import { AppRoutes } from './components/routes/Routes';
import { useAuth } from './context/AuthProvider';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
