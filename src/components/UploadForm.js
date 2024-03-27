import { useMemo, useContext, useState } from 'react';

import { Context } from '../context/FirestoreContext';
import Firestore from '../handlers/firestore';
import Storage from '../handlers/storage';
import { useAuthContext } from '../context/AuthContext';

const { writeDoc } = Firestore;
const { uploadFile, downloadFile } = Storage;

function Preview() {
  const { state } = useContext(Context);
  const path = state.inputs.path;

  return (
    path && (
      <div
        className="rounded p-1 m-5"
        style={{
          width: '30%',
          height: '300px',
          backgroundImage: `url(${path}`,
          backgroundSize: 'cover',
        }}
      ></div>
    )
  );
}

function UploadForm() {
  const [uploadError, setUploadError] = useState('');
  const { dispatch, state, read } = useContext(Context);
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
      .then((url) => {
        writeDoc({ ...inputs, path: url, user: username }, 'stocks').then(
          () => {
            read();
            dispatch({
              type: 'setCollapse',
              payload: { isCollapsed: false },
            });
          }
        );
      })
      .catch((e) => setUploadError(e.code ?? 'Unauthorized'));
  };

  return (
    isVisible && (
      <>
        <p className="display-6 text-center mb-3">Upload Stock Image</p>
        <div className="mb-5 d-flex align-items-center justify-content-center">
          <Preview />

          <form className="mb-2" onSubmit={onSubmit}>
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
            <button
              type="submit"
              className="btn btn-success float-end"
              disabled={isDisabled}
            >
              Save and upload
            </button>
          </form>
        </div>
      </>
    )
  );
}

export default UploadForm;
