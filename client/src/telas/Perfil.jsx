import React from 'react';
import '../styles/perfil.css';
import Navebar from '../componentes/navebar';
import '../styles/perfil.css';
import loja from "../styles/img/loja.png"


const Perfil = () => {
  return (
    <div>
      <Navebar/>
      <div className="perfil">
        <div className='container-perfil'>
            <h2>Brasília Bombas Injetoras</h2>
            <p>Somos uma empresa especializada em bombas injetoras.</p>
            <p><strong>Onde ficamos:</strong></p>
            <p>Cidade: Brasília</p>
            <p>CEP: 7234589</p>
            <p>Endereço: ADE 509, lote 07 - samambaia sul</p>
            <p><strong>Dados para contato:</strong></p>
            <p>E-mail: brasiliabombasinjetoras@gmail.com</p>
            <p>Telefone fixo: 3358-3358</p>
            <p>WhatsApp: (61)98190-5688</p>
            <p>CNPJ: 10.234.009/1112</p>
        </div>
      </div>
      <img className="imagem-loja" src={loja} alt="Imagem da faixada da loja"/>
    </div>
  );
};

export default Perfil;
