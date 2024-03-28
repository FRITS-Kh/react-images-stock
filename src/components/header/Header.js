import { Link } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';
import SearchForm from './SearchForm';
import NavDropDown from './NavDropDown';
import Navigation from './Navigation';

function Header({ withSearch = true }) {
  const { currentUser, login } = useAuthContext();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Images stock
        </Link>
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
          {withSearch && <SearchForm />}
          {currentUser && <NavDropDown />}
          {!currentUser && (
            <div className="d-grid">
              <button
                type="button"
                className="btn btn-success ms-0 ms-lg-2"
                onClick={login}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
