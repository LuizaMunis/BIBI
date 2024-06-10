import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Upload from "../componentes/upload";
import Navebar from '../componentes/navebar';
import '../styles/diagnosticos.css';

function Diagnosticos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [erro, setErro] = useState(null);
  const [detalhesVisiveis, setDetalhesVisiveis] = useState({});
  const [filtro, setFiltro] = useState('');
  const [servicosFinalizados, setServicosFinalizados] = useState({});

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

  const handleClick = (agendamento) => {
    // Se o agendamento clicado já estiver expandido, fecha ele
    if (detalhesVisiveis[agendamento.id]) {
      setDetalhesVisiveis({ ...detalhesVisiveis, [agendamento.id]: false });
    } else {
      // Se não, expande o agendamento clicado
      setDetalhesVisiveis({ ...detalhesVisiveis, [agendamento.id]: true });
    }
  };

  const handleFilterChange = (event) => {
    setFiltro(event.target.value);
  };

  const finalizarServico = async (id) => {
    try {
      await Axios.put(`http://localhost:3001/diagnosticos/finalizar/${id}`);
      setAgendamentos(prevAgendamentos =>
        prevAgendamentos.map(agendamento =>
          agendamento.id === id ? { ...agendamento, resposta: 'finalizado' } : agendamento
        )
      );
      setServicosFinalizados({ ...servicosFinalizados, [id]: true });
    } catch (error) {
      console.error('Erro ao finalizar serviço:', error);
      setErro("Erro ao finalizar serviço");
    }
  };

  const isServicoFinalizado = (id) => {
    return servicosFinalizados[id];
  };

  return (
    <div>
      <Navebar />
      <div className='diagnosticos'>
        <h1>Diagnósticos</h1>
        <div>
          <label htmlFor="filtro">Filtrar por status:</label>
          <div className="filtro-buttons">
            <button className={filtro === "" ? "active" : ""} onClick={() => setFiltro("")}>Todos</button>
            <button className={filtro === "aguardando" ? "active" : ""} onClick={() => setFiltro("aguardando")}>Aguardando</button>
            <button className={filtro === "aprovado" ? "active" : ""} onClick={() => setFiltro("aprovado")}>Aprovado</button>
          </div>
        </div>
        {erro ? (
          <p>Erro: {erro}</p>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>CPF</th>
                  <th>VEÍCULO</th>
                  <th>PLACA</th>

                </tr>
              </thead>
              <tbody>
                {agendamentos.map((agendamento) => (
                  <React.Fragment key={agendamento.id}>
                    <tr>
                      <td>{agendamento.nome}</td>
                      <td>{agendamento.cpf}</td>
                      <td>{agendamento.modelo}</td>
                      <td>{agendamento.placa}</td>
                      <td className='expandir'>
                        <button onClick={() => handleClick(agendamento)} className='button-expandir'>{detalhesVisiveis[agendamento.id] ? '-' : '+'}</button>
                      </td>
                    </tr>
                    {detalhesVisiveis[agendamento.id] && (
                      <tr key={`${agendamento.id}-detalhes`} className="detalhes">
                        <td colSpan="5">
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
                          <Upload/>
                          {!isServicoFinalizado(agendamento.id) && (
                            <button onClick={() => finalizarServico(agendamento.id)}>Finalizar Serviço</button>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diagnosticos;
