import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useFirestoreContext } from '../context/FirestoreContext';
import { useAuthContext } from '../context/AuthContext';
import Firestore from '../handlers/firestore';
import Storage from '../handlers/storage';
import Card from './Card';
import Modal from './Modal';

const { removeDoc } = Firestore;
const { deleteFile } = Storage;

function ImageDetails() {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { state, read } = useFirestoreContext();
  const params = useParams();
  const modalId = 'removeImage';
  const item = useMemo(
    () => state.items.find((item) => item.id === params.id),
    [params.id, state.items]
  );
  const isAuthor = useMemo(
    () => currentUser && currentUser?.uid === item?.uid,
    [currentUser, item]
  );

  const onRemoveClick = () => {
    removeDoc(item.id, 'stocks').then(() => {
      deleteFile(item.filePath);
      read();
      navigate(-1);
    });
  };

  return (
    <>
      <div className="row justify-content-between mb-2">
        <div className="col-auto">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
        {isAuthor && (
          <div className="col-auto">
            <button
              className="btn btn-danger"
              type="button"
              data-bs-toggle="modal"
              data-bs-target={`#${modalId}`}
            >
              Remove image
            </button>
          </div>
        )}
      </div>

      <div className="row row-cols-1 justify-content-center">
        {item ? (
          <Card {...item} isSingle={true} />
        ) : (
          <h2 className="text-center mt-5">The image does not exist!</h2>
        )}
      </div>

      {isAuthor && (
        <Modal
          id={modalId}
          title={`Confirm the ${item.title} image removal!`}
          confirmButtonText="Remove"
          confirmButtonType="danger"
          onConfirm={onRemoveClick}
        />
      )}
    </>
  );
}

export default ImageDetails;
