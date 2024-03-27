import SearchForm from './SearchForm';
import { useAuthContext } from '../context/AuthContext';
import { useMemo } from 'react';

const LogIn = () => {
  const { login, currentUser } = useAuthContext();
  return (
    !currentUser && (
      <button type="button" className="btn btn-success" onClick={login}>
        Login
      </button>
    )
  );
};

const LogOut = () => {
  const { logout, currentUser } = useAuthContext();
  return (
    !!currentUser && (
      <button type="button" className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    )
  );
};

function Navigation() {
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <a className="nav-link active" href="/" aria-current="page">
          Home
        </a>
      </li>
    </ul>
  );
}

function DropDown() {
  const { currentUser } = useAuthContext();
  const username = useMemo(
    () => currentUser?.displayName || 'Profile',
    [currentUser]
  );
  const avatar = useMemo(
    () =>
      currentUser ? (
        <img
          className="rounded-circle"
          src={currentUser?.photoURL}
          alt={currentUser?.displayName}
          width="34"
          height="34"
        />
      ) : (
        'Login'
      ),
    [currentUser]
  );

  return (
    <ul className="navbar-nav mb-2 mb-lg-0">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
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
            <a className="dropdown-item text-center" href="#">
              {username}
            </a>
          </li>
          <li>
            <hr className="dropdown divider" />
          </li>
          <li className="d-flex justify-content-center">
            <LogIn />
            <LogOut />
          </li>
        </ul>
      </li>
    </ul>
  );
}

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Navigation />
          <SearchForm />
          <DropDown />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
