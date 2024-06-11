const express = require("express");
const app = express();
const cors = require("cors");
const multer = require('multer');

const admController = require("./controller/admController");
const calendarioController = require("./controller/calendarioController");
const clienteController = require ("./controller/clienteController");
const diagnosticosController=require("./controller/diagnosticosController")
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//variável que contém a configuração para o local onde os arquivos serão armazenados.

app.use(express.json());
app.use(cors());


app.post("/login", admController.login);
app.get("/calendario", calendarioController.exibir);
app.get("/diagnosticos", clienteController.getAll2 );
app.get('/diagnosticos/filtrar', clienteController.filter);
app.put('/diagnosticos/finalizar/:id', clienteController.finalizar);
//indica que vai recber um ou mais arquivos chamado file, dai vai processar e anexar no req.files
app.post('/uploads/:agendamento_id', upload.array('file'), diagnosticosController.setUpload);

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});