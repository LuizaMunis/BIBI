import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navebar from '../componentes/navebar';
import '../styles/calendario.css'

function Calendario() {
  const [agendamentos, setAgendamentos] = useState([]);
  // const [semana, setSemana] = useState(true); // Removido para evitar aviso do ESLint
  const [expandedagendamento, setExpandedagendamento] = useState(null); // Estado para controlar o agendamento expandido

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:3001/calendario';
        // if (semana) {
        //   url += '?semana=true';
        // }
        const response = await Axios.get(url);
        if (response.data) {
          const agendamentosFormatados = response.data.map((agendamento) => ({
            ...agendamento,
            data: new Date(agendamento.data).toLocaleDateString('pt-BR'),
          }));
          setAgendamentos(agendamentosFormatados);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []); 

  const handleClick = (agendamento) => {
    // Se o agendamento clicado já estiver expandido, fecha ele
    if (expandedagendamento === agendamento.id) {
      setExpandedagendamento(null);
    } else {
      // Se não, expande o agendamento clicado
      setExpandedagendamento(agendamento.id);
    }
  };
  
  return (
    <div>
      <Navebar />
      <div className='container'>
        <div className='calendario'>
          <h1>Agendados</h1>
          <table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>CPF</th>
                <th>VEÍCULO</th>
                <th>PLACA</th>
                <th>DATA</th>
                <th>PERÍODO</th>
              </tr>
            </thead>
            <tbody>
              <React.Fragment key="agendamentos">
                {agendamentos.map((agendamento) => (
                  <React.Fragment key={agendamento.id}>
                    <tr>
                      <td>{agendamento.nome}</td>
                      <td>{agendamento.cpf}</td>
                      <td>{agendamento.modelo}</td>
                      <td>{agendamento.placa}</td>
                      <td>{agendamento.data}</td>
                      <td>{agendamento.periodo}</td>
                      <td className='expandir'>
                        <button onClick={() => handleClick(agendamento)} className='button-expandir' > {expandedagendamento === agendamento.id ? '-' : '+'}</button>
                      </td>
                    </tr>
                    {expandedagendamento === agendamento.id && (
                      <tr key={`${agendamento.id}-detalhes`}className="detalhes">
                        <td colSpan="6">
                          <div>
                            <p>Nome: {agendamento.nome} {agendamento.sobrenome}</p>
                            <p>Email: {agendamento.email}</p>
                            <p>Celular: {agendamento.celular}</p>
                          </div>
                          <div>
                            <p>Motor: {agendamento.motor}</p>
                            <p>Cor: {agendamento.cor}</p>
                            <p>Ano: {agendamento.ano}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Calendario;
