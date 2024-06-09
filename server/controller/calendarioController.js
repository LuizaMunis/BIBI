const admModel = require("../model/admModel");
const moment = require("moment");

module.exports = {
  exibir: (req, res) => {
    const hoje = moment().format('YYYY-MM-DD');
    const proximos7Dias = moment().add(7, 'days').format('YYYY-MM-DD');

    admModel.getByDateRange(hoje, proximos7Dias, (err, results) => {
        if (err) {
            console.error("Erro ao buscar dados por intervalo de datas:", err);
            return res.status(500).json({ error: "Erro ao buscar dados do banco de dados" });
        }
        res.json(results);
    });
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