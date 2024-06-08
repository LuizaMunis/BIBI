const admModel = require("../model/admModel");
const moment = require('moment');

module.exports = {


getAll2: (req, res) => {
    admModel.getByAgendamento((err, result) => {
      if (err) {
        console.error('Erro ao buscar dados do banco de dados:', err);
        return res.status(500).json({ error: "Erro ao buscar dados do banco de dados" });
      } else {
        const hoje = moment().startOf('day'); // Início do dia atual
        const fim = moment('2024-12-31').endOf('day'); // Fim do dia 31 de dezembro de 2023
        console.log('Dados recebidos do backend:', result);
        if (Array.isArray(result)) { // Verificar se result é um array
          const hoje = moment().endOf('day'); // Fim do dia atual
          const ontem = moment().subtract(1, 'days').startOf('day'); // Início do dia de ontem
          
          const filteredResults = result.filter(agendamento => {
            const dataAgendamento = moment(agendamento.data_agendamento);
            // Verificar se a data do agendamento está entre o início do dia de ontem e o fim do dia de hoje
            return dataAgendamento.isBetween(ontem, hoje, null, '[]');
          });
          
          console.log('Resultados filtrados:', filteredResults); // Adicione este console.log para debugging
          res.status(200).json(filteredResults);
        } else {
          res.status(200).json([]); // Retornar um array vazio se result não for um array
        }
      }
    });
  },

  filter :(req, res) => {
    const { status } = req.query; // Acessando o parâmetro "status" da consulta
    admModel.filterByStatus(status, (err, result) => {
      if (err) {
        console.error("Erro ao buscar dados por status:", err);
        return res.status(500).json({ error: "Erro ao buscar dados do banco de dados" });
      }
      res.json(result);
    });
  }
};
