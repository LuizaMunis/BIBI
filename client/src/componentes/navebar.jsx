import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './logout';
import Calendario from '../telas/Calendario';


function Navebar() { 
  const navigate = useNavigate();
   //Navega para as paginas indicadas.
  const handleCalendarioClick = () => {
    navigate('/Calendario'); 
  };

  const handleDiagnosticosClick = () => {
    navigate('/Diagnosticos'); 
  };

  const handlePerfilClick = () => {
    navigate('/Perfil'); 
  };

  return ( //Botoes na barra de navegação que redireciona para as paginas.
    <div>  
      <button onClick={handleCalendarioClick} className='button_calendario'>Calendario</button>
      <button onClick={handleDiagnosticosClick} className='button_Diagnosticos'>Diagnosticos</button>
      <button onClick={handlePerfilClick} className='button_perfil'>Perfil</button>
      <Logout/>
    </div>
  );
}

export default Navebar;
