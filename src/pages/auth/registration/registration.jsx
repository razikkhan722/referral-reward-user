import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

// Logo Image
import Logo from '../../../assets/icons/logo/logo.svg';

// API call service
import { postData } from '../../../services/api';

// Toast messages
import { toastError, toastSuccess } from '../../../utils/toster';

// UserContext
import { UserContext } from '../../../UseContext/useContext';

// React icon
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Registration = () => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setContextInviteRefferAPI } = useContext(UserContext);

  // UseState
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const GetParams = useParams();
  // console.log(GetParams , "GetParams")

  // Get referral ID and source from URL
  const { id, source } = useParams();
  console.log('Referral Tag ID:', id, 'Accepted Via:', source);

  const platformMap = {
    wa: 'whatsapp',
    tele: 'telegram',
    tw: 'twitter',
    fb: 'facebook',
    in: 'linkedin',
  };

  // Watch password to match confirm password
  const password = watch('password');

  // Submit handler
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // API POST call to register endpoint
      const response = await postData('/register', {
        confirm_password: data?.confirmPassword,
        email: data?.email,
        mobile_number: data?.mobile,
        username: data?.name,
        password: data?.password,
        referral_code: data?.referralCode,
        tag_id: id,
        // accepted_via: source, // wa / tele / tw / fb / in
        accepted_via: platformMap[source] || source,
      });

      // Save user ID to session
      sessionStorage.setItem('uid', response?.user_id);

      if (response?.rewards) {
        setContextInviteRefferAPI(response?.rewards[0]?.signup_reward);
      }
      toastSuccess(response?.message);
      navigate('/subscription');
    } catch (error) {
      toastError(error?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg-img vh-100 overflow-hidden" id="registration-id">
      {/* Logo Section */}
      <div className="nav-logo text-center mt-0">
        <img className="header-center-img width-13" src={Logo} alt="logo" />
      </div>

      {/* Form Wrapper */}
      <div className="row p-lg-3 p-2 d-flex justify-content-center">
        <div className="col-lg-7">
          {/* Heading */}
          <div className="text-center mt-2">
            <p className="font-44 text-blue montserrat-bold mb-2">
              Registration
            </p>
          </div>

          {/* Form Start */}
          <div className="login-form-section register-form">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="row p-lg-4 p-4 justify-content-center mb-5"
            >
              {/* Name Field */}
              <div className="col-lg-5 col-md-6 col-12 mt-2">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control py-2"
                    placeholder="Your User-Name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 4,
                        message: 'Name must be at least 4 characters long',
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="text-danger font-14">
                      {errors.name.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="col-lg-5 col-md-6 col-12 mt-2">
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control py-2"
                    placeholder="Your E-mail"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email format',
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="text-danger font-14">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Field */}
              <div className="col-lg-5 col-md-6 col-12">
                <div className="mb-4">
                  <input
                    type="number"
                    className="form-control py-2"
                    placeholder="Your Mobile No."
                    {...register('mobile', {
                      required: 'Mobile No. is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Invalid mobile number',
                      },
                    })}
                  />
                  {errors.mobile && (
                    <div className="text-danger font-14">
                      {errors.mobile.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Referral Code (Optional) */}
              {!id && (
                <div className="col-lg-5 col-md-6 col-12">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control py-2"
                      placeholder="Your Referral Code"
                      {...register('referralCode')}
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div className="col-lg-5 col-md-6 col-12">
                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control py-2"
                    placeholder="Enter New Password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="text-danger font-14">
                      {errors.password.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="col-lg-5 col-md-6 col-12">
                <div className="mb-4 position-relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control py-2"
                    placeholder="Re-Enter Password"
                    {...register('confirmPassword', {
                      required: 'Confirm Password is required',
                      validate: (value) =>
                        value === password || 'Passwords do not match',
                    })}
                  />
                  {/* Show/Hide icon */}
                  <span
                    className="position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: 'pointer' }}
                  >
                    {showPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </span>
                  {errors.confirmPassword && (
                    <div className="text-danger font-14">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-lg-10 mb-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="montserrat-bold w-100 font-size-16 py-2 border-0 rounded-3 background-text-blue text-white"
                >
                  {loading ? 'Loading...' : 'Sign Up'}
                </button>

                {/* Redirect to Login */}
                <p className="font-12 montserrat-regular text-center mt-3 text-light-gray">
                  Already a user ?
                  <NavLink
                    to="/login"
                    className="text-blue font-14 montserrat-medium text-decoration-none px-2"
                  >
                    Login Now
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
          {/* Form End */}
        </div>
      </div>
    </div>
  );
};

export default Registration;
