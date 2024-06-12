import { useState, useRef, useEffect } from 'react';

function Upload({ agendamento_id }) {
  const filesElement = useRef(null);
  const [enviado, setEnviado] = useState(() => {
    // Verifica se o arquivo já foi enviado ao carregar a página
    const enviadoLocal = localStorage.getItem(`enviado_${agendamento_id}`);
    return enviadoLocal === 'true';
  });

  useEffect(() => {
    // Verifica se o arquivo já foi enviado ao carregar a página
    const enviadoLocal = localStorage.getItem(`enviado_${agendamento_id}`);
    if (enviadoLocal === 'true') {
      setEnviado(true);
    }
  }, [agendamento_id]); // Executa apenas quando o agendamento_id mudar

  const sendFile = async () => {
    const dataForm = new FormData();
    for (const file of filesElement.current.files) {
      dataForm.append('file', file);
    }
    const res = await fetch(`http://localhost:3001/uploads/${agendamento_id}`, {
      method: 'POST',
      body: dataForm,
    });
    setEnviado(true); // Define como "enviado" após o envio do arquivo
    localStorage.setItem(`enviado_${agendamento_id}`, 'true'); // Salva "enviado" no armazenamento local para este agendamento específico
  };

  return (
    <div className="upload-container">
      {!enviado ? ( // Aparece o input e o botão apenas se não tiver sido enviado
        <>
          <input type="file" multiple ref={filesElement} className="file-input" />
          <button onClick={sendFile} className="upload-button">Enviar arquivo</button>
        </>
      ) : (
        <p className='enviado'>Orçamento Enviado</p> // Renderiza a mensagem "Enviado" se o arquivo já tiver sido enviado
      )}
    </div>
  );
}

export default Upload;
