import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from 'firebase/storage';

import { storage } from '../lib/firebase.config';

const Storage = {
  uploadFile: (media) => {
    return new Promise(async (resolve, reject) => {
      try {
        const mediaRef = ref(storage, `images/${media.title}_${Date.now()}`);

        uploadBytes(mediaRef, media.file)
          .then((snapshot) => {
            resolve({ path: snapshot.metadata.fullPath, name: media.title });
          })
          .catch((e) => {
            console.log(e);
            reject(e);
          });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
  downloadFile: (media) => {
    return new Promise(async (resolve, reject) => {
      try {
        const mediaRef = ref(storage, media.path);
        const fileUrl = await getDownloadURL(mediaRef);

        resolve({ url: fileUrl, filePath: media.path });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
  deleteFile: (url) => {
    return new Promise(async (resolve, reject) => {
      try {
        const mediaRef = ref(storage, url);

        deleteObject(mediaRef).then(() =>
          resolve(`the ${url} successfully removed`)
        );
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  },
};

export default Storage;
