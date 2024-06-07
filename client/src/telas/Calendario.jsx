import React, { useState, useEffect} from 'react';
import Axios from 'axios';
import Navebar from '../componentes/navebar';

function Calendario() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [mostrarTodos, setMostrarTodos] = useState(true);
  const [periodo, setPeriodo] = useState('');
  const [semana, setSemana] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null); // Estado para controlar o item expandido

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:3001/calendario';
        if (semana) {
          url += '?semana=true';
        } else if (dataSelecionada && periodo) {
          url += `?data=${dataSelecionada}&periodo=${periodo}`;
        } else if (dataSelecionada) {
          url += `?data=${dataSelecionada}`;
        }

        const response = await Axios.get(url);
        setAgendamentos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dataSelecionada, periodo, semana, mostrarTodos]);

  
  const handleClick = (item) => {
    // Se o item clicado já estiver expandido, fecha ele
    if (expandedItem === item.id) {
      setExpandedItem(null);
    } else {
      // Se não, expande o item clicado
      setExpandedItem(item.id);
    }
  };
  
  return (
    <div>
      <Navebar />
      <h1>Agendados</h1>
      <div>
        <label htmlFor="data">Selecione uma data:</label>
        <input type="date" id="data" value={dataSelecionada} onChange={(e) => setDataSelecionada(e.target.value)}/>
        <label htmlFor="periodo">Período:</label>
        <select id="periodo" value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
          <option value="">Todos</option>
          <option value="manha">Manhã</option>
          <option value="tarde">Tarde</option>
        </select>
        <button onClick={() => setMostrarTodos(!mostrarTodos)}>{mostrarTodos ? 'Filtrar' : 'Mostrar Todos'}</button>
        <button onClick={() => setSemana(!semana)}>{semana ? 'Filtrar por Data' : 'Mostrar Semana'}</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data</th>
            <th>Período</th>
            <th>Cliente</th>
            <th>Veículo</th>
          </tr>
        </thead>
        <tbody>
          <React.Fragment key="agendamentos">
            {agendamentos.map((item) => (
              <React.Fragment key={item.id}>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.data}</td>
                  <td>{item.periodo}</td>
                  <td>{item.id_cliente}</td>
                  <td>
                    <button onClick={() => handleClick(item)}> {expandedItem === item.id ? 'Esconder' : 'Ver Detalhes'}</button>
                  </td>
                </tr>
                {/* Mostra os detalhes do cliente se o item estiver expandido */}
                {expandedItem === item.id && (
                  <tr key={`${item.id}-detalhes`}>
                    <td colSpan="5">
                      <div>
                        <p>Detalhes do Cliente:</p>
                        <p>Nome: {item.nome}</p>
                        <p>Email: {item.email}</p>
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

  );
}

export default Calendario;
