import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Upload from "../componentes/upload"

function Diagnosticos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [erro, setErro] = useState(null);
  const [detalhesVisiveis, setDetalhesVisiveis] = useState({});

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/diagnosticos');
        console.log('Dados recebidos do backend:', response.data);
        
        const filteredAgendamentos = response.data.filter(agendamento => {
          console.log('Data do agendamento:', agendamento.data); // Verifica a data do agendamento
          return new Date(agendamento.data) <= new Date(); // Filtra os agendamentos para datas passadas ou iguais à data atual
        });
        console.log('Agendamentos filtrados:', filteredAgendamentos); // Verifica os agendamentos filtrados
        
        setAgendamentos(filteredAgendamentos);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        setErro(error.message);
      }
    };
    
    fetchAgendamentos();
  }, []);

  const toggleDetalhes = (id) => {
    setDetalhesVisiveis({ ...detalhesVisiveis, [id]: !detalhesVisiveis[id] });
  };

  return (
    <div>
      <h1>Diagnósticos</h1>
      {erro ? (
        <p>Erro: {erro}</p>
      ) : (
        <div>
          {agendamentos.map(agendamento => (
            <div key={agendamento.id}>
              Data: {agendamento.data_agendamento}, Período: {agendamento.periodo}, Cliente: {agendamento.cliente}
              <button onClick={() => toggleDetalhes(agendamento.id)}>Ver Detalhes</button>
              {detalhesVisiveis[agendamento.id] && (
                <div>
                  <p>Detalhes do Cliente:</p>
                  <p>Nome: {agendamento.nome}</p>
                  <p>Email: {agendamento.email}</p>
                  <Upload agendamento_id={agendamento.id}/>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Diagnosticos;
