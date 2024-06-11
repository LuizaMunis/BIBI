const admModel = require("../model/admModel");
const jwt = require('jsonwebtoken');
const SECRET = 'BrasiliaBibi'; 


//Compara a senha colocada com a que ta no banco, puza da  model.
module.exports = {
  login: (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    admModel.getByEmail(email, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Erro no servidor." });
      }

      if (result.length > 0) {
        admModel.comparePassword(senha, result[0].senha, (error, response) => {
          if (error) {
            return res.status(500).json({ error: "Erro na comparação de senhas." });
          }
          if (response) {
            //autenticação
            const token = jwt.sign({ userEmail: email }, SECRET, { expiresIn: '60min' });
            return res.json({ auth: true, token });
          } else {
            return res.status(401).json({ msg: "Senha incorreta." });
          }
        });
      } else {
        return res.status(404).json({ msg: "Usuário não registrado!" });
      }
    });
  },


};
