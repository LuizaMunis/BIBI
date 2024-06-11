import React from 'react';
import { Navigate } from 'react-router-dom';

const Proteger = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); //propriedade React que representa os componentes filhos passados para Proteger

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default Proteger;
