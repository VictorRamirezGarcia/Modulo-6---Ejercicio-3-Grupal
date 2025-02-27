// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthorizedRoute } from './components/AuthorizedRoute';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { MedicalTeam } from './pages/MedicalTeam';
import { PatientRecords } from './pages/PatientRecords';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/" element={<Login />} />
        
        <Route path="/home" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AuthorizedRoute allowedRoles={['doctor', 'admin']} />}>
            <Route path="/medical-team" element={<MedicalTeam />} />
          </Route>
          
          <Route element={<AuthorizedRoute allowedRoles={['admin']} />}>
            <Route path="/patient-records" element={<PatientRecords />} />
          </Route>
        </Route>

        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
      </Router>
  );
}

export default App;