import React, { useContext, useEffect, useRef, useState } from 'react';
// import './invitefriend.scss';

import stars from '../../assets/icons/home/redeemEarn/starts.svg';
import footer from '../../assets/images/home/Invitefriend/Bottom-invite.svg';
import FacebookIcon from '../../assets/icons/home/Invitefriend/fb-invite.svg';
import TwitterIcon from '../../assets/icons/home/Invitefriend/twitter-invite.svg';
import Linkedin from '../../assets/icons/home/Invitefriend/linkedin.svg';
import telegram from '../../assets/icons/home/Invitefriend/telegram.svg';
import { postData } from '../../services/api';
import { UserContext } from '../../utils/UseContext/useContext';

// const Invitefriend = ({ isActive, onAnimationComplete , isExiting }) => {
const Invitefriend = ({ isActive , isExiting }) => {
  const inputRef = useRef(null);
  // const animationTriggered = useRef(false);

  // const [animateTop, setAnimateTop] = useState(false);
  // const [animateFooter, setAnimateFooter] = useState(false);
  // const [animateMiddle, setAnimateMiddle] = useState(false);
  const [copied, setCopied] = useState(false);
  const { ContextHomeDataAPI } = useContext(UserContext);
  const Auth = JSON?.parse(sessionStorage.getItem('Auth') ?? '{}');

  // Disable scroll outside while active
  // useEffect(() => {
  //   document.body.style.overflow = isActive ? 'hidden' : '';
  //   return () => {
  //     document.body.style.overflow = '';
  //   };
  // }, [isActive]);

  // Reset animations when Invitefriend becomes active (either from up or down)
  // useEffect(() => {
  //   if (isActive) {
  //     setTimeout(() => {
  //       setAnimateTop(false);
  //       setAnimateFooter(false);
  //       setAnimateMiddle(false);
  //       animationTriggered.current = false;
  //     }, 50); // small delay to force DOM update before next animation
  //   }
  // }, [isActive]);

  // // Scroll-based animation trigger
  // useEffect(() => {
  //   const handleWheel = (e) => {
  //     if (!isActive || animationTriggered.current) return;

  //     const direction = e.deltaY;
  //     animationTriggered.current = true;
  //     e.preventDefault();

  //     if (direction > 0) {
  //       // Scroll Down
  //       setAnimateTop(true);
  //       setAnimateFooter(true);
  //       setAnimateMiddle(true);

  //       setTimeout(() => {
  //         if (typeof onAnimationComplete === 'function') {
  //           onAnimationComplete(); // go forward
  //         }
  //         animationTriggered.current = false;
  //       }, 1200);
  //     } else {
  //       // Scroll Up
  //       setAnimateTop(false);
  //       setAnimateFooter(false);
  //       setAnimateMiddle(false);

  //       setTimeout(() => {
  //         if (typeof onAnimationComplete === 'function') {
  //           onAnimationComplete('reverse'); // go back
  //         }
  //         animationTriggered.current = false;
  //       }, 1200);
  //     }
  //   };

  //   if (isActive) {
  //     window.addEventListener('wheel', handleWheel, { passive: false });
  //   }

  //   return () => {
  //     window.removeEventListener('wheel', handleWheel);
  //   };
  // }, [isActive, onAnimationComplete]);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  const handleClick = async () => {
    try {
      const response = await postData('/send-whatsapp-invite', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
      });
      if (response?.success) {
        window.open(response?.link, '_blank');
      }
    } catch (error) {}
  };

  const handleIconLink = async (icon) => {
    try {
      const response = await postData(`/send-${icon}-invite`, {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
      });
      if (response?.success && response?.link) {
        window.open(response?.link, '_blank');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <div id='InviteFriend_Section' className="invitefriend-wrapper invite-bg-image section-invitefriend position-relative overflow-hidden vh-100 d-flex align-items-start pt-80 ustify-content-center">
      {/* Top Stars */}
      {/* <img
        className={`w-100 position-absolute top-0 left-0 asto-transition-all ${animateTop ? 'nav-slide-top' : ''} ${isActive ? '' : 'invitefriend-slide-top'}`}
        src={stars}
        alt="Stars"
      /> */}
      <img
        className={`w-100 position-absolute top-0 left-0 asto-transition-all ${isExiting ? 'nav-slide-top' : ''} ${isActive ? '' : 'nav-slide-top'}`}
        src={stars}
        alt="Stars"
      />
      {/* Bottom Footer */}
      <img
        className={`w-100 position-absolute bottom-0 left-0 asto-transition-all ${isExiting ? 'astro-slide-down' : ''} ${isActive ? '' : 'astro-slide-down'}`}
        src={footer}
        alt="Footer"
      />

      {/* Center Section */}
      <div className={`container center-section transition-all duration-1000 ${isExiting ? 'form-fade-down' : ''}`}>
        <div className="row text-center justify-content-center align-items-start h-100">
          <div className="col-12 col-lg-6 content-z-index">
            <h2 className="text-white font-40 mb-58 space-grotesk-bold">Invite a friend</h2>

            <div className="copy-input-container">
              <input
                ref={inputRef}
                type="text"
                defaultValue={ContextHomeDataAPI?.part5}
                className="copy-input input-invite-friend bg-white"
              />
              <button className="invite-copy-button" onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>

            <div className="divider-with-text">
              <span className="divider-border">Or</span>
            </div>

            <button
              onClick={handleClick}
              className="btn-share-via-whatsapp width-80 poppins-regular text-white bg-primary-color font-18 mb-46"
            >
              Share Via Whatsapp
            </button>

            <ul className="social-nav pl-0 d-flex justify-content-center">
              <li
                onClick={() => handleIconLink('facebook')}
                className="social-list cursor-pointer"
              >
                <span
                  className="social-link"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="social-icon"
                    src={FacebookIcon}
                    alt="Facebook"
                  />
                </span>
              </li>
              <li
                onClick={() => handleIconLink('linkedin')}
                className="social-list cursor-pointer"
              >
                <span
                  className="social-link"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="social-icon"
                    src={Linkedin}
                    alt="Instagram"
                  />
                </span>
              </li>
              <li
                onClick={() => handleIconLink('telegram')}
                className="social-list cursor-pointer" 
              >
                <span
                  className="social-link"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="social-icon" src={telegram} alt="YouTube" />
                </span>
              </li>
              <li
                onClick={() => handleIconLink('twitter')}
                className="social-list cursor-pointer"
              >
                <span
                  className="social-link"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="social-icon"
                    src={TwitterIcon}
                    alt="Twitter"
                  />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invitefriend;
