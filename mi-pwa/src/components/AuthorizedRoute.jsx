// import { useAuth } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthorizedRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem('userRole');

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
