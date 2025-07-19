import React, { useContext, useEffect, useRef, useState } from 'react';

// Images
import Astronut1 from '../../assets/icons/home/MyReferral/Character.svg';
import Astronut2 from '../../assets/icons/home/MyReferral/Astronaut.svg';
import BlueBottom from '../../assets/icons/home/MyReferral/BLUE PATTI.svg';
import StartFour from '../../assets/icons/home/MyRewards/StarFour.svg';

import fbImg from '../../assets/icons/home/MyReferral/fb.svg';
import twitImg from '../../assets/icons/home/MyReferral/twit.svg';
import ytImg from '../../assets/icons/home/MyReferral/yt.svg';
import linkedinImg from '../../assets/icons/home/MyReferral/linkedin.svg';
import whtpImg from '../../assets/icons/home/MyReferral/whatsapp.svg';
import cloudImg from '../../assets/icons/home/MyReferral/clouds-2.svg';

// Common Components
import SliderCard from '../MyReferral/SliderCard';
import FAQ from '../../components/faq';
import Navbar from '../../components/navbar';
import ReferralCards from '../MyReferral/referralCards';
import { postData } from '../../services/api';
import { DecryptFunction } from '../../utils/decryptFunction';
import { NavLink } from 'react-router-dom';
import { toastInfo } from '../../utils/toster';
import { UserContext } from '../../UseContext/useContext';


