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
        if (Array.isArray(result)) {
          const filteredResults = result.filter(agendamento => {
            const dataAgendamento = moment(agendamento.data_agendamento);
            return dataAgendamento.isBefore(hoje, 'day'); // day para considerar o início do dia
          });
          res.status(200).json(filteredResults);
        } 
      }
    });
  },

  filter: (req, res) => {
    const { status } = req.query; 
    admModel.filterByStatus(status, (err, result) => {
        if (err) {
            console.error("Erro ao buscar dados por status:", err);
            return res.status(500).json({ error: "Erro ao buscar dados do banco de dados" });
        }
        res.json(result);
    });
 },


  finalizar: (req, res) => {
    const { id } = req.params;
    admModel.finalizarServico(id, (err, result) => {
      if (err) {
        console.error('Erro ao finalizar serviço:', err);
        return res.status(500).json({ error: "Erro ao finalizar serviço" });
      }
      res.status(200).json({ message: "Serviço finalizado com sucesso" });
    });
  }
};
