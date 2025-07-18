import React, { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// Auth Screens
import Login from '../../pages/auth/login/login';
import LoginOtp from '../../pages/auth/login/loginOtp';
import Registration from '../../pages/auth/registration/registration';
import SendOtpForgotPassword from '../../pages/auth/forgotPassword/forgotPassword';
import ConfirmForgotPasswordOtp from '../../pages/auth/forgotPassword/confirmForgotPWOtp';
import ResetPassword from '../../pages/auth/forgotPassword/resetPassword';
import Profile from '../../pages/profile/profile';
import UserFaqs from '../../pages/auth/userFaqs';
import Product from '../../pages/auth/subscription/product';

// Other Screens
import Home from '../../pages/home/home';
import MyRewardFirstScreen from '../../pages/myReward/myRewardSection';
import MyReferralScreen from '../../pages/MyReferral/MyReferralScreen';
import Invitefriend from '../../pages/InviteFriend/inviteFriend';
import Error from '../../pages/Errror/error';

// Contexts and Utils
import {UserContext} from "../../UseContext/useContext"
import { postData } from '../../services/api';
// import {DecryptFunction} from "../../UseContext/useContext"
import {DecryptFunction} from "../../utils/decryptFunction"

const AppRoutes = () => {
  const {
    setContextHomeDataAPI,
    AuthLocal,
    setContextFaqsDataAPI,
    setAuthLocal,
  } = useContext(UserContext);

  const [loading, setLoading] = useState(true); // Manage route protection check

  const Auth = JSON?.parse(sessionStorage.getItem('Auth') ?? '{}');

  // Fetch Home and FAQ data after login
  const HandleAPI = async () => {
    try {
      const encryptedHomeData = await postData('/home', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
      });
      const decryptedHomeData = await DecryptFunction(encryptedHomeData);
      setContextHomeDataAPI(decryptedHomeData);

      const faqsData = await postData('/admin/fetch-custom-data', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
      });
      setContextFaqsDataAPI(faqsData);
    } catch (error) {
      console.log('HandleAPI error: ', error);
    }
  };

  // Load user context once at app mount
  useEffect(() => {
    HandleAPI(); // This fetches and sets context data if session exists
  }, []);

  // Get AuthLocal from session and set it in context
  useEffect(() => {
    const getValue = JSON.parse(sessionStorage.getItem('Auth') ?? 'null');
    setAuthLocal(getValue?.mode ?? null);
    setLoading(false);
  }, []);

  // Show nothing while checking auth (optional: replace with loader/spinner)
  if (loading) return null;

  return (
    <Router>
      <Routes>
        {/* Root route - redirects based on auth */}
        {!AuthLocal && (
          <Route path="/" element={<Navigate to="/login" replace />} />
        )}
        {AuthLocal && <Route path="/" element={<Home />} />}

        {/* Public Auth Routes (Redirect if already authenticated) */}
        <Route
          path="/login"
          element={AuthLocal ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/forgotpassword"
          element={
            AuthLocal ? <Navigate to="/" replace /> : <SendOtpForgotPassword />
          }
        />
        <Route
          path="/confirmforgotPasswordotp"
          element={
            AuthLocal ? (
              <Navigate to="/" replace />
            ) : (
              <ConfirmForgotPasswordOtp />
            )
          }
        />
        <Route
          path="/resetpassword"
          element={AuthLocal ? <Navigate to="/" replace /> : <ResetPassword />}
        />
        <Route
          path="/loginOtp"
          element={AuthLocal ? <Navigate to="/" replace /> : <LoginOtp />}
        />
        <Route
          path="/registration"
          element={AuthLocal ? <Navigate to="/" replace /> : <Registration />}
        />

        <Route
          path="/invite-link/:id/:source"
          element={AuthLocal ? <Navigate to="/" replace /> : <Registration />}
        />
        <Route
          path="/invite-link/:id"
          element={AuthLocal ? <Navigate to="/" replace /> : <Registration />}
        />
        <Route
          path="/subscription"
          element={AuthLocal ? <Navigate to="/" replace /> : <Product />}
        />

        {/* Protected Routes (Require authentication) */}
        <Route
          path="/reward"
          element={
            AuthLocal ? (
              <MyRewardFirstScreen />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/referral"
          element={
            AuthLocal ? <MyReferralScreen /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/profile"
          element={AuthLocal ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile-faqs"
          element={AuthLocal ? <UserFaqs /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/invitefriend"
          element={
            AuthLocal ? <Invitefriend /> : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all route - shows Error component */}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
    
  );
};

export default AppRoutes;
