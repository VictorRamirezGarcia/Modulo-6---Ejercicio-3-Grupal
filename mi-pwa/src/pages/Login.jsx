// pages/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validUsers = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'doctor', password: 'doctor456', role: 'doctor' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = validUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      console.log('user role del login:' + user.role);
      localStorage.setItem('authToken', 'mockToken123');
      localStorage.setItem('userRole', user.role);

      // Guardar el log de ingreso en localStorage
      saveLoginLog(username);

      // Actualizar los registros en el estado local (para mostrar al usuario)
      getLoginLogs();

      navigate('/home');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <p>___________________________________</p>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usuario">Usuario:</label>
          <input
            id='usuario'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            id='contraseña'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      <p>___________________________________</p>
      <p>___________________________________</p>
      <p>Registros de Ingresos</p>
      <pre style={{ background: 'aliceblue', padding: '10px', borderRadius: '5px' }}>
        {getLoginLogsAsString() || "No hay registros de ingreso disponibles."}
      </pre>
    </div>
  );
}

const saveLoginLog = (username) => {
  const currentDate = new Date().toLocaleString();

  const logEntry = {
    username,
    date: currentDate,
  };

  const existingLogs = JSON.parse(localStorage.getItem('loginLogs') || '[]');
  existingLogs.push(logEntry);
  localStorage.setItem('loginLogs', JSON.stringify(existingLogs));

  console.log('Log de ingreso guardado:', logEntry);
};

const getLoginLogs = () => {
  // Recuperar los logs guardados en localStorage
  const logs = JSON.parse(localStorage.getItem('loginLogs') || '[]');
  console.log('Registros de ingreso:', logs);
  return logs;
};

const getLoginLogsAsString = () => {
  // Recuperar los logs guardados en localStorage
  const logs = JSON.parse(localStorage.getItem('loginLogs') || '[]');

  // Crear un string con los logs
  const logString = logs
    .map((log, index) => {
      return `${index + 1}. ${log.username} ingresó el ${log.date}`;
    })
    .join('\n'); // Unir cada log con un salto de línea

  return logString;
};
