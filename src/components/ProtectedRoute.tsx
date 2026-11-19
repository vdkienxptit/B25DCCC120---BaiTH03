import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const viTriHienTai = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ trangTruocDo: viTriHienTai }} replace />;
  }

  return <>{children}</>;
};