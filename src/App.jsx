import React from 'react';
// import './styles/_common.scss';
// import './styles/_mixins.scss';
// import './styles/_function.scss';
// import './styles/_variables.scss';
// import './styles/main.scss';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AppRoutes from './routes/appRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './utils/UseContext/useContext';
import Product from './pages/auth/product';
import UserFaqs from './pages/auth/userFaqs';

function App() {
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <AppRoutes />
      </UserProvider>
      {/* <UserFaqs/> */}
    </>
  );
}

export default App;
