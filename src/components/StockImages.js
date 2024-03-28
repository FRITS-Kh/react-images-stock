import { useMemo } from 'react';

import List from './List';
import { useFirestoreContext } from '../context/FirestoreContext';
import { useAuthContext } from '../context/AuthContext';

function StockImages() {
  const { state } = useFirestoreContext();
  const { currentUser } = useAuthContext();
  const items = useMemo(() => {
    const userId = currentUser?.uid;

    if (!userId) {
      return [];
    }

    return state.items.filter((item) => item.uid === userId);
  }, [state.items, currentUser]);

  const count = useMemo(
    () => `You have ${items.length} image${items.length > 1 ? 's' : ''}`,
    [items]
  );

  return (
    <>
      <h1 className="text-center">My Stock Images</h1>

      <p className="mb-2">{count}</p>
      <List items={items} />
    </>
  );
}

export default StockImages;
