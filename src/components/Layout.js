import { useContext } from 'react';

import { Context } from '../context/FirestoreContext';
import Navbar from './Navbar';
import UploadForm from './UploadForm';

function Layout({ children }) {
  const { dispatch, state } = useContext(Context);

  const toggle = () =>
    dispatch({
      type: 'setCollapse',
      payload: { isCollapsed: !state.isCollapsed },
    });

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <button className="btn btn-success float-end" onClick={toggle}>
          {state.isCollapsed ? 'Close' : '+ Add'}
        </button>
        <div className="clearfix mb-4"></div>

        <UploadForm />

        {children}
      </div>
    </>
  );
}

export default Layout;
