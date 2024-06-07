const admModel = require("../model/admModel");
const moment = require("moment");

module.exports = {
  exibir: (req, res) => {
    const { data, periodo, semana } = req.query;

    if (data && periodo) {
      // Filtrar por data e período
      admModel.getByDateAndPeriod(data, periodo, (err, results) => {
        if (err) {
          console.error("Erro ao buscar dados por data e período:", err);
          return res.status(500).json({ error: "Erro ao buscar dados do banco de dados" });
        }
        res.json(results);
      });
    } else if (semana) {
      // Filtrar pela semana toda
      const startDate = moment().startOf('isoWeek').format('YYYY-MM-DD');
      const endDate = moment().endOf('isoWeek').format('YYYY-MM-DD');

      admModel.getByDateRange(startDate, endDate, (err, results) => {
        if (err) {
          console.error("Erro ao buscar dados por intervalo de datas:", err);
          return res.status(500).json({ error: "Erro ao buscar dados do banco de dados" });
        }
        res.json(results);
      });
    } else {
      // Mostrar todos os agendamentos a partir de hoje
      const hoje = moment().format('YYYY-MM-DD');
      const fim = moment('2099-12-31').format('YYYY-MM-DD');

      admModel.getByDateRange(hoje, fim, (err, results) => {
        if (err) {
          console.error("Erro ao buscar todos os agendamentos:", err);
          return res.status(500).json({ error: "Erro ao buscar dados do banco de dados" });
        }
        res.json(results);
      });
    }
  },

  getCompleteDataById: (req, res) => {
    const { id } = req.params;
    
    admModel.getCompleteDataById(id, (err, result) => {
      if (err) {
        console.error("Erro ao obter dados completos:", err);
        res.status(500).send("Erro ao obter dados completos");
      } else {
        res.status(200).json(result);
      }
    });
  },
};
