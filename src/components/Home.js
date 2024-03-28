import { useMemo } from 'react';

import { useFirestoreContext } from '../context/FirestoreContext';
import List from './List';

function Home() {
  const { state } = useFirestoreContext();
  const count = useMemo(
    () => `${state.items.length} image${state.items.length > 1 ? 's' : ''}`,
    [state.items]
  );

  return (
    <>
      <h1 className="text-center">Gallery</h1>
      <p className="mb-2">{count}</p>
      <List items={state.items} />
    </>
  );
}

export default Home;
