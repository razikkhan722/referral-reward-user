import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

// Assets
import Logo from '../../../assets/icons/logo/logo.svg';

// API Service
import { postData } from '../../../services/api';

// Global Context
import { DecryptFunction } from '../../../utils/decryptFunction';

// UseContext
import { UserContext } from '../../../UseContext/useContext';

// Toast Messages
import { toastError, toastSuccess } from '../../../utils/toster';

// React icon
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Global context setters
  const { setAuthLocal, setContextHomeDataAPI, setContextFaqsDataAPI,ContextsetCheckSpecialOffer } =
    useContext(UserContext);

  const navigate = useNavigate();

  // UseState
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form submit handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Login API call
      const response = await postData('/login/email-login', {
        password: data?.password,
        email: data?.email,
      });

      if (response?.mode) {
        // Store auth session
        sessionStorage.setItem('Auth', JSON.stringify(response));
        setAuthLocal(response);

        // Fetch encrypted home data
        const homeEncrypted = await postData('/home', {
          user_id: response?.user_id,
          log_alt: response?.log_alt,
          mode: response?.mode,
        });

        // Fetch FAQs data
        const faqsData = await postData('/admin/fetch-custom-data', {
          user_id: response?.user_id,
          log_alt: response?.log_alt,
          mode: response?.mode,
        });
        if(faqsData?.special_offer?.offer_code){
          ContextsetCheckSpecialOffer(true)
        }
        setContextFaqsDataAPI(faqsData);
        // Decrypt home data
        const decryptedHome = await DecryptFunction(homeEncrypted);
        setContextHomeDataAPI(decryptedHome);
        toastSuccess(response?.message);
        navigate('/');
      }
    } catch (error) {
      console.logtI(error)
      if (error?.error) {
        toastError(error?.error);
      } else {
        toastError(error?.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden" id='login-id'>
      <div className="login-bg-img">
        {/* Logo Header */}
        <div className="nav-logo text-center">
          <img className="header-center-img width-13" src={Logo} alt="logo" />
        </div>

        <div className="row p-4 d-flex justify-content-center align-items-center">
          <div className="col-lg-7">
            {/* Heading */}
            <div className="text-center mt-lg-0 mt-5">
              <p className="font-46 text-blue montserrat-bold mb-3">Login</p>
              <p className="text-blue montserrat-semibold font-20 pb-3">
                Log in to continue enjoying the perks and stay engaged with our
                exciting reward and referral program!
              </p>
            </div>

            {/* Login Form Section */}
            <div className="container">
              <div className="login-form-section row d-flex justify-content-center align-items-center py-3 px-3">
                {/* Left Side Image (Optional) */}
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="login-img side-login-bg d-flex align-items-center justify-content-center"></div>
                </div>

                {/* Right Side Form */}
                <div className="col-lg-6 col-md-12 col-12 d-flex align-items-center">
                  <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                    {/* Email / Username Input */}
                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control login-form py-2"
                        placeholder="Your Email / Username"
                        {...register('email', {
                          required: 'Email / Username is required',
                        })}
                      />
                      {errors.email && (
                        <div className="text-danger font-14">
                          {errors.email.message}
                        </div>
                      )}
                    </div>

                    {/* Password Input */}
                    <div className="mb-1 position-relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control login-form py-2"
                        placeholder="Password"
                        {...register('password', {
                          required: 'Password is required',
                        })}
                      />

                      {/* Show/Hide icon */}
                      <span
                        className="position-absolute end-0 top-50 translate-middle-y me-3"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? (
                          <FaEye size={20} />
                        ) : (
                          <FaEyeSlash size={20} />
                        )}
                      </span>
                      {errors.password && (
                        <div className="text-danger font-14">
                          {errors.password.message}
                        </div>
                      )}
                    </div>

                    {/* Forgot Password Link */}
                    <div className="pb-4 text-end">
                      <button
                        type="button"
                        className="text-blue font-12 montserrat-regular border-0 bg-transparent"
                        onClick={() => navigate('/forgotpassword')}
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex">
                      <NavLink
                        to="/loginOtp"
                        className="montserrat-semibold w-50 text-center mx-1 text-decoration-none font-16 py-2 rounded-3 bg-transparent border-blue text-blue"
                      >
                        Login with OTP
                      </NavLink>
                      <button
                        type="submit"
                        disabled={loading}
                        className="montserrat-semibold w-50 mx-1 font-16 py-2 rounded-3 border-0 background-text-blue text-white"
                      >
                        {loading ? 'Logging...' : 'Login'}
                      </button>
                    </div>

                    {/* Registration Prompt */}
                    <p className="font-12 montserrat-regular text-center mt-3 text-light-gray mb-0">
                      Not an existing user?{' '}
                      <NavLink
                        to="/registration"
                        className="text-blue font-14 montserrat-medium text-decoration-none"
                      >
                        Register Now
                      </NavLink>
                    </p>
                  </form>
                </div>
              </div>
            </div>
            {/* End Form Section */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
