import { useEffect } from 'react';

import { useFirestoreContext } from './context/FirestoreContext';
import { useAuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  const { read } = useFirestoreContext();
  const { aunthenticate } = useAuthContext();

  useEffect(() => {
    read();
  }, [read]);

  useEffect(() => {
    aunthenticate();
  }, [aunthenticate]);

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

export default App;
