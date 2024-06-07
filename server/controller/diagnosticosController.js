const admModel = require("../model/admModel");

module.exports = {
  setUpload: async (req, res) => {
    try {
      const agendamento_id = req.params.agendamento_id;
      const files = req.files;

      // Verifica se o ID do agendamento foi fornecido
      if (!agendamento_id) {
        return res.status(400).json({ error: "Por favor, forneça o ID do agendamento." });
      }

      // Verifica se foram enviados arquivos
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "Nenhum arquivo enviado." });
      }

      // Mapeia os arquivos para extrair os dados necessários
      const pdf = files.map(file => ({
        name: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        data: file.buffer,
      }));

      // Chama a função upload do modelo e trata os erros, se houverem
      await admModel.upload(agendamento_id, pdf);
      
      // Se não houver erros, retorna uma resposta de sucesso
      return res.status(200).json({ message: "Upload do PDF realizado com sucesso." });
    } catch (error) {
      console.error("Erro ao fazer upload do PDF:", error);
      return res.status(500).json({ error: "Erro ao fazer upload do PDF." });
    }
  }
};
