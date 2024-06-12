import React from 'react';
import { Navigate } from 'react-router-dom';

const Proteger = ({ children }) => {
  const Autenticacao = !!localStorage.getItem('token'); //Os componentes filhos passados para Proteger

  return Autenticacao ? children : <Navigate to="/" />;
};

export default Proteger;
