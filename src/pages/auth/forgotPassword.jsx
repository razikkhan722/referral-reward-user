import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// Assets icons
import Loginimg from '../../assets/icons/auth/login-side.svg';
import Logo from '../../assets/icons/logo/logo.svg';

// React Router
import { useNavigate } from 'react-router-dom';
import { postData } from '../../services/api';
import { toastError, toastSuccess } from '../../utils/toster';

const SendOtpForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' }); // Enable real-time validation



  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Manage loading state

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await postData('/login/forgot-password', {
        email: data?.contact,
      });

      if (response?.success) {
        toastSuccess(response?.message)
        sessionStorage.setItem("email",data?.contact)
        navigate('/confirmforgotPasswordotp');
      }
    } catch (error) {
      toastError(error?.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg-img">
      <div className="nav-logo text-center">
        <img className="header-center-img width-13" src={Logo} alt="logo" />
      </div>
      <div className="row p-4 d-flex justify-content-center align-items-center">
        <div className="col-lg-7">
          <div className="text-center mt-5">
            <p className="font-size-46 text-blue montserrat-bold mb-3">
              Forgot Password
            </p>
            <p className="text-blue montserrat-semibold font-size-20 pb-3">
              Forgot your password? Don’t worry, we’ll help you reset it!
            </p>
          </div>
          <div className="login-form-section row py-3 px-3 d-flex justify-content-center">
            <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center">
              <div className="login-img">
                <img src={Loginimg} alt="Loading" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <h3 className="montserrat-medium font-14 text-blue mb-3">
                Enter your Email and we will send you a verification code!
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <input
                    type="text"
                    className="form-control login-form py-2"
                    id="exampleFormControlInput1"
                    placeholder="Your Email"
                    {...register('contact', {
                      required: 'Email is required',
                      validate: (value) => {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        const numberRegex = /^\d{10}$/;

                        if (emailRegex.test(value)) {
                          return true; // valid email
                        } else if (numberRegex.test(value)) {
                          return true; // valid 10-digit number
                        } else {
                          return 'Please enter a valid email or a 10-digit number.';
                        }
                      },
                    })}
                  />
                  {errors.contact && (
                    <div className="text-danger">{errors.contact.message}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="montserrat-semibold w-100 mx-1 mt-3 font-16 py-2 rounded-3 border-0 background-text-blue text-white"
                  disabled={!isValid || loading} // Disable button if form invalid or loading
                >
                  {loading ? 'Sending...' : 'Send Verification Code'}
                </button>
                <p className="font-size-16 montserrat-medium text-center mt-3 text-light-gray">
                  Powered by Red Vision Technologies
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOtpForgotPassword;