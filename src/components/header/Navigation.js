import { NavLink } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';

function Navigation() {
  const { currentUser } = useAuthContext();

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <NavLink className="nav-link" aria-current="page" to="/">
          Home
        </NavLink>
      </li>
      {currentUser && (
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/stock-images">
            My Stock Images
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
