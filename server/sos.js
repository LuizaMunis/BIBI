const mysql = require('mysql2/promise');
const fs = require('fs');

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "c@tolic@",
  database: "bibi",
});

const query = 'SELECT pdf FROM diagnostico WHERE id = ?';

(async () => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute(query, [8]); 

    if (rows.length > 0) {
      const pdfBuffer = rows[0].pdf;

      fs.writeFileSync('file.pdf', Buffer.from(pdfBuffer, 'binary')); 

      console.log('Arquivo PDF salvo com sucesso.');
    } else {
      console.log('Nenhum resultado encontrado.');
    }

    await connection.release();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar a consulta SQL:', error);
    process.exit(1); 
  }
})();
