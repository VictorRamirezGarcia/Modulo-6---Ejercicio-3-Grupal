// pages/Dashboard.tsx
export function Dashboard() {
    return (
    <div>
        <h1>Bienvenido al Sistema del Hospital</h1>
        <p>Página pública principal</p>
        <nav>
        <ul>
            <li><a href="/medical-team">Equipo Médico</a></li>
            <li><a href="/patient-records">Registros de Pacientes</a></li>
        </ul>
        </nav>
    </div>
    );
}