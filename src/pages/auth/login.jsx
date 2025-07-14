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
import { DecryptFunction } from '../../utils/decryptFunction';
import { toastError, toastSuccess } from '../../utils/toster';
import { toast } from 'react-toastify';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setAuthLocal, setContextHomeDataAPI, setContextFaqsDataAPI } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await postData('/login/email-login', {
        password: data?.password,
        email: data?.email,
      });
      if (response?.mode) {
        // Save AUTHENTICATOION in localstorage
        sessionStorage.setItem('Auth', JSON?.stringify(response));
        setAuthLocal(response);
        const enyptData = await postData('/home', {
          user_id: response?.user_id,
          log_alt: response?.log_alt,
          mode: response?.mode,
        });

        // fetch-custom-data API for ALL FAQs
        const FaqsData = await postData('/admin/fetch-custom-data', {
          user_id: response?.user_id,
          log_alt: response?.log_alt,
          mode: response?.mode,
        });
        setContextFaqsDataAPI(FaqsData);

        let Decrpty = await DecryptFunction(enyptData);
        setContextHomeDataAPI(Decrpty);
        toastSuccess(response?.message);
        navigate('/');
      }
    } catch (error) {
      if (error?.error) {
        toastError(error?.error);
      } else {
        toastError(error?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="login-bg-img vh-100">
    //   <div className="nav-logo text-center">
    //     <img className="header-center-img width-13" src={Logo} alt="logo" />
    //   </div>

    //   <div className="row p-4 d-flex justify-content-center">
    //     <div className="col-lg-7">
    //       <div className="text-center mt-3">
    //         <p className="font-size-46 text-blue montserrat-bold mb-3">Login</p>
    //         <p className="text-blue montserrat-semibold font-size-20 pb-3">
    //           Log in to continue enjoying the perks and stay engaged with our
    //           exciting <br /> reward and referral program!
    //         </p>
    //       </div>

    //       <div className="login-form-section row py-2 px-3 d-flex align-items-center justify-content-center">
    //         <div className="col-lg-6 col-md-6 col-12">
    //           <div className="login-img">
    //             <img src={Loginimg} alt="Login Visual" />
    //           </div>
    //         </div>

    //         <div className="col-lg-6 col-md-6 col-12">
    //           <form onSubmit={handleSubmit(onSubmit)}>
    //             <div className="mb-3 ">
    //               <input
    //                 type="text"
    //                 className="form-control py-2"
    //                 placeholder="Your Email / Mobile No"
    //                 {...register('name', {
    //                   required: 'Name is required',
    //                   pattern: {
    //                     value: /^[A-Za-z\s]+$/i,
    //                     message: 'Name must contain only letters',
    //                   },

    //                   minLength: {
    //                     value: 2,
    //                     message: 'Name must be at least 2 characters long',
    //                   },
    //                   maxLength: {
    //                     value: 50,
    //                     message: 'Name must not exceed 50 characters',
    //                   },
    //                 })}
    //               />
    //               {errors.name && (
    //                 <div className="text-danger">{errors.name.message}</div>
    //               )}
    //             </div>

    //             <div className="mb-4">
    //               <input
    //                 type="password"
    //                 className="form-control py-2"
    //                 placeholder="Password"
    //                 {...register('password', {
    //                   required: 'Password is required',
    //                   minLength: {
    //                     value: 8,
    //                     message: 'Password must be at least 8 characters',
    //                   },
    //                   pattern: {
    //                     value:
    //                       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //                     message:
    //                       'Password must include uppercase, lowercase, number, and special character',
    //                   },
    //                 })}
    //               />
    //               {errors.password && (
    //                 <div className="text-danger">{errors.password.message}</div>
    //               )}
    //             </div>

    //             <div className="d-flex justify-content-between align-items-center">
    //               <div className="w-100 pe-2">
    //                 <NavLink
    //                   to="/loginOtp"
    //                   className="text-blue montserrat-semibold font-size-16"
    //                 >
    //                   <Button
    //                     type="button"
    //                     label="Login with OTP"
    //                     className="montserrat-semibold font-size-16 text-blue background-light-white border-blue border-2 hover-background-text-blue hover-text-light w-100"
    //                   />
    //                 </NavLink>
    //               </div>

    //               <div className="w-100">
    //                 <Button
    //                   type="submit"
    //                   label="Login"
    //                   className="montserrat-bold font-size-16 background-text-blue text-light border-0 w-100"
    //                 />
    //               </div>
    //             </div>

    //             <p className="font-size-14 montserrat-medium text-center mt-3 text-light-gray">
    //               Powered by Red Vision Technologies
    //             </p>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <section className="overflow-hidden">
      <div className="login-bg-img">
        <div className="nav-logo text-center">
          <img className="header-center-img width-13" src={Logo} alt="logo" />
        </div>
        <div className="row p-4 d-flex justify-content-center align-items-center">
          <div className="col-lg-7">
            <div className="text-center mt-lg-0 mt-5">
              <p className="font-46 text-blue montserrat-bold mb-3">Login</p>
              <p className="text-blue montserrat-semibold font-20 pb-3">
                Log in to continue enjoying the perks and stay engaged with our
                exciting reward and referral program!
              </p>
            </div>
            <div className="container">
              <div className='login-form-section row d-flex justify-content-center align-items-center py-3 px-3'>
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="login-img side-login-bg d-flex align-items-center justify-content-center">
                    {/* <img src={Loginimg} alt="Laoding" className="img-fluid" /> */}
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-12 d-flex align-items-center">
                  <form onSubmit={handleSubmit(onSubmit)} className='w-100 '>
                    <div class="mb-4">
                      <input
                        type="text"
                        class="form-control login-form py-2"
                        id="exampleFormControlInput1"
                        placeholder="Your Email / Username"
                        {...register('email', {
                          required: 'Email / Username is required',
                        })}
                      />
                      {errors.email && (
                        <div className="text-danger font-14">{errors.email.message}</div>
                      )}
                    </div>
                    <div class="mb-1">
                      <input
                        type="password"
                        class="form-control login-form py-2"
                        id="exampleFormControlInput1"
                        placeholder="Password"
                        {...register('password', {
                          required: 'Password is required',
                        })}
                      />
                      {errors.password && (
                        <div className="text-danger font-14">
                          {errors.password.message}
                        </div>
                      )}
                    </div>
                    <div className="pb-4 text-end">
                      <button
                        type="button"
                        className="text-blue font-12 montserrat-regular border-0 bg-transparent"
                        onClick={() => navigate('/forgotpassword')}
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="d-flex ">
                      <NavLink
                        to={'/loginOtp'}
                        className="montserrat-semibold w-50 text-center mx-1 text-decoration-none font-16 py-2 rounded-3 bg-transparent border-blue  text-blue"
                      >
                        Login with OTP
                      </NavLink>
                      <button
                        type="submit"
                        disabled={loading}
                        className="montserrat-semibold w-50 mx-1 font-16 py-2 rounded-3 border-0 background-text-blue text-white"
                      >
                        {loading ? 'Loging...' : 'Login'}
                      </button>
                    </div>
                    <p className="font-12 montserrat-regular text-center mt-3 text-light-gray mb-0">
                      Not an existing user?{' '}
                      <span>
                        <NavLink
                          to={'/registration'}
                          className={
                            'text-blue font-14 montserrat-medium text-decoration-none'
                          }
                        >
                          Register Now
                        </NavLink>
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
