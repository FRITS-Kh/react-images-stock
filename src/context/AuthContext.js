import { createContext, useContext, useMemo, useState } from 'react';

import FirebaseAuth from '../handlers/auth';

const { signIn, signOut, getCurrentUser } = FirebaseAuth;
const Context = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = () => signIn().then(setCurrentUser);
  const logout = () => signOut().then(() => setCurrentUser(null));
  const aunthenticate = () => getCurrentUser().then(setCurrentUser);
  const value = useMemo(
    () => ({ login, logout, aunthenticate, currentUser }),
    [currentUser]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useAuthContext = () => useContext(Context);
export default AuthProvider;
