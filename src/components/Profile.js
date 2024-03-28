import { useMemo } from 'react';
import { useAuthContext } from '../context/AuthContext';

function Profile() {
  const { currentUser } = useAuthContext();
  const username = currentUser?.displayName || '';
  const createdAtDate = useMemo(() => {
    const createdAt = currentUser?.metadata?.creationTime;

    if (!createdAt) {
      return '';
    }

    const date = createdAt.split(' ');

    return `${date[2]} ${date[1]} ${date[3]}`;
  }, [currentUser]);

  return (
    <>
      <h1 className="text-center">Profile</h1>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <hr className="mb-4 mt-3 mb-lg-5 mt-lg-4" />
        </div>
      </div>
      <div className="d-lg-flex justify-content-center align-items-center">
        <img
          className="mb-3 mb-lg-0 mx-auto mx-lg-0 d-block rounded-1"
          src={currentUser?.photoURL}
          alt={username}
          width="150"
          height="150"
        />
        <ul className="list-group mx-lg-5">
          <li className="list-group-item">
            <b className="text-capitalize me-1">name:</b>
            {username}
          </li>
          <li className="list-group-item">
            <b className="text-capitalize me-1">email:</b>
            {currentUser?.email}
          </li>
          <li className="list-group-item">
            <b className="text-capitalize me-1">created:</b>
            {createdAtDate}
          </li>
          <li className="list-group-item">
            <b className="text-capitalize me-1">last login:</b>
            {currentUser?.metadata?.lastSignInTime ?? ''}
          </li>
        </ul>
      </div>
    </>
  );
}

export default Profile;
