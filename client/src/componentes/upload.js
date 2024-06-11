import { useState, useRef, useEffect } from 'react';

function Upload({ agendamento_id }) {
  const filesElement = useRef(null);
  const [enviado, setEnviado] = useState(() => {
    const enviadoLocal = localStorage.getItem('enviado');
    return enviadoLocal === 'true';
  });

  useEffect(() => {
    // Verifica se o arquivo já foi enviado ao carregar a página
    const enviadoLocal = localStorage.getItem('enviado');
    if (enviadoLocal === 'true') {
      setEnviado(true);
    }

    // Cleanup effect: remove 'enviado' from localStorage 
    return () => {
      localStorage.removeItem('enviado');
    };
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
    setEnviado(true); // Define como "enviado" após o envio do arquivo
    localStorage.setItem('enviado', 'true'); // Salva  "enviado" no armazenamento local
  };

  return (
    <div className="upload-container">
      {!enviado ? ( // Aparece o input e o botão apenas se não tiver sido enviado
        <>
          <input type="file" multiple ref={filesElement} className="file-input" />
          <button onClick={sendFile} className="upload-button">Enviar arquivo</button>
        </>
      ) : (
        <p>Enviado</p> // Renderiza a mensagem "Enviado" se o arquivo já tiver sido enviado
      )}
    </div>
  );
}

export default Upload;