const MyReferralScreen = () => {
  // ------------
  // UseStates
  // -------------
  const [RefralDataAPI, setRefralDataAPI] = useState();
  const codeRef = useRef();
  const linkRef = useRef();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showFooterPlanet, setShowFooterPlanet] = useState(false);
  const footerRef = useRef(null);

  const Auth = JSON?.parse(sessionStorage.getItem('Auth') ?? '{}');
  const { ContextHomeDataAPI, ContextFaqsDataAPI } =
    useContext(UserContext);




  // =================================
  //       API FUNCTIONALITY
  // =================================

  const handleWhatsappClick = async () => {
    try {
      const response = await postData('/send-whatsapp-invite', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
      });
      if (response?.success) {
        window.open(response?.link, '_blank');
      }
    } catch (error) { }
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

  const HandleAPI = async () => {
    try {
      const enyptData = await postData('/my-referrals', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
      });
      const Decrpty = await DecryptFunction(enyptData);
      setRefralDataAPI(Decrpty);
    } catch (error) {
      console.log('error: ', error);
    }
  };


  // Copy Function
  const handleCopy = (ref, type) => {
    if (ref.current) {
      const value = ref.current.value;
      navigator.clipboard.writeText(value);
      // Set state to show "Copied!" text
      if (type === "code") {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000); // Reset after 2 seconds
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    }
  };

  // ---------------
  // useEffect
  // ----------------

  useEffect(() => {
    HandleAPI();
  }, []);

  // Footer Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // add delay before showing
          setTimeout(() => setShowFooterPlanet(true), 500);
        } else {
          setShowFooterPlanet(false);
        }
      },
      {
        root: null,
        threshold: 0.3,
      }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);


  return (
    <>
      <section className="hero-section position-relative">
        <div className="overflow-scroll h-100 z-3">
          <Navbar />
          <div className="container pt-100">
            <div className="mb-5 positin-relative">
              <ReferralCards RefralDataAPI={RefralDataAPI} />
            </div>
          </div>
          <div className='container-fluid p-0'>
            <div className='position-relative'>
              <img src={cloudImg} alt="Cloud Image" className='cloud-img w-100' />
            </div>
          </div>
          <div className='container'>
            <div className="invite-card my-refral-inner-content overflow-hidden">
              <div className="row pt-36 px-5 align-items-center">
                <div className='col-lg-1'></div>
                <div className="col-lg-5">
                  <div className='d-flex justify-content-center'>
                    <p className="font-32 text-white space-grotesk-bold ms-5">
                      Invite A Friend
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="mb-2">
                    <label className="font-size-12 text-white montserrat-medium mb-2">
                      Invite Code
                    </label>
                    <div className="copy-input-container">
                      <input
                        ref={codeRef}
                        id="inviteCode"
                        type="text"
                        defaultValue={RefralDataAPI?.part6}
                        className="copy-input input-invite-friend bg-white mb-16"
                      />
                      <button
                        className="copy-button font-14 montserrat-regular"
                        onClick={() => handleCopy(codeRef, "code")}
                      >
                        {copiedCode ? 'Copied!' : 'Copy Code'}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="font-size-12 text-white montserrat-medium mb-2">
                      Invite Link
                    </label>
                    <div className="copy-input-container">
                      <input
                        ref={linkRef}
                        id="inviteLink"
                        type="text"
                        defaultValue={RefralDataAPI?.part5}
                        className="copy-input input-invite-friend bg-white mb-16"
                      />
                      <button
                        className="copy-button font-14 montserrat-regular"
                        onClick={() => handleCopy(linkRef, "link")}
                      >
                        {copiedLink ? 'Copied!' : 'Copy Link'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 pb-4 pt-5 text-center">
                  <img className="mx-3 w-auto" src={whtpImg} alt=""
                    onClick={handleWhatsappClick}
                  />
                  <img className="mx-3 w-auto" src={fbImg} alt=""
                    onClick={() => handleIconLink('facebook')}
                  />
                  <img className="mx-3 w-auto" src={linkedinImg} alt=""
                    onClick={() => handleIconLink('linkedin')}
                  />
                  <img className="mx-3 w-auto" src={twitImg} alt=""
                    onClick={() => handleIconLink('twitter')}
                  />
                </div>
              </div>
            </div>
            <div className="my-refral-inner-content">
              {/* Referral Cards */}
              <SliderCard RefralDataAPI={RefralDataAPI} />
              {/* INVITING, TRACKING CARD SECTION */}
              <div className="container">
                <div className="font-32 space-grotesk-bold text-blue mt-120 mb-4 pb-4 ">
                  Here's How You Earn with Every Referral
                </div>

                <div className="redeem-claim text-center p-4 rounded-4">
                  <div className="font-24 montserrat-semibold text-white mb-3 ls-4">
                    Inviting, Tracking, And Earning From Referrals
                  </div>
                  <p className="font-18 montserrat-medium text-white ls-4">
                    Refer your circle, track your impact, and watch your rewards
                    grow
                  </p>

                  <div className="text-light-yellow font-32 flex-column flex-lg-row space-grotesk-bold d-flex justify-content-center align-items-center my-5 ls-4">
                    Invite
                    <img className="mx-4" src={StartFour} alt="Loading" />
                    Friend Invests
                    <img className="mx-4" src={StartFour} alt="Loading" />
                    You Earn
                  </div>
                  <div className="mt-3 row justify-content-between justify-content-lg-center align-items-center">
                    <div className='col-6 col-lg-3'>
                      <NavLink to={"/invitefriend"}>
                        <button className="py-2 mb-0 w-100 rounded-3 text-white bg-transparent border border-white font-16 montserrat-semibold">
                          Invite a Friend
                        </button>
                      </NavLink>
                    </div>
                    <div className='col-6 col-lg-3'>
                      <button className="py-2 w-100 rounded-3 border-0 bg-white text-blue font-16 montserrat-semibold"
                        onClick={() => toastInfo("Comming Soon")}
                      >
                        Track
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* FAQ Section Start here */}
              <div className="mb-5">
                <FAQ items={ContextFaqsDataAPI?.referrals_faqs} />
              </div>
            </div>
          </div>
          {/* FOOTER SECTION */}
          <div ref={footerRef} className="offer-footer position-relative overflow-hidden mt-5">
            <div className="offer-footer-section position-relative d-flex justify-content-center text-center">
              <p className="width-lg-26 width-80 width-lg-26 font-32 space-grotesk-medium mb-5 text-white align-self-end">
                The more you refer, the brighter your rewards shine!
              </p>
            </div>
            <div
              className={`position-absolute footer-semi-planet ${showFooterPlanet ? 'fade-in-up' : 'invisible'}`}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyReferralScreen;
