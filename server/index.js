const express = require("express");
const app = express();
const cors = require("cors");
const multer = require('multer');

const admController = require("./controller/admController");
const calendarioController = require("./controller/calendarioController");
const clienteController = require ("./controller/clienteController");
const diagnosticosController=require("./controller/diagnosticosController")

app.use(express.json());
app.use(cors());


app.post("/login", admController.login);
app.get("/calendario", calendarioController.exibir);
app.get("/diagnosticos", clienteController.getAll2 );

const upload = multer({ dest: './uploads/',});

app.post('/uploads/:agendamento_id', upload.array('file'), async (req, res, next) => {
  console.log(`Files received: ${req.files.length}`);
  try {
    await diagnosticosController.setUpload(req, res);
  } catch (error) {
    next(error); // Encaminha o erro para o próximo middleware de tratamento de erro
  }
});


app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});