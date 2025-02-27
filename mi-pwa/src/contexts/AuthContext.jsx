import { createContext, useContext, useState } from 'react';

// Crea el contexto sin alias de tipo
const AuthContext = createContext({
  isAuthenticated: false,
  userRole: null,
  login: () => {},
  logout: () => {},
});

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Recupera el estado inicial desde localStorage
  const [userRole, setUserRole] = useState(localStorage.getItem("authRole") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authRole"));

  const login = (role) => {
    console.log('Iniciando sesión con rol:' + role);  // Verifica que el rol se pase correctamente
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("authRole", role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("authRole");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
