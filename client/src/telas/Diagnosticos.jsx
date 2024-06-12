import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Upload from "../componentes/upload";
import Navebar from '../componentes/navebar';
import '../styles/diagnosticos.css';

function Diagnosticos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [erro, setErro] = useState(null);
  const [expandedAgendamentos, setExpandedAgendamentos] = useState({});
  const [filtro, setFiltro] = useState('aguardando Orçamento');
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

  const handleClick = (id) => {
    setExpandedAgendamentos(prevExpandedAgendamentos => ({
      ...prevExpandedAgendamentos,
      [id]: !prevExpandedAgendamentos[id]
    }));
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

  const isServicoFinalizado = id => servicosFinalizados[id];

  return (
    <div>
      <Navebar />
      <div className='container-diag'>
        <div className='diagnosticos'>
          <h1 className='diag-h1'>Diagnósticos</h1>
          <div className='div-filtro'>
            <label htmlFor="filtro" className='text-filtro'>Filtrar por status:</label>
            <div className="filtro-buttons">
              <button className={`aguardando ${filtro === "aguardando" ? "active" : ""}`} onClick={() => setFiltro("aguardando")}>Aguardando</button>
              <button className={`aprovado ${filtro === "aprovado" ? "active" : ""}`} onClick={() => setFiltro("aprovado")}>Aprovado</button>
              <button className={`cancelado ${filtro === "cancelado" ? "active" : ""}`} onClick={() => setFiltro("cancelado")}>Cancelado</button>
              <button className={`concluido ${filtro === "finalizado" ? "active" : ""}`} onClick={() => setFiltro("finalizado")}>Concluído</button>
              <button className={`todos ${filtro === "aguardando Orçamento" ? "active" : ""}`} onClick={() => setFiltro("aguardando Orçamento")}>Enviar Orçamento</button>
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
                  {agendamentos.map(agendamento => (
                    <React.Fragment key={agendamento.id}>
                      <tr>
                        <td>{agendamento.nome}</td>
                        <td>{agendamento.cpf}</td>
                        <td>{agendamento.modelo}</td>
                        <td>{agendamento.placa}</td>
                        <td className='expandir'>
                          <button onClick={() => handleClick(agendamento.id)} className='button-expandir'>
                            {expandedAgendamentos[agendamento.id] ? '-' : '+'}
                          </button>
                        </td>
                      </tr>
                      {expandedAgendamentos[agendamento.id] && (
                        <tr key={`${agendamento.id}-detalhes`} className="detalhes">
                          <td colSpan="4">
                            <div className="detalhes-container">
                              <div className="dados-pessoais">
                                <h3>Dados Pessoais</h3>
                                <p>Nome: {agendamento.nome} {agendamento.sobrenome}</p>
                                <p>CPF: {agendamento.cpf}</p>
                                <p>Email: {agendamento.email}</p>
                                <p>Celular: {agendamento.celular}</p>
                              </div>
                              <div className="endereco">
                                <h3>Endereço</h3>
                                <p>CEP: {agendamento.cep}</p>
                                <p>Cidade: {agendamento.cidade}</p>
                                <p>Endereço: {agendamento.endereco}</p>
                              </div>
                              <div className="dados-carro">
                                <h3>Dados do Carro</h3>
                                <p>Placa: {agendamento.placa}</p>
                                <p>Modelo: {agendamento.modelo}</p>
                                <p>Motor: {agendamento.motor}</p>
                                <p>Cor: {agendamento.cor}</p>
                                <p>Ano: {agendamento.ano}</p>
                              </div>
                            </div>
                            <Upload agendamento_id={agendamento.id} />
                            {!isServicoFinalizado(agendamento.id) && (
                              <button onClick={() => finalizarServico(agendamento.id)} className='finalizar'>
                                Finalizar Serviço
                              </button>
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
    </div>
  );
}

export default Diagnosticos;