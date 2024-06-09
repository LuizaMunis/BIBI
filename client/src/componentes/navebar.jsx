import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './logout';
import '../styles/navebar.css';
import logo from "../styles/img/logo2.png"


function Navebar() { 

    const navigate = useNavigate();

    // Funções de navegação para cada botão
    const handleCalendarioClick = () => {
        navigate('/Calendario'); 
    };

    const handleDiagnosticosClick = () => {
        navigate('/Diagnosticos'); 
    };

    const handlePerfilClick = () => {
        navigate('/Perfil'); 
    };

    return (
        <div className="navbar-container"> 
          <img className="logo2" src={logo} alt="logo bibi digital"/>
          <button onClick={handleCalendarioClick} className='button-navebar'>Calendario</button>
          <button onClick={handleDiagnosticosClick} className='button-navebar'>Diagnosticos</button>
          <button onClick={handlePerfilClick} className='button-navebar'>Perfil</button>
          <Logout/>
        </div>
    );
}

export default Navebar;
