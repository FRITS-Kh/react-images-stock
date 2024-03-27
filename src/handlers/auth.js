import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { auth } from '../lib/firebase.config';

const provider = new GoogleAuthProvider();
const FirebaseAuth = {
  signIn: () =>
    new Promise((resolve) => {
      signInWithPopup(auth, provider)
        .then((response) => resolve(response.user))
        .catch(console.error);
    }),
  signOut: () =>
    new Promise((resolve) => {
      signOut(auth)
        .then(() => {
          console.log('user logged out');
          resolve();
        })
        .catch(console.error);
    }),
  getCurrentUser: () =>
    new Promise((resolve) => auth.onAuthStateChanged(resolve)),
};

export default FirebaseAuth;
