// import React, { useContext, useEffect, useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from 'react-router-dom';

// import Login from '../../pages/auth/login';
// // import NotFound from "../pages/NotFound";
// import LoginOtp from '../../pages/auth/loginOtp';
// import Registration from '../../pages/auth/registration';
// import Product from '../../pages/auth/product';
// import Home from '../../pages/home/home';
// import MyRewardFirstScreen from '../../pages/myReward/myRewardSection';
// import MyReferralScreen from '../../pages/MyReferral/MyReferralScreen';
// import SendOtpForgotPassword from '../../pages/auth/forgotPassword';
// import ConfirmForgotPasswordOtp from '../../pages/auth/confirmForgotPWOtp';
// import ResetPassword from '../../pages/auth/resetPassword';
// import Profile from '../../pages/auth/profile';
// import { UserContext } from '../../utils/UseContext/useContext';
// import { postData } from '../../services/api';
// import { DecryptFunction } from '../../utils/decryptFunction';
// import UserFaqs from '../../pages/auth/userFaqs';
// import Error from '../../pages/Errror/error';
// import Invitefriend from '../../pages/InviteFriend/inviteFriend';
// // import ProtectedRoute from '../protectedRoute';

// const AppRoutes = () => {
//   const {
//     setContextHomeDataAPI,
//     AuthLocal,
//     setContextFaqsDataAPI,
//     setAuthLocal,
//   } = useContext(UserContext);
//   const Auth = JSON?.parse(sessionStorage.getItem('Auth') ?? '{}');
//   const HandleAPI = async () => {
//     try {
//       const enyptData = await postData('/home', {
//         user_id: Auth?.user_id,
//         log_alt: Auth?.log_alt,
//         mode: Auth?.mode,
//       });
//       const Decrpty = await DecryptFunction(enyptData);
//       setContextHomeDataAPI(Decrpty);

//       // fetch-custom-data API for ALL FAQs
//       const FaqsData = await postData('/admin/fetch-custom-data', {
//         user_id: Auth?.user_id,
//         log_alt: Auth?.log_alt,
//         mode: Auth?.mode,
//       });
//       setContextFaqsDataAPI(FaqsData);
//     } catch (error) {
//       console.log('error: ', error);
//     }
//   };

//   useEffect(() => {
//     HandleAPI();
//   }, []);

//   // check if login or not functionality
//   // useEffect(() => {
//   //   let getvalue = JSON.parse(sessionStorage.getItem('Auth') ?? '[]');
//   //   setAuthLocal(getvalue?.mode);
//   // }, [AuthLocal]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getValue = JSON.parse(sessionStorage.getItem('Auth') ?? 'null');
//     setAuthLocal(getValue?.mode ?? null);
//     setLoading(false);
//   }, []);

//   if (loading) return null; // or a loading spinner

//   return (
//     <Router>
//       <Routes>
//         {/* Redirect unauthenticated access to root (/) to /login */}
//         {!AuthLocal && (
//           <Route path="/" element={<Navigate to="/login" replace />} />
//         )}
//         {AuthLocal && <Route path="/" element={<Home />} />}

//         {/* Public Routes */}
//         <Route
//           path="/login"
//           element={AuthLocal ? <Navigate to="/" replace /> : <Login />}
//         />
//         <Route
//           path="/forgotpassword"
//           element={
//             AuthLocal ? <Navigate to="/" replace /> : <SendOtpForgotPassword />
//           }
//         />
//         <Route
//           path="/confirmforgotPasswordotp"
//           element={
//             AuthLocal ? (
//               <Navigate to="/" replace />
//             ) : (
//               <ConfirmForgotPasswordOtp />
//             )
//           }
//         />
//         <Route
//           path="/resetpassword"
//           element={AuthLocal ? <Navigate to="/" replace /> : <ResetPassword />}
//         />
//         <Route
//           path="/loginOtp"
//           element={AuthLocal ? <Navigate to="/" replace /> : <LoginOtp />}
//         />
//         <Route
//           path="/registration"
//           element={AuthLocal ? <Navigate to="/" replace /> : <Registration />}
//         />
//         <Route
//           path="/invite-link/:id"
//           element={AuthLocal ? <Navigate to="/" replace /> : <Registration />}
//         />
//         <Route
//           path="/subscription"
//           element={AuthLocal ? <Navigate to="/" replace /> : <Product />}
//         />

//         {/* Protected Routes */}
//         <Route
//           path="/reward"
//           element={
//             AuthLocal ? (
//               <MyRewardFirstScreen />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//         <Route
//           path="/referral"
//           element={
//             AuthLocal ? <MyReferralScreen /> : <Navigate to="/login" replace />
//           }
//         />
//         <Route
//           path="/profile"
//           element={AuthLocal ? <Profile /> : <Navigate to="/login" replace />}
//         />
//         <Route
//           path="/profile-faqs"
//           element={AuthLocal ? <UserFaqs /> : <Navigate to="/login" replace />}
//         />
//         <Route
//           path="/invitefriend"
//           element={
//             AuthLocal ? <Invitefriend /> : <Navigate to="/login" replace />
//           }
//         />

//         {/* Catch-all route */}
//         <Route path="*" element={<Error />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;
