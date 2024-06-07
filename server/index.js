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

app.use(express.json());
app.use(cors());


app.post("/login", admController.login);
app.get("/calendario", calendarioController.exibir);
app.get("/diagnosticos", clienteController.getAll2 );


app.post('/uploads/:agendamento_id', upload.array('file'), diagnosticosController.setUpload);



app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});