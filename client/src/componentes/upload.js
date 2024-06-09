import { useState, useRef, useEffect } from 'react';

function Upload({ agendamento_id }) {
  const filesElement = useRef(null);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    // Verifica se o arquivo já foi enviado ao carregar a página
    const enviadoLocal = localStorage.getItem('enviado');
    if (enviadoLocal === 'true') {
      setEnviado(true);
    }
  }, []);

  const sendFile = async () => {
    const dataForm = new FormData();
    for (const file of filesElement.current.files) {
      dataForm.append('file', file);
    }
    const res = await fetch(`http://localhost:3001/uploads/${agendamento_id}`, {
      method: 'POST',
      body: dataForm,
    });
    const data = await res.json();
    console.log(data);
    setEnviado(true); // Define o estado como "enviado" após o envio do arquivo
    localStorage.setItem('enviado', 'true'); // Salva o estado "enviado" no armazenamento local
  };

  return (
    <div>
      {!enviado ? ( // Aparece o input e o botão apenas se não tiver sido enviado
        <>
          <input type="file" multiple ref={filesElement} />
          <button onClick={sendFile}>Enviar arquivo</button>
        </>
      ) : (
        <p>Enviado</p> // Renderiza a mensagem "Enviado" se o arquivo já tiver sido enviado
      )}
    </div>
  );
}

export default Upload;
