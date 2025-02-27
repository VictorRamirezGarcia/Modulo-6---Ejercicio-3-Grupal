import { useEffect, useState } from 'react';

// Definir la base de datos y el store
const DB_NAME = 'HospitalDB';
const DB_VERSION = 8; // Incrementa la versión si es necesario
const STORE_NAME = 'patientVisits';

// Crear o abrir la base de datos
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    // Crear object store si no existe
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('medicalHistory', 'medicalHistory', { unique: false });
        objectStore.createIndex('lastVisit', 'lastVisit', { unique: false });
        console.log('Object store creado correctamente');
      } else {
        console.log('Object store ya existe');
      }
    };

    request.onsuccess = () => {
      console.log('Base de datos abierta correctamente');
      resolve(request.result);
    };

    request.onerror = (event) => {
      console.error('Error al abrir la base de datos:', event.target.error);
      reject(event.target.error);
    };
  });
};

// Guardar un nuevo paciente
const savePatientVisit = async (patientData) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.add(patientData);

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve('Registro guardado correctamente');
      transaction.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    console.error('Error guardando el registro en IndexedDB:', error);
  }
};

// Obtener todos los registros de pacientes
const getPatientVisits = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = async () => {
      const db = request.result;
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const allVisitsRequest = store.getAll();

      allVisitsRequest.onsuccess = () => resolve(allVisitsRequest.result);
      allVisitsRequest.onerror = (event) => reject(event.target.error);
    };

    request.onerror = (event) => reject(event.target.error);
  });
};

// Componente principal
export function PatientRecords() {
  const [patients, setPatients] = useState([]); // Para almacenar los pacientes
  const [newPatient, setNewPatient] = useState({ name: '', medicalHistory: '', lastVisit: '' });

  // Cargar pacientes al cargar el componente
  useEffect(() => {
    const loadPatients = async () => {
      const visits = await getPatientVisits();
      setPatients(visits);
    };
    loadPatients();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPatient.name && newPatient.medicalHistory && newPatient.lastVisit) {
      // Guardar paciente
      await savePatientVisit(newPatient);

      // Limpiar los campos del formulario
      setNewPatient({ name: '', medicalHistory: '', lastVisit: '' });

      // Recargar los pacientes
      const updatedVisits = await getPatientVisits();
      setPatients(updatedVisits);
    } else {
      alert('Por favor completa todos los campos');
    }
  };

  return (
    <div>
      <h1>Registros de Pacientes</h1>
      <p>Esta página solo es accesible para administradores</p>
      
      {/* Mostrar la tabla de pacientes */}
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Historial Médico</th>
            <th>Última Consulta</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.medicalHistory}</td>
              <td>{patient.lastVisit}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para registrar una nueva visita */}
      <h3>Registrar nueva visita</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del paciente"
          value={newPatient.name}
          onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Historial médico"
          value={newPatient.medicalHistory}
          onChange={(e) => setNewPatient({ ...newPatient, medicalHistory: e.target.value })}
          required
        />
        <input
          type="date"
          placeholder="Última consulta"
          value={newPatient.lastVisit}
          onChange={(e) => setNewPatient({ ...newPatient, lastVisit: e.target.value })}
          required
        />
        <button type="submit">Registrar Visita</button>
      </form>
    </div>
  );
}