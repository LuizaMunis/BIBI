const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "c@tolic@",
  database: "bibi",
});

// Métodos de login
const getByEmail = (email, callback) => {
  db.query("SELECT * FROM adm WHERE email = ?", [email], callback);
};

const comparePassword = (senha, hash, callback) => {
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
    SELECT agendamento.*, veiculo.*, cliente.*, agendamento.data
    FROM agendamento 
    JOIN veiculo ON agendamento.id_veiculo = veiculo.placa
    JOIN cliente ON veiculo.id_cliente = cliente.cpf 
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
  let sql = `SELECT agendamento.*, veiculo.*, cliente.*, agendamento.data
             FROM agendamento 
             JOIN veiculo ON agendamento.id_veiculo = veiculo.placa
             JOIN cliente ON veiculo.id_cliente = cliente.cpf
             LEFT JOIN diagnostico ON agendamento.id = diagnostico.agendamento_id
             WHERE agendamento.data <= CURDATE()`;
  
  if (status) {
    sql += ` AND diagnostico.resposta = ?`;
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
