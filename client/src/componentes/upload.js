import { useRef } from 'react';

function Upload({ agendamento_id }) {
  const filesElement = useRef(null);

  const sendFile = async () => {
    const dataForm = new FormData();
    for (const file of filesElement.current.files) {
      // Atribua um nome específico para cada arquivo, por exemplo, 'pdf'
      dataForm.append('file', file);
    }
    const res = await fetch(`http://localhost:3001/uploads/${agendamento_id}`, {
      method: 'POST',
      body: dataForm,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <input type="file" multiple ref={filesElement} />
      <button onClick={sendFile}>Send file</button>
    </div>
  );
}

export default Upload;
