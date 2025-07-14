import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../utils/UseContext/useContext';

const ProtectedRoute = ({ children }) => {
  const { AuthLocal, setAuthLocal } = useContext(UserContext);
let isAuthenticated;
isAuthenticated = JSON?.parse(sessionStorage.getItem('Auth')); // or use Redux/store
console.log('isAuthenticated: ', isAuthenticated);
  useEffect(() => {

  }, [AuthLocal]);

  if (!AuthLocal?.mode || !isAuthenticated?.mode ) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
