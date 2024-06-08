import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Upload from "../componentes/upload";

function Diagnosticos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [erro, setErro] = useState(null);
  const [detalhesVisiveis, setDetalhesVisiveis] = useState({});
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:3001/diagnosticos';
        if (filtro) {
          url += `/filtrar?status=${filtro}`;
        }

        const response = await Axios.get(url);
        setAgendamentos(response.data);
      } catch (error) {
        console.error(error);
        setErro("Erro ao buscar agendamentos");
      }
    };

    fetchData();
  }, [filtro]);

  const toggleDetalhes = (id) => {
    setDetalhesVisiveis({ ...detalhesVisiveis, [id]: !detalhesVisiveis[id] });
  };

  const handleFilterChange = (event) => {
    setFiltro(event.target.value);
  };

  return (
    <div>
      <h1>Diagnósticos</h1>
      <div>
        <label htmlFor="filtro">Filtrar por status:</label>
        <select id="filtro" value={filtro} onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="aguardando">Aguardando</option>
          <option value="aprovado">Aprovado</option>
        </select>
      </div>
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
