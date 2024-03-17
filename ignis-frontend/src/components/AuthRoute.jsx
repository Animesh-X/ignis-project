
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AuthRoute;
