const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const db = mysql.createPool({ //cria a conexãocom o banco de dados
  host: "localhost",
  user: "root",
  password: "c@tolic@",
  database: "bibi",
});

// Métodos de login
const getByEmail = (email, callback) => {
  db.query("SELECT * FROM adm WHERE email = ?", [email], callback);
};

const comparePassword = (senha, hash, callback) => { //o hash é a senha criptografada
  bcrypt.compare(senha, hash, callback);
};
//////////////////////////////////////////Agendamentos///////////////////////////////////
const getByDateRange = (startDate, endDate, callback) => {
  const sql = `
      SELECT *
      FROM agendamento
      JOIN veiculo ON agendamento.id_veiculo = veiculo.placa
      JOIN cliente ON veiculo.id_cliente = cliente.cpf
      WHERE DATE(agendamento.data) BETWEEN DATE(?) AND DATE(?)`;

  db.query(sql, [startDate, endDate], callback);
};

////////////////////////////////////////Diagnosticos/////////////////////////////////////////////////
const getByAgendamento = (callback) => {
  const sql = `
    SELECT agendamento.*, veiculo.*, cliente.*,endereco.*, agendamento.data
    FROM agendamento 
    JOIN veiculo ON agendamento.id_veiculo = veiculo.placa
    JOIN cliente ON veiculo.id_cliente = cliente.cpf 
    JOIN endereco ON cliente.id_endereco=endereco.id_end
    WHERE agendamento.data <= CURDATE()
  `;
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta SQL:', error);
    } else {
      console.log('Resultados da consulta SQL:', results);
    }
    callback(error, results);
  });
};

//////////////////upload////////////////////////

const upload = (agendamento_id, pdf, callback) => {
  // Loop através de cada arquivo PDF na matriz pdf
  pdf.forEach(file => {
    const sql = `INSERT INTO bibi.diagnostico(agendamento_id, pdf, resposta) VALUES (?, ?, ?)`;
    // Insere os dados binários do PDF na consulta SQL
    db.query(sql, [agendamento_id, file.data, 'aguardando'], callback);
  });
};

//////////////////status/////////////////////////////

const filterByStatus = (status, callback) => {
  let sql = `SELECT agendamento.*, veiculo.*, cliente.*,endereco.* 
             COALESCE(diagnostico.resposta, agendamento.status) as status
             FROM agendamento 
             JOIN veiculo ON agendamento.id_veiculo = veiculo.placa
             JOIN cliente ON veiculo.id_cliente = cliente.cpf
             JOIN endereco ON cliente.id_endereco=endereco.id_end
             LEFT JOIN diagnostico ON agendamento.id = diagnostico.agendamento_id
             WHERE agendamento.data <= CURDATE()`;

  if (status) { //se o status for passado, ele adiciona a consulta
      sql += ` AND COALESCE(diagnostico.resposta, agendamento.status) = ?`;//retorna o valor não nulo entre as duas tabelas.
  }

  db.query(sql, [status], callback);
};


//////////////////////////////////////////////////////////////////////

const finalizarServico = (id, callback) => {
  const sql = `UPDATE diagnostico SET resposta = 'finalizado' WHERE agendamento_id = ?`;
  db.query(sql, [id], callback);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {
  comparePassword,
  getByEmail,
  getByDateRange,
  getByAgendamento,
  upload,
  filterByStatus,
  finalizarServico,
};
