import { useLocation } from 'react-router-dom';

import { useFirestoreContext } from '../context/FirestoreContext';
import Header from './header/Header';
import UploadForm from './uploadImages/UploadForm';

function Layout({ children }) {
  const { dispatch, state } = useFirestoreContext();
  const location = useLocation();
  const isMediaPage =
    location.pathname === '/' || location.pathname === '/stock-images';

  const toggle = () =>
    dispatch({
      type: 'setCollapse',
      payload: { isCollapsed: !state.isCollapsed },
    });

  return (
    <>
      <Header withSearch={isMediaPage} />

      <div className="container my-5">
        {isMediaPage && (
          <>
            <div className="text-center">
              <button
                className={`btn btn-${
                  state.isCollapsed ? 'secondary' : 'success'
                }`}
                onClick={toggle}
              >
                {state.isCollapsed ? 'Close' : 'Upload image'}
              </button>
            </div>
            <div className="clearfix mb-4"></div>

            <UploadForm />
          </>
        )}

        {children}
      </div>
    </>
  );
}

export default Layout;
