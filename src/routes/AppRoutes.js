import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { useAuthContext } from '../context/AuthContext';
import Home from '../components/Home';
import ImageDetails from '../components/ImageDetails';
import NotFound from '../components/NotFound';

const Profile = React.lazy(() => import('../components/Profile'));
const StockImages = React.lazy(() => import('../components/StockImages'));

function Loading() {
  return <p className="fs-3 text-center">Page loading...</p>;
}

function AppRoutes() {
  const { currentUser } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/images/:id" element={<ImageDetails />} />
      <Route path="*" element={<NotFound />} />
      {currentUser && (
        <Route
          path="/profile"
          element={
            <React.Suspense fallback={<Loading />}>
              <Profile />
            </React.Suspense>
          }
        />
      )}
      {currentUser && (
        <Route
          path="/stock-images"
          element={
            <React.Suspense fallback={<Loading />}>
              <StockImages />
            </React.Suspense>
          }
        />
      )}
    </Routes>
  );
}

export default AppRoutes;
