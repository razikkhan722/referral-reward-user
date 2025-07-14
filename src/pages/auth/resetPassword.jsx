import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

// Assets icons
import Loginimg from '../../assets/icons/auth/login-side.svg';
import Logo from '../../assets/icons/logo/logo.svg';

// Reusable Button
import Button from '../../components/button';

// React Router
import { NavLink, useNavigate } from 'react-router-dom';
import { postData } from '../../services/api';
import { UserContext } from '../../utils/UseContext/useContext';
import { toastError, toastSuccess } from '../../utils/toster';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const GetEmail = sessionStorage.getItem('email');
  const GetOtp = sessionStorage.getItem("otp")

  const { setAuthLocal } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await postData('/login/reset-password', {
        new_password: data?.password,
        confirm_password: data?.confirmpassword,
        email: GetEmail,
        verification_code:Number(GetOtp)
      });

      if (response.success) {
        toastSuccess(response?.message)
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('otp');
        navigate('/login');
      }
    } catch (error) {
      toastError(error?.message)
      
    } finally {
      setLoading(false);
    }
  };

  const password = watch('password', '');

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
          <div className="login-form-section row py-3 px-3 d-flex align-items-center justify-content-center">
            <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-center">
              <div className="login-img">
                <img src={Loginimg} alt="Loading" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="montserrat-medium font-14 text-blue">
                  Reset your password!
                </h2>

                {/* New Password Input */}
                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control login-form py-2"
                    placeholder="Enter New Password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters long',
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                        message:
                          'Password must contain uppercase, lowercase, and number',
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password.message}</div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control login-form py-2"
                    placeholder="Re-enter Password"
                    {...register('confirmpassword', {
                      required: 'Please confirm your password',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                  />
                  {errors.confirmpassword && (
                    <div className="text-danger">
                      {errors.confirmpassword.message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="montserrat-semibold w-100 mx-1 font-16 py-2 rounded-3 border-0 background-text-blue text-white"
                >
                  {loading ? 'Loading...' : 'Reset Password'}
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

export default ResetPassword;
