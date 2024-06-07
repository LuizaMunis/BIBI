import React from 'react';
import { Navigate } from 'react-router-dom';

const Proteger = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default Proteger;
