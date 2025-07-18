import React, { useContext, useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import images
import offerastro from '../../assets/icons/home/offer/offerastro.svg';
import offersolor from '../../assets/icons/home/offer/offersolor.svg';
import offerRocket from '../../assets/icons/home/offer/offerRocket.svg';
import rightarrow from '../../assets/icons/home/offer/rightarrow.svg';
import offerexcimg from '../../assets/icons/home/offer/excoffimg.svg';
import zomato from '../../assets/icons/home/offer/zmt.svg';
import excrocket from '../../assets/icons/home/offer/excrocket.svg';

import metero from '../../assets/icons/home/secondScreen/metero.svg';
import suitcase from '../../assets/icons/home/offer/suitcase.svg';
import smartwatch from '../../assets/icons/home/offer/smartwatch.svg';
import headphone from '../../assets/icons/home/offer/headphones.svg';

import plus from '../../assets/icons/home/offer/plus.svg';
import minus from '../../assets/icons/home/offer/minus.svg';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { DecryptFunction } from '../../utils/decryptFunction';
import { postData } from '../../services/api';
import { UserContext } from '../../UseContext/useContext';
import Button from '../../components/button';
import PopupWrapper from '../../utils/PopupWrapper';
import Popup from 'reactjs-popup';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const Offer = ({ isActive }) => {
  const cards = [
    {
      id: 1,
      img: offerRocket,
      title: 'Explore, Earn, Elevate',
      content:
        'Every referral fuels your journey, climb the ranks and claim your rewards!',
    },
    {
      id: 2,
      img: offerastro,
      title: 'Reach for Rewards, Refer for More!',
      content:
        'Invite your friends, collect cosmic points, and unlock stellar perks!',
    },
    {
      id: 3,
      img: offersolor,
      title: 'Explore, Earn, Elevate',
      content:
        'Every referral fuels your journey, climb the ranks and claim your rewards!',
    },
    {
      id: 4,
      img: offerastro,
      title: 'Reach for Rewards, Refer for More!',
      content:
        'Invite your friends, collect cosmic points, and unlock stellar perks!',
    },
  ];

  const Auth = JSON?.parse(sessionStorage.getItem('Auth') ?? '{}');
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '20px',
    autoplay: true,
  };

  const [openIndex, setOpenIndex] = useState(null);
  const [SemiPlntRaise, setSemiPlntRaise] = useState(true);
  const [FaqDataAPI, setFaqDataAPI] = useState();
  const [showCongrats, setShowCongrats] = useState(false);

  const handleYes = (close) => {
    close();
    setShowCongrats(true);
  };

  const { ContextFaqsDataAPI } = useContext(UserContext);
  console.log('ContextFaqsDataAPI: ', ContextFaqsDataAPI);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const footerRef = useRef(null);
  const [showFooterPlanet, setShowFooterPlanet] = useState(false);

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
      },
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  // =================================
  //       API FUNCTIONALITY
  // =================================

  const HandleAPI = async () => {
    try {
      const enyptData = await postData('/home', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
      });
      const Decrpty = await DecryptFunction(enyptData);
      setFaqDataAPI();
    } catch (error) {
      console.log('error: ', error);
    }
  };

  // Initialize AOS on component mount
  useEffect(() => {
    HandleAPI();
    AOS.init({
      duration: 1500,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    });
    // Refresh AOS when the component updates
    AOS.refresh();
  }, []);

  return (
    <section id="Offer_Section" className="offer-section">
      <div className="offer-sect-content top-0 start-0 bottom-0 end-0">
        <div className="container-fluid px-5 pt-5 overflow-hidden">
          <div
            className={`row offer-slider-fade-left ${isActive ? 'aos-animate' : ''}`}
          >
            <Slider className="offer-slider" {...settings}>
              {cards?.map((card, index) => (
                <PopupWrapper
                  key={index}
                  trigger={
                    <div
                      className={`d-flex offer-cards offer-bg-img-${card?.id} cursor-pointer`}
                    >
                      <div className="col-lg-7 ms-3 ps-3 my-3 py-3 d-grid align-items-end">
                        <h3 className="text-white font-36 montserrat-semibold mb-2 pb-1 truncate-text-2 lh-sm">
                          {card.title}
                        </h3>
                        <p className="text-white font-20 montserrat-regular mb-4 pb-3 truncate-text-3 lh-sm">
                          {card.content}
                        </p>
                        <span className="text-decoration-none text-white font-18 montserrat-medium d-flex cursor-pointer">
                          Learn More
                          <img className="ms-2" src={rightarrow} alt="" />
                        </span>
                      </div>
                      <div className="col-lg-5 d-flex justify-content-center align-items-center">
                        <img
                          className="width-82"
                          src={card?.img}
                          alt="offerImages"
                        />
                      </div>
                    </div>
                  }
                >
                  {(close) => (
                    <div className="text-center p-4">
                    <AiOutlineInfoCircle
                      size={50}
                      color="#1A2A6C"
                      className="mb-3"
                    />
                    <h5 className="mb-3">
                      Are you sure you want to unlock this prize?
                    </h5>
                    <div className="d-flex justify-content-center gap-3">
                      <Button
                        label="Yes"
                        onClick={() => handleYes(close)}
                        className="w-50 py-2 rounded-3 bg-transparent border-blue text-blue montserrat-semibold"
                      />
                      <Button
                        label="No"
                        onClick={close}
                        className="w-50 py-2 rounded-3 border-0 background-text-blue text-white montserrat-semibold"
                      />
                    </div>
                  </div>
                  )}
                </PopupWrapper>
              ))}
            </Slider>
          </div>
          {/*  Exclusive Offers SECTION */}
          <h1 className="text-dark-blue font-40 space-grotesk-bold mt-120 mb-4 pb-4 ">
            Exclusive Offers
          </h1>
          <div className="pt-5 d-grid price-exclusive gap-3">
            <div className="mt-5 rounded-4 shadow-lg bg-white px-0">
              <div className="head-sec position-relative">
                <img className="w-100" src={offerexcimg} alt="offerexcimg" />
                <img
                  className="position-absolute offer-exc-rocket"
                  src={excrocket}
                  alt="Loading"
                />
              </div>
              <div className="text-center px-5">
                <img src={zomato} alt="zomato" />
                <h3 className="font-24 text-light-black montserrat-semibold mt-3 mb-2">
                  Get 10% Off on Zomato
                </h3>
                <p className="font-16 text-light-black space-grotesk-regular">
                  Enjoy delicious deals on your next order!
                </p>
                <hr className="my-4 border-1 card-divider width-65" />
                <button
                  className="btn background-text-blue text-white font-14 montserrat-medium mb-4 width-65 rounded-5"
                  type="button"
                >
                  Claim Now
                </button>
              </div>
            </div>
            <div className="mt-5 rounded-4 shadow-lg bg-white px-0">
              <div className="head-sec position-relative">
                <img className="w-100" src={offerexcimg} alt="offerexcimg" />
                <img
                  className="position-absolute offer-exc-rocket"
                  src={excrocket}
                  alt="Loading"
                />
              </div>
              <div className="text-center px-5">
                <img src={zomato} alt="zomato" />
                <h3 className="font-24 text-light-black montserrat-semibold mt-3 mb-2">
                  Get 10% Off on Zomato
                </h3>
                <p className="font-16 text-light-black space-grotesk-regular">
                  Enjoy delicious deals on your next order!
                </p>
                <hr className="my-4 border-1 card-divider width-65" />
                <button
                  className="btn background-text-blue text-white font-14 montserrat-medium mb-4 width-65 rounded-5"
                  type="button"
                >
                  Claim Now
                </button>
              </div>
            </div>
            <div className="mt-5 rounded-4 shadow-lg bg-white px-0">
              <div className="head-sec position-relative">
                <img className="w-100" src={offerexcimg} alt="offerexcimg" />
                <img
                  className="position-absolute offer-exc-rocket"
                  src={excrocket}
                  alt=""
                />
              </div>
              <div className="text-center px-5">
                <img src={zomato} alt="zomato" />
                <h3 className="font-24 text-light-black montserrat-semibold mt-3 mb-2">
                  Get 10% Off on Zomato
                </h3>
                <p className="font-16 text-light-black space-grotesk-regular">
                  Enjoy delicious deals on your next order!
                </p>
                <hr className="my-4 border-1 card-divider width-65" />
                <button
                  className="btn background-text-blue text-white font-14 montserrat-medium mb-4 width-65 rounded-5"
                  type="button"
                >
                  Claim Now
                </button>
              </div>
            </div>
          </div>
          {/* Win Exciting Prizes SECTION */}
          <h2 className="text-dark-blue mt-120 font-40 space-grotesk-bold mb-4 pb-4 ">
            Win Exciting Prizes
          </h2>
          <div className="row justify-content-between">
            {/* First Prize (Suitcase) */}
            <div className="col-lg-6 mb-24 mb-lg-0 shadow-lg d-flex justify-content-between px-0 price-trolley">
              <PopupWrapper
                trigger={
                  <div className="d-flex w-100 cursor-pointer">
                    <div className="col-lg-8 pt-5 ps-5 d-grid">
                      <div className="head-content ">
                        <h2 className="font-24 montserrat-medium text-white mb-2">
                          {
                            ContextFaqsDataAPI?.exciting_prizes?.[0]?.title
                          }
                        </h2>
                        <p className="font-14 montserrat-light text-white mb-5 pb-5">
                          {
                            ContextFaqsDataAPI?.exciting_prizes?.[0]?.term_conditions
                          }
                        </p>
                      </div>
                      <div className="section-offer align-self-end mb-3 pb-1">
                        <h4 className="font-40 space-grotesk-medium text-white mb-0">
                          Collect
                        </h4>
                        <div className="d-flex align-items-center">
                          <span className="font-24 montserrat-semibold text-light-yellow">
                            {
                              ContextFaqsDataAPI?.exciting_prizes?.[0]?.required_meteors
                            }
                          </span>
                          <img
                            className="mx-3"
                            src={
                              ContextFaqsDataAPI?.exciting_prizes?.[0]?.image_url || metero
                            }
                            alt=""
                          />
                          <span className="font-28 montserrat-medium text-white">
                            Total Meteors
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 d-flex justify-content-start">
                      <img
                        className="align-self-end mb-1"
                        src={suitcase}
                        alt=""
                      />
                    </div>
                  </div>
                }
              >
                {(close) => (
                  <div className="text-center p-4">
                    <AiOutlineInfoCircle
                      size={50}
                      color="#1A2A6C"
                      className="mb-3"
                    />
                    <h5 className="mb-3">
                      Are you sure you want to unlock this prize?
                    </h5>
                    <div className="d-flex justify-content-center gap-3">
                      <Button
                        label="Yes"
                        onClick={() => handleYes(close)}
                        className="w-50 py-2 rounded-3 bg-transparent border-blue text-blue montserrat-semibold"
                      />
                      <Button
                        label="No"
                        onClick={close}
                        className="w-50 py-2 rounded-3 border-0 background-text-blue text-white montserrat-semibold"
                      />
                    </div>
                  </div>
                )}
              </PopupWrapper>
            </div>

            {/* Second and Third Prizes */}
            <div className="col-lg-6 px-lg-4 px-0 d-flex flex-column gap-4">
              {[smartwatch, headphone].map((img, i) => (
                <PopupWrapper
                  key={i}
                  trigger={
                    <div
                      className={`col-lg-12 py-3 shadow-lg d-flex justify-content-between align-self-lg-${i === 0 ? 'start' : 'end'} cursor-pointer ${i === 0 ? 'price-watch' : 'price-headphone'}`}
                    >
                      <div className="col-lg-8 ms-4 ps-4 align-self-end mb-1">
                        <h4 className="font-40 space-grotesk-medium text-white mb-0">
                          Collect
                        </h4>
                        <div className="d-flex align-items-center">
                          <span className="font-24 montserrat-semibold text-light-yellow">
                            1500
                          </span>
                          <img className="mx-3" src={metero} alt="" />
                          <span className="font-28 montserrat-medium text-white">
                            Total Meteors
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4 d-flex align-items-center">
                        <img
                          src={img}
                          alt={i === 0 ? 'smartwatch' : 'headphone'}
                        />
                      </div>
                    </div>
                  }
                >
                  {(close) => (
                    <div className="text-center p-4">
                      <AiOutlineInfoCircle
                        size={50}
                        color="#1A2A6C"
                        className="mb-3"
                      />
                      <h5 className="mb-3">
                        Are you sure you want to unlock this prize?
                      </h5>
                      <div className="d-flex justify-content-center gap-3">
                        <Button
                          label="Yes"
                          onClick={() => handleYes(close)}
                          className="w-50 py-2 rounded-3 bg-transparent border-blue text-blue montserrat-semibold"
                        />
                        <Button
                          label="No"
                          onClick={close}
                          className="w-50 py-2 rounded-3 border-0 background-text-blue text-white montserrat-semibold"
                        />
                      </div>
                    </div>
                  )}
                </PopupWrapper>
              ))}
            </div>

            {/* 🎉 Congratulations Popup */}
            <Popup
              open={showCongrats}
              onClose={() => setShowCongrats(false)}
              modal
              position="center center"
            >
              {(close) => (
                <div className="text-center p-4">
                  <AiOutlineInfoCircle
                    size={50}
                    color="#28a745"
                    className="mb-3"
                  />
                  <h4>🎉 Congratulations!</h4>
                  <p>You have successfully unlocked the prize.</p>
                  <Button
                    label="Close"
                    onClick={() => {
                      close();
                      setShowCongrats(false);
                    }}
                    className="bg-success text-white mt-3"
                  />
                </div>
              )}
            </Popup>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className={`faq-section ${isActive ? 'planet-slide-up' : ''}`}>
          <div className="container-fluid px-5 pb-5">
            <h2 className="text-dark-blue space-grotesk-bold mt-120 mb-1 pb-1 ">
              Frequently Asked Questions
            </h2>
            <div className="row">
              <div className="accordion w-100">
                {ContextFaqsDataAPI?.home_faqs?.map((item, index) => (
                  <div className="mt-4 pt-3" key={index}>
                    <div
                      className="purple-border-bottom pb-4 pt-1"
                      id={`heading${index}`}
                    >
                      <h6 className="mb-0 font-16 text-dark-blue montserrat-medium">
                        <button
                          className="border-0 bg-transparent d-flex justify-content-between align-items-center w-100"
                          onClick={() => toggle(index)}
                          aria-expanded={openIndex === index}
                          aria-controls={`collapse${index}`}
                        >
                          {item?.question}
                          <span>
                            <img
                              src={openIndex === index ? minus : plus}
                              alt=""
                            />
                          </span>
                        </button>
                      </h6>
                    </div>

                    <div
                      id={`collapse${index}`}
                      className={`faq-answer ${openIndex === index ? 'open' : ''}`}
                      aria-labelledby={`heading${index}`}
                    >
                      <div className="card-body">
                        <p className="mb-0 font-16 text-dark-blue montserrat-regular">
                          {item?.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* FOOTER SECTION */}
        <div
          ref={footerRef}
          className="offer-footer position-relative overflow-hidden"
          onMouseEnter={() => setSemiPlntRaise(true)}
          onMouseLeave={() => setSemiPlntRaise(false)}
        >
          <div className="offer-footer-section position-relative d-flex justify-content-center text-center">
            <p className="width-36 font-32 space-grotesk-medium mb-5 text-white align-self-end">
              The more you refer, the brighter your rewards shine!
            </p>
          </div>
          <div
            className={`position-absolute footer-semi-planet ${showFooterPlanet ? 'fade-in-up' : 'invisible'}`}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Offer;
