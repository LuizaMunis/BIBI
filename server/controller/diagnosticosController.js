const admModel = require('../model/admModel');

module.exports = {
  setUpload: async (req, res) => {
    try {
      const agendamento_id = req.params.agendamento_id;
      const files = req.files;

      if (!agendamento_id) { //vê se o id foi passado
        return res.status(400).json({ error: 'Por favor, forneça o ID do agendamento.' });
      }

      if (!files || files.length === 0) { //vê se files está vazia ou tem complemento 0
        return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
      }

      // Mapeia os arquivos para extrair os dados necessários
      const pdf = files.map(file => ({//Para extrair informações específicas de cada elemento do array files e criar um novo array pdf com essas informações.
        name: file.originalname, //nome
        mimetype: file.mimetype, //tipo
        size: file.size,         //tamanho
        data: file.buffer,       // os dados binarios
      }));

      // Chama a função upload do modelo e trata os erros, se houverem
      admModel.upload(agendamento_id, pdf, (err, result) => {
        if (err) {
          console.error('Erro ao fazer upload do PDF:', err);
          return res.status(500).json({ error: 'Erro ao fazer upload do PDF.' });
        }
        return res.status(200).json({ message: 'Upload do PDF realizado com sucesso.' });
      });
    } catch (error) {
      console.error('Erro ao fazer upload do PDF:', error);
      return res.status(500).json({ error: 'Erro ao fazer upload do PDF.' });
    }
  },
};
