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
            const token = jwt.sign({ userEmail: email }, SECRET, { expiresIn: '60s' });
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

  //Pra ultizar  nas rotas que quero que seja protegida
  verifyJWT:(req, res,next)=>{
    const token= req.headers['x-access-token'];
    jwt.verify(token,SECRET,(err,decoded)=>{
      if(err) return res.status(401).end();

      req.userEmail=decoded.userEmail;
      next();
    });
  }

};
