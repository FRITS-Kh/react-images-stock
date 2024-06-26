import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

import { db } from '../lib/firebase.config';

const Firestore = {
  readDocs: (...args) => {
    const [collection_name] = args;
    const docs = [];
    const ref = collection(db, collection_name);

    return new Promise(async (resolve, reject) => {
      try {
        const snapshots = await getDocs(ref);
        snapshots.forEach((doc) => {
          const d = { ...doc.data(), id: doc.id };
          docs.push(d);
        });

        resolve(docs);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
  writeDoc: (...args) => {
    const [inputs, collection_name] = args;

    return new Promise(async (resolve, reject) => {
      const randomIndex = `${Date.now()}_${Math.floor(
        Math.random() * 1000000000
      )}`;
      try {
        const docRef = doc(db, collection_name, randomIndex);

        await setDoc(docRef, {
          title: inputs.title,
          path: inputs.path,
          filePath: inputs.filePath,
          createdAt: serverTimestamp(),
          user: inputs.user,
          uid: inputs.uid,
        });

        resolve('new doc successfully inserted');
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
  removeDoc: (...args) => {
    const [id, collection_name] = args;

    return new Promise(async (resolve, reject) => {
      try {
        const docRef = doc(db, collection_name, id);

        await deleteDoc(docRef);

        resolve(`the ${id} doc successfully removed`);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
};

export default Firestore;
