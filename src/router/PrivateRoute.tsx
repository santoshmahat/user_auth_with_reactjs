import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: ComponentType;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, isAuthenticated }) => {
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;