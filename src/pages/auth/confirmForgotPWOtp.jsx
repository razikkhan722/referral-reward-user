import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Assets icons
import Loginimg from '../../assets/icons/auth/login-side.svg';
import Logo from '../../assets/icons/logo/logo.svg';

// Assuming you're using Lucide icons
import { Clock, AlertCircle } from 'lucide-react';
import { postData } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess } from '../../utils/toster';

const ConfirmForgotPasswordOtp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const mobileNumber = watch('mobile');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);
  const [otpStatus, setOtpStatus] = useState('sent'); // 'sent', 'verifying', 'error'
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
      const [loading, setLoading] = useState(false);

  const UserEmailNum = sessionStorage.getItem('email');
  // Timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

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

  const handleVerify = async () => {
    setLoading(true);
    try {
      console.clear();
      const response = await postData('/login/verify-code', {
        verification_code: Number(otp?.join('')),
        email: UserEmailNum,
      });
      setOtpStatus('verifying');
      setTimeout(() => {
        if (response?.success) {
          sessionStorage.setItem("otp",Number(otp?.join('')))
          toastSuccess(response?.message)
          navigate('/resetpassword');
          setOtpStatus('sent');
          setError('');
        } else {
          setOtpStatus('error');
          setError('Invalid OTP');
        }
      }, 1000);
    } catch (error) {
      toastError(error?.message)
    }
       finally{
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setOtp(new Array(6).fill(''));
    setOtpStatus('sent');
    setError('');
    setTimer(60);
    inputRefs.current[0].focus();
    try {
      const response = await postData('/login/forgot-password', {
        email: UserEmailNum,
      });
    } catch (error) {}
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const onSubmit = (data) => {
  };

  return (
    <div className="login-bg-img vh-100">
      <div className="nav-logo text-center">
        <img className="header-center-img width-13" src={Logo} alt="logo" />
      </div>
      <div className="row p-4 d-flex justify-content-center">
        <div className="col-lg-7">
          <div className="text-center mt-3">
            <p className="font-size-46 text-blue montserrat-bold mb-3">
              Forgot Password
            </p>
            <p className="text-blue montserrat-semibold font-size-20 pb-3">
              Forgot your password? Don’t worry, we’ll help you reset it!
            </p>
          </div>
          <div className="login-form-section row py-3 px-3 d-flex justify-content-between">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="login-img">
                <img src={Loginimg} alt="Login Visual" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="montserrat-medium font-14 text-blue mb-5">
                  Enter the verification code sent on{' '}
                  <span className="">{`${UserEmailNum?.slice(0, 3)}XXXXXXXX`}</span>
                </h3>
                {/* OTP Section */}

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

                    {error && (
                      <div className="text-danger d-flex justify-content-center align-items-center mb-2">
                        <AlertCircle size={16} className="me-1" />
                        {error}
                      </div>
                    )}

                    {timer > 0 ? (
                      <div className="text-muted small d-flex justify-content-start align-items-center">
                        <Clock size={16} className="me-1" />
                        <span>Didn’t get the code? {'  '}</span>
                        {'  '} {" "}Resend in {formatTime(timer)}
                      </div>
                    ) : (
                      <>
                        <div className="d-flex justify-content-start">
                          <span>Didn’t get the code? {'  '}</span>
                          {'  '}
                          <button
                            onClick={handleResend}
                            className=" border-0 p-0 text-decoration-none mx-2 montserrat-semibold font-14 text-blue"
                          >
                            {'  '} Re-send
                          </button>
                        </div>
                      </>
                    )}
                    <button
                      onClick={handleVerify}
                      disabled={loading}
                      //   disabled={
                      //     otp.some((digit) => digit === '') ||
                      //     otpStatus === 'verifying'
                      //   }
                      className="montserrat-semibold w-100 mx-1 mt-3 font-16 py-2 rounded-3 border-0 background-text-blue text-white"
                    >
                      {/* {otpStatus === 'verifying'
                        ? 'Verifying...'
                        : 'Verify OTP'} */}
                      {/* Submit */}
                      {loading ? 'Loading...' : 'Submit'}
                    </button>
                  </div>
                )}

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

export default ConfirmForgotPasswordOtp;
