import { useMemo, useState } from 'react';

import { useAuthContext } from '../../context/AuthContext';
import { useFirestoreContext } from '../../context/FirestoreContext';
import Firestore from '../../handlers/firestore';
import Storage from '../../handlers/storage';
import Preview from './Preview';

const { writeDoc } = Firestore;
const { uploadFile, downloadFile } = Storage;

function UploadForm() {
  const [uploadError, setUploadError] = useState('');
  const { dispatch, state, read } = useFirestoreContext();
  const { isCollapsed: isVisible, inputs } = state;
  const { currentUser } = useAuthContext();
  const username = currentUser?.displayName.toLowerCase();

  const isDisabled = useMemo(
    () => Object.values(inputs).some((input) => !input),
    [inputs]
  );

  const onChange = (e) =>
    dispatch({ type: 'setInputs', payload: { value: e } });

  const onSubmit = (e) => {
    e.preventDefault();
    setUploadError('');
    uploadFile(inputs)
      .then(downloadFile)
      .then(({ url, filePath }) => {
        writeDoc(
          {
            ...inputs,
            path: url,
            filePath,
            user: username,
            uid: currentUser.uid,
          },
          'stocks'
        ).then((result) => {
          console.log(result);
          dispatch({
            type: 'resetInputs',
          });
          read();
          dispatch({
            type: 'setCollapse',
            payload: { isCollapsed: false },
          });
        });
      })
      .catch((e) => setUploadError(e.code ?? 'Unauthorized'));
  };

  return (
    isVisible && (
      <>
        <h3 className="text-center mb-3">Upload Stock Image</h3>
        <div className="mb-5 d-lg-flex align-items-center justify-content-center">
          <Preview />

          <form className="mb-2 mb-lg-0" onSubmit={onSubmit}>
            {uploadError && (
              <div className="mb-3 text-danger">{uploadError}</div>
            )}
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="title"
                aria-describedby="text"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                name="file"
                onChange={onChange}
              />
            </div>
            <div className="d-grid float-lg-end">
              <button
                type="submit"
                className="btn btn-success"
                disabled={isDisabled}
              >
                Save and upload
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
}

export default UploadForm;
