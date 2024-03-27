import { useMemo, useContext, useEffect } from 'react';

import { Context } from './context/FirestoreContext';
import { useAuthContext } from './context/AuthContext';
import Card from './components/Card';
import Layout from './components/Layout';
import './App.css';

function App() {
  const { state, read } = useContext(Context);
  const { aunthenticate } = useAuthContext();
  const count = useMemo(
    () =>
      `You have ${state.items.length} image${
        state.items.length > 1 ? 's' : ''
      }`,
    [state.items]
  );

  useEffect(() => {
    read();
  }, [read]);

  useEffect(() => {
    aunthenticate();
  }, [aunthenticate]);

  return (
    <Layout>
      <h1 className="text-center">Gallery</h1>
      {count}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {state.items.map((item, index) => (
          <Card key={index} {...item} />
        ))}
      </div>
    </Layout>
  );
}

export default App;
