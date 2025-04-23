// src/components/ProtectedRoute/ProtectedRoute.tsx
import React, { useEffect, useState, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, User } from 'firebase/auth';

interface ProtectedRouteProps {
  element: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const user: User | null = auth.currentUser;

    setIsAuthenticated(user ? true : false);
  }, []);

  if (isAuthenticated === null) {
    // You can return a loading spinner or similar here
    return <div>Loading...</div>;
  }

  // If the user is authenticated, return the element; else, redirect to login
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
