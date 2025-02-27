import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();
    
    // Obtener el rol del usuario desde el localStorage
    const userRole = localStorage.getItem('userRole');
    console.log('user role del login:' + userRole);

    // Elimina la referencia a 'path' y pasa directamente la ruta a navigate
    const handleNavigation = (route) => {
        navigate(route);
    };

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        // Eliminar el authToken y el userRole del localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        
        // Redirigir al login
        navigate('/');
    };

    const UltimoUsuarioLogeado = sessionStorage.getItem('usuario');

    return (
        <div className="text-center">
            <h1><strong>Rol de ultimo usuario logeado es: {UltimoUsuarioLogeado ? UltimoUsuarioLogeado : 'No definido'}</strong></h1>
            <h2>Bienvenido al Sistema de Reservas</h2>

            {/* Mostrar el rol logueado */}
            <p><strong>Rol de usuario logeado actual es: {userRole ? userRole : 'No definido'}</strong></p>

            <p>Elige una opción:</p>
            
            {/* Mostrar Medical Team solo si el rol es 'doctor' o 'admin' */}
            {(userRole === 'doctor' || userRole === 'admin') && (
                <button
                    className="btn btn-success mx-2"
                    onClick={() => handleNavigation('/medical-team')}
                >
                    Medical Team
                </button>
            )}

            {/* Mostrar Patient Records solo si el rol es 'admin' */}
            {userRole === 'admin' && (
                <button
                    className="btn btn-danger mx-2"
                    onClick={() => handleNavigation('/patient-records')}
                >
                    Patient Records
                </button>
            )}

            {/* Botón de salir */}
            <button
                className="btn btn-warning mx-2"
                onClick={handleLogout}
            >
                Salir
            </button>
        </div>
    );
};

export default Home;
