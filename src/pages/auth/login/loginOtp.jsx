import React, { useState, useRef, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Assets
import Loginimg from '../../../assets/icons/auth/login-side.svg';
import Logo from '../../../assets/icons/logo/logo.svg';
import checkCircle from '../../../assets/icons/auth/CheckCircle.svg';

// React icon
import { FiClock, FiAlertCircle } from 'react-icons/fi';

// API call service
import { postData } from '../../../services/api';

// Toast messages
import { toastError, toastInfo, toastSuccess } from '../../../utils/toster';

// Usercontext
import { UserContext } from '../../../UseContext/useContext';


// Utilities
import { DecryptFunction } from '../../../utils/decryptFunction';

const LoginOtp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setAuthLocal, setContextHomeDataAPI, setContextFaqsDataAPI } =
    useContext(UserContext);

  // Form data & OTP
  const mobileNumber = watch('mobile');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  // UI states
  const [getNumber, setgetNumber] = useState();
  const [otpStatus, setOtpStatus] = useState('sent'); // 'sent', 'verifying', 'error'
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [mobileValid, setMobileValid] = useState(false);

  // Timer Countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP input box change
  const handleOtpChange = (index, value) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) inputRefs.current[index + 1].focus();
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  // Backspace handling in OTP inputs
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Paste OTP from clipboard
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || '';
    }
    setOtp(newOtp);
    const nextIndex = pastedData.findIndex((digit) => digit === '');
    inputRefs.current[nextIndex === -1 ? 5 : nextIndex].focus();
  };

  // OTP verification
  const handleVerify = async () => {
    setOtpStatus('verifying');
    try {
      const response = await postData('/login/mobile-verify-otp', {
        mobile_number: mobileNumber,
        otp_input: otp?.join(''),
      });

      setTimeout(async () => {
        setOtpStatus('sent');
        if (response?.mode) {
          toastSuccess(response?.message);

          // Store auth in session
          sessionStorage.setItem('Auth', JSON.stringify(response));
          setAuthLocal(response);

          // Fetch home data
          const encryptedData = await postData('/home', {
            user_id: response?.user_id,
            log_alt: response?.log_alt,
            mode: response?.mode,
          });

          const FaqsData = await postData('/admin/fetch-custom-data', {
            user_id: response?.user_id,
            log_alt: response?.log_alt,
            mode: response?.mode,
          });

          setContextFaqsDataAPI(FaqsData);

          // Decrypt & set homepage data
          const DecryptedData = await DecryptFunction(encryptedData);
          setContextHomeDataAPI(DecryptedData);

          navigate('/');
          setError('');
        } else {
          setOtpStatus('error');
          setError('Invalid OTP');
        }
      }, 1000);
    } catch (error) {
      toastError(error?.message);
      setOtpStatus('sent');
    }
  };

  // Resend OTP
  const handleResend = async () => {
    setOtp(new Array(6).fill(''));
    setOtpStatus('sent');
    setError('');
    setTimer(60);
    inputRefs.current[0].focus();

    const response = await postData('/login/mobile-send-otp', {
      mobile_number: getNumber,
    });

    if (response?.success) {
      toastInfo('OTP Resent');
    }
  };

  // Convert seconds into mm:ss format
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Mobile number input & validation
  const HandleNumber = async (e) => {
    try {
      const value = e.target.value;
      setgetNumber(value);

      if (!/^\d*$/.test(value)) return;

      const number = value.slice(0, 10);
      e.target.value = number;

      if (value.length === 10) {
        const response = await postData('/login/mobile-send-otp', {
          mobile_number: value,
        });

        if (response?.success) {
          toastSuccess(response?.message);
          setMobileValid(true);
        } else {
          toastError(response?.message);
        }
      } else {
        setMobileValid(false);
      }
    } catch (error) {
      toastError(error?.message);
    }
  };

  // Required for react-hook-form
  const onSubmit = (data) => {};

  return (
    <div className="login-bg-img vh-100 overflow-hidden" id='login-otp-id'>
      {/* Logo */}
      <div className="nav-logo text-center">
        <img className="header-center-img width-13" src={Logo} alt="logo" />
      </div>

      <div className="row p-4 d-flex justify-content-center">
        <div className="col-lg-7 mt-5">
          <div className="text-center mt-3">
            <p className="font-size-46 text-blue montserrat-bold mb-3">Login</p>
            <p className="text-blue montserrat-semibold font-size-20 pb-3">
              Log in to continue enjoying the perks and stay engaged with our
              exciting <br /> reward and referral program!
            </p>
          </div>

          <div className="login-form-section row py-2 px-3 d-flex align-items-center justify-content-between">
            {/* Left Side Image */}
            <div className="col-lg-6 col-12">
              <div className="login-img text-center">
                <img src={Loginimg} alt="Login Visual" />
              </div>
            </div>

            {/* Right Side Form */}
            <div className="col-lg-6 col-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Mobile Input */}
                <div className="my-3 position-relative">
                  <input
                    type="text"
                    className="form-control py-2 text-blue montserrat-bold"
                    maxLength="10"
                    placeholder="Enter Register Number"
                    inputMode="numeric"
                    {...register('mobile', {
                      required: true,
                      pattern: /^\d{10}$/,
                      onChange: HandleNumber,
                    })}
                    style={{ fontWeight: '600', color: '#1A2A6C' }}
                  />
                  {mobileValid && (
                    <img
                      className="login-check position-absolute"
                      src={checkCircle}
                      alt="valid"
                    />
                  )}
                </div>

                {/* Mobile Validation Errors */}
                {errors.mobile?.type === 'required' && (
                  <span className="text-danger">Mobile number is required</span>
                )}
                {errors.mobile?.type === 'pattern' && (
                  <span className="text-danger">
                    Please enter a valid 10-digit mobile number
                  </span>
                )}

                {/* OTP Input Boxes */}
                {(otpStatus === 'sent' ||
                  otpStatus === 'verifying' ||
                  otpStatus === 'error') && (
                  <div className="mb-4 text-center">
                    <div className="d-flex justify-content-center gap-4 mb-3">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          onFocus={() => setActiveIndex(index)}
                          className={`text-center form-control border-2 rounded focus:outline-none px-2 py-1 fw-bold ${
                            activeIndex === index
                              ? 'border-primary'
                              : error
                                ? 'border-danger'
                                : 'border-secondary'
                          }`}
                          disabled={otpStatus === 'verifying'}
                        />
                      ))}
                    </div>

                    {/* OTP Error */}
                    {error && (
                      <div className="text-danger d-flex justify-content-center align-items-center mb-2">
                        <FiAlertCircle size={16} className="me-1" />
                        {error}
                      </div>
                    )}

                    {/* OTP Sent Message */}
                    {mobileValid && (
                      <div
                        className="small mb-2 montserrat-medium font-size-14"
                        style={{ color: '#388E3C' }}
                      >
                        OTP has been sent to the registered mobile number
                      </div>
                    )}

                    {/* Resend Countdown or Button */}
                    {mobileValid && (
                      <>
                        {timer > 0 ? (
                          <div className="text-muted small d-flex justify-content-center align-items-center">
                            <FiClock size={16} className="me-1" />
                            Resend in {formatTime(timer)}
                          </div>
                        ) : (
                          <button
                            onClick={handleResend}
                            className="p-0 border-0 text-blue text-decoration-underline font-16 montserrat-medium"
                          >
                            Resend OTP
                          </button>
                        )}
                      </>
                    )}

                    {/* Verify Button */}
                    <button
                      onClick={handleVerify}
                      disabled={
                        otp.some((digit) => digit === '') ||
                        otpStatus === 'verifying'
                      }
                      className={`montserrat-semibold w-100 mx-1 mt-3 font-16 py-2 rounded-3 border-0 text-white ${
                        otp.some((digit) => digit === '') ||
                        otpStatus === 'verifying'
                          ? 'bg-secondary'
                          : 'background-text-blue'
                      }`}
                    >
                      Verify OTP
                    </button>
                  </div>
                )}

                {/* Footer */}
                <p className="font-size-14 montserrat-medium text-center mt-3 text-light-gray">
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

export default LoginOtp;
