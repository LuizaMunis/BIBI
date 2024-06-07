import{BrowserRouter as Router, Routes ,Route}from "react-router-dom";
import Login from './telas/Login';
import Diagnosticos from './telas/Diagnosticos';
import Perfil from "./telas/Perfil";
import Calendario from "./telas/Calendario";
import Proteger from './componentes/Proteger';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Diagnosticos" element={<Proteger><Diagnosticos /></Proteger>} />
        <Route path="/Calendario" element={<Proteger><Calendario /></Proteger>} />
        <Route path="/Perfil" element={<Proteger><Perfil /></Proteger>} />
      </Routes>
    </Router>
  );
}

export default App;
