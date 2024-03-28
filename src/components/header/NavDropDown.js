import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';

function NavDropDown() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuthContext();
  const username = useMemo(() => currentUser?.displayName || '', [currentUser]);

  const userInitials = useMemo(
    () =>
      username
        .split(' ')
        .map((item) => item[0])
        .join(''),
    [username]
  );

  const avatar = useMemo(
    () => (
      <img
        className="rounded-circle"
        src={currentUser?.photoURL}
        alt={userInitials}
        width="34"
        height="34"
      />
    ),
    [currentUser, userInitials]
  );

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="/"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {avatar}
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <Link className="dropdown-item text-center" to="/profile">
              {username}
            </Link>
          </li>
          <li>
            <hr className="dropdown divider" />
          </li>
          <li className="d-grid px-2">
            <button type="button" className="btn btn-danger" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default NavDropDown;
