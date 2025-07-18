import React from 'react';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppRoutes from './routes/appRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './UseContext/useContext';
import Product from './pages/auth/subscription/product';
import UserFaqs from './pages/auth/userFaqs';

function App() {
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </>
  );
}

export default App;
