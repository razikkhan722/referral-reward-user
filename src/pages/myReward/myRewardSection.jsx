import React, { useContext, useEffect, useState, useRef } from 'react';
// import component
import Navbar from '../../components/navbar';

// import slider
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import images
import metero from '../../assets/icons/home/secondScreen/metero.svg';
import tiltship from '../../assets/icons/home/secondScreen/tillship1.svg';
import star from '../../assets/icons/home/secondScreen/star.svg';
// import moneypocket from '../../assets/icons/home/MyRewards/moneypkt.svg';
import shootingmeteor from '../../assets/icons/home/MyRewards/shotmeteor.svg';
import rewardRocket from '../../assets/icons/home/MyRewards/rewardRocket.svg';
import longArrow from '../../assets/icons/home/MyRewards/longArrow.svg';
import Label from '../../assets/icons/home/MyRewards/Label.svg';

//
import moverocket from '../../assets/icons/home/MyRewards/moverocket.svg';
import clouds from '../../assets/icons/home/MyRewards/clouds.svg';
import lock from '../../assets/icons/home/MyRewards/lock.svg';
import plntbase from '../../assets/icons/home/MyRewards/plntbase.svg';
import gifplnt1 from '../../assets/icons/home/HomePlanets/purple.svg';
import gifplnt2 from '../../assets/icons/home/HomePlanets/yellow.svg';
import gifplnt3 from '../../assets/icons/home/HomePlanets/green.svg';
import gifplnt4 from '../../assets/icons/home/HomePlanets/blue.svg';
import TicTac from '../../assets/images/home/MyRewards/Tic Tak Toe.svg';
import Quiz from '../../assets/images/home/MyRewards/Quiz.svg';
import Spin from '../../assets/images/home/MyRewards/Spin The Bottle.svg';
// import MyRewardSecondScreen from './myRewardScreen2';
// import MyRewardThirdScreen from './myRewardScreen3';
import Voucher from '../../assets/icons/home/MyRewards/Label.svg';
import ProductDemo from '../../assets/icons/home/MyRewards/product-demo.svg';
import Stratergy from '../../assets/icons/home/MyRewards/strategry-consultant.svg';
import Report from '../../assets/icons/home/MyRewards/report.svg';
import refalien from '../../assets/icons/home/MyRewards/refalien.svg';
import StartFour from '../../assets/icons/home/MyRewards/StarFour.svg';
// import revClock from '../../assets/icons/home/MyRewards/clock.svg';
import FAQ from '../../components/faq';
import PlayAndEarnCard from '../../components/playAndEarnCard';
import RewardHistory from './rewardHistory';
import { postData } from '../../services/api';
import { DecryptFunction } from '../../utils/decryptFunction';
import { GiBackwardTime } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import { toastInfo } from '../../utils/toster';
import { UserContext } from '../../UseContext/useContext';

// Discont card Json
const discountData = [
  {
    mainText: 'Flat ',
    highlight: '10% Off',
    subText: 'on Sales Ninja',
    badgeText: '7 d',
    badgeClass: 'background-light-cream',
  },
  {
    mainText: '',
    highlight: '₹ 2000 Off',
    subText: 'on Business Booster',
    badgeText: 'Expire Soon',
    badgeClass: 'background-light-pink',
  },
  {
    mainText: '',
    highlight: '₹ 2000 Off',
    subText: 'on Robo Advisory',
    badgeText: '7 d',
    badgeClass: 'background-light-cream',
  },
  {
    mainText: 'Flat ',
    highlight: '10% Off',
    subText: 'on Sales Ninja',
    badgeText: '7 d',
    badgeClass: 'background-light-cream',
  },
  {
    mainText: 'Flat ',
    highlight: '10% Off',
    subText: 'on Sales Ninja',
    badgeText: '7 d',
    badgeClass: 'background-light-cream',
  },
  {
    mainText: 'Flat ',
    highlight: '10% Off',
    subText: 'on Sales Ninja',
    badgeText: '7 d',
    badgeClass: 'background-light-cream',
  },
];

// Exclusive card JSon
const ExclusiveCardData = [
  {
    title: 'One -on- one Product demo',
    subtitle: 'with a product specialist',
    image: ProductDemo,
    imgClass: 'product-img',
    pointsText: 'Unlock with 200 points',
  },
  {
    title: 'Strategy consultation',
    subtitle: '30 - min Sales Strategy Call',
    image: Stratergy,
    imgClass: 'stratergy-img',
    pointsText: 'Worth ₹5000 - unlockable ',
  },
  {
    title: 'Premium report',
    subtitle: 'Top MFD Trends 2025',
    image: Report,
    imgClass: 'report-img',
    pointsText: 'Downloadable Exclusive',
  },
  {
    title: 'One -on- one Product demo',
    subtitle: 'with a product specialist',
    image: ProductDemo,
    imgClass: 'product-img',
    pointsText: 'Unlock with 200 points',
  },
  {
    title: 'Strategy consultation',
    subtitle: '30 - min Sales Strategy Call',
    image: Stratergy,
    imgClass: 'stratergy-img',
    pointsText: 'Worth ₹5000 - unlockable ',
  },
  {
    title: 'Premium report',
    subtitle: 'Top MFD Trends 2025',
    image: Report,
    imgClass: 'report-img',
    pointsText: 'Downloadable Exclusive',
  },
];
const FaqData = [
  {
    title: '1. Collapsible Group Item',
    content:
      'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.',
  },
  {
    title: '2. Collapsible Group Item',
    content:
      'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.',
  },
  {
    title: '3. Collapsible Group Item',
    content:
      'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.',
  },
];

const MyRewardFirstScreen = () => {
  const Auth = JSON?.parse(sessionStorage.getItem('Auth') ?? '{}');
  const { ContextHomeDataAPI, ContextFaqsDataAPI ,MeterUpdateData} = useContext(UserContext);

  const RewardSliderJson = [
    {
      num: `${ContextFaqsDataAPI?.galaxy_data?.milestones[0]?.milestone_name}`,
      point: `${
        ContextFaqsDataAPI?.galaxy_data?.milestones[0]
          ?.meteors_required_to_unlock
      }`,
      img: gifplnt1,
      lock: false,
    },
    {
      num: `${ContextFaqsDataAPI?.galaxy_data?.milestones[1]?.milestone_name}`,
      point: `${
        ContextFaqsDataAPI?.galaxy_data?.milestones[1]
          ?.meteors_required_to_unlock
      }`,
      img: gifplnt2,
      lock: false,
    },
    {
      num: `${ContextFaqsDataAPI?.galaxy_data?.milestones[2]?.milestone_name}`,
      point: `${
        ContextFaqsDataAPI?.galaxy_data?.milestones[2]
          ?.meteors_required_to_unlock
      }`,
      img: gifplnt3,
      lock: true,
    },
    {
      num: `${ContextFaqsDataAPI?.galaxy_data?.milestones[3]?.milestone_name}`,
      point: `${
        ContextFaqsDataAPI?.galaxy_data?.milestones[3]
          ?.meteors_required_to_unlock
      }`,
      img: gifplnt4,
      lock: true,
    },
    // { num: "E", img: gifplnt5, lock: true },
  ];

  const rewardSliderSetting = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    initialSlide: 0,
    centerPadding: '0px',
    responsive: [
      // {
      //   breakpoint: 1400,
      //   settings: {
      //     slidesToShow: 3,
      //   },
      // },
      {
        breakpoint: 1200, // screens ≤ 1200px
        settings: {
          slidesToShow: 3,
          // centerPadding: '20px',
        },
      },
      {
        breakpoint: 992, // screens ≤ 992px
        settings: {
          slidesToShow: 2,
          // centerPadding: '0px',
        },
      },
      {
        breakpoint: 768, // screens ≤ 768px (tablet)
        settings: {
          slidesToShow: 2,
          // centerPadding: '20px',
        },
      },
      {
        breakpoint: 576, // screens ≤ 576px (mobile)
        settings: {
          slidesToShow: 1,
          centerPadding: '15px',
        },
      },
    ],
  };
  const settings = {
    arrow: false,
    // className: 'center',
    infinite: true,
    centerMode: true,
    centerPadding: '40px',
    slidesToShow: 3.1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    afterChange: function (index) {},
    responsive: [
      {
        breakpoint: 1200, // screens ≤ 1200px
        settings: {
          slidesToShow: 3,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 992, // screens ≤ 992px
        settings: {
          slidesToShow: 2,
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 768, // screens ≤ 768px (tablet)
        settings: {
          slidesToShow: 2,
          centerPadding: '0px',
        },
      },
    ],
  };
  // Footer Planet animation
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

  // =============
  // States
  // ==============
  const [RwdAnimate, setRwdAnimate] = useState(false);
  const [showRwrdHstry, setshowRwrdHstry] = useState(false);
  const [ShowSecScr, setShowSecScr] = useState(true);
  const [leftScrolAnimt, setleftScrolAnimt] = useState(true);
  const [UfoBg, setUfoBg] = useState(false);
  const [MyRewardDataAPI, setMyRewardDataAPI] = useState();
  const [showGameCard, setShowGameCard] = useState('invite');

  // =============
  // Functions
  // ==============
  const handleRewardAnimate = () => {
    setRwdAnimate(true);
  };
  const handleNextScrAnimt = () => {
    setShowSecScr(false);
    setleftScrolAnimt(false);
  };

  // =================================
  //       API FUNCTIONALITY
  // =================================

  const HandleAPI = async () => {
    try {
      const enyptData = await postData('/my-rewards', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
      });
      const Decrpty = await DecryptFunction(enyptData);
      setMyRewardDataAPI(Decrpty);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    HandleAPI();
  }, []);

  //============
  // UseEffect
  //============

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setUfoBg(true); // Dark color when scrolled
      } else {
        setUfoBg(false); // Transparent at top
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const codeRef = useRef();
  const linkRef = useRef();
  const couponRef = useRef();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const inviteCode = 'ABC123XYZ';
  const inviteLink = 'https://yourapp.com/invite/ABC123XYZ';

  const handleCopy = (ref, type) => {
    if (ref.current) {
      const value = ref.current.value;
      navigator.clipboard.writeText(value);
      // Set state to show "Copied!" text
      if (type === 'code') {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000); // Reset after 2 seconds
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    }
  };

 
  console.log('ContextHomeDataAPI?.part2: ', ContextHomeDataAPI?.part2);
  return (
    <>
      <section
        className={`reward-section position-relative ${RwdAnimate ? '' : 'height-100vh overflow-hidden'}`}
      >
        {showRwrdHstry ? (
          <>
            <RewardHistory
              MyRewardDataAPI={MyRewardDataAPI}
              showHistory={setshowRwrdHstry}
            />
          </>
        ) : (
          <div className="reward-inner-section">
            <div
              className={`reward-nav-animt ${RwdAnimate ? 'reward-nav-animt-move-up_' : 'reward-nav-animt-move-down_'}`}
            >
              <Navbar />
            </div>

            {/* UFO SHIP SIDE NAV */}
            {/* Content inside container */}
            <div className="container-fluid mb-4">
              <div
                className={`px-0 d-flex justify-content-center align-items-center w-100 z-1 left-0 ${UfoBg && RwdAnimate ? 'ufo-nav-bg position-fixed slide-down' : 'slide-up'}`}

              >
                <div
                  className={`row container justify-content-between align-items-center ${UfoBg && RwdAnimate ? 'ufo-fixed-active slide-up mt-4' : 'ufo-fixed slide-down'} mt-lg-4 mt-5 z-3`}
                >
                  <div className="col-lg-5 col-md-8 d-flex justify-content-start align-items-center px-0">
                    <div className="till-ship w-75 position-relative tilte-shadow rounded-3">
                      <img
                        className="position-absolute till-ship-img"
                        src={tiltship}
                        alt="tiltship"
                      />
                      <div className="py-2 offset-2 text-white d-flex justify-content-evenly align-items-center">
                        <span className="montserrat-bold font-14 montserrat-bold till-ship-border-color pe-3 z-1 position-relative">
                          {ContextHomeDataAPI?.part2}
                          <img
                            className="my-1 mx-2"
                            src={metero}
                            alt="metero"
                          />
                          <span className="font-14 montserrat-medium">
                            Meteors
                          </span>
                        </span>
                        <span className="font-14 montserrat-semibold">
                          {ContextHomeDataAPI?.part1}
                          <img className="mx-1" src={star} alt="star" />
                          <span className="space-grotesk-medium">star</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-4 text-end px-0">
                    <button
                      onClick={() => setshowRwrdHstry(true)}
                      className={`bg-transparent rounded-5 px-3 py-1 font-16 montserrat-semibold ${UfoBg && RwdAnimate ? 'text-white border-white slide-up' : 'text-blue reward-history'}`}
                    >
                      Reward History
                      <GiBackwardTime className={`ms-2 font-18 montserrat-semibold ${UfoBg && RwdAnimate ? 'text-white' : 'text-blue'}`} />

                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* MY REWARDS FIRST SCREEN */}
            {ShowSecScr && (
              <>
                <div className="container pt-2">
                  <div className={`row my-reward-cards g-4`}>
                    <div className="col-lg-6 col-12">
                      <div className="myreward-card-1 px-4 pb-4 rounded-4">
                        <h2 className="font-24 montserrat-bold text-white mb-1 mt-3 pt-3">
                          My Collections
                        </h2>
                        <p className="font-14 montserrat-medium text-white">
                          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                        </p>
                        <div className="row justify-content-around">
                          <div className="col-lg-7 col-md-7">
                            <div className="rounded-4 background-light-white-1 position-relative px-2 pb-1 pt-2 mt-4">
                              <span className="font-46 montserrat-semibold text-blue ms-1">
                                {MyRewardDataAPI?.part1}
                              </span>{' '}
                              <span className="text-blue font-16 montserrat-semibold ms-1">
                                Stars
                              </span>{' '}
                              <img
                                className="position-absolute w-50 myreward-star"
                                src={star}
                                alt="star"
                              />
                            </div>

                            <div className="d-flex position-relative justify-content-between rounded-4 background-light-white-1 px-2 pb-1 pt-5 mt-4">
                              <div className="d-inline">
                                <span className="font-46 montserrat-semibold text-blue ms-1">
                                  {MyRewardDataAPI?.part2}
                                </span>{' '}
                                <span className="text-blue font-16 montserrat-semibold ms-1">
                                  Meteors
                                </span>{' '}
                              </div>
                              <img
                                className="w-25 position-absolute myreward-shotingmeteor"
                                src={shootingmeteor}
                                alt="star"
                              />
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4 rounded-4 background-light-white-1 px-2 pb-1 pt-4 mt-4 position-relative">
                            <img
                              src={Label}
                              className="position-absolute myreward-voucher"
                              alt="Laoding"
                            />

                            <div className="position-absolute bottom-0">
                              <span className="font-46 montserrat-semibold text-blue ms-1">
                                {MyRewardDataAPI?.part3}
                              </span>{' '}
                              <span className="text-blue font-16 montserrat-semibold ms-1">
                                Vouchers
                              </span>{' '}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="myreward-card-2 px-4 pb-4 rounded-4">
                        <h2 className="font-24 montserrat-bold text-white mb-1 mt-3 pt-3">
                          Earn More
                        </h2>
                        <p className="font-14 montserrat-medium text-white">
                          Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                        </p>
                        {showGameCard === 'cards' ? (
                          <>
                            <div className="row">
                              {[TicTac, Quiz, Spin].map((items, index) => (
                                <div className="col-4" key={index}>
                                  <div>
                                    <img
                                      src={items}
                                      className="game-img"
                                      alt="Lodaing"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="mb-3">
                              <label
                                className="d-block font-14 montserrat-medium text-white mb-1"
                                htmlFor="Invite Code"
                              >
                                Invite Code
                              </label>
                              <div className="position-relative">
                                <input
                                  ref={codeRef}
                                  className="background-light-white-2 text-blue border-0 rounded-3 w-100 p-2 pr-5"
                                  type="text"
                                  defaultValue={MyRewardDataAPI?.part4}
                                  // value={inviteCode}
                                  id="inviteCode"
                                />
                                <button
                                  type="button"
                                  className="reward-copy-button rounded-1 text-white font-14 montserrat-regular py-1 background-text-blue"
                                  onClick={() => handleCopy(codeRef, 'code')}
                                >
                                  {copiedCode ? 'Copied!' : 'Copy Code'}
                                </button>
                              </div>
                            </div>
                            <div className="mb-5">
                              <label
                                className="d-block font-14 montserrat-medium text-white mt-4 mb-1"
                                htmlFor="Invite Link"
                              >
                                Invite Link
                              </label>
                              <div className="position-relative">
                                <input
                                  ref={linkRef}
                                  className="background-light-white-2 text-blue border-0 rounded-3 w-100 p-2 pr-5"
                                  type="text"
                                  // value={inviteLink}
                                  defaultValue={MyRewardDataAPI?.part6}
                                  id="inviteLink"
                                  // readOnly
                                />
                                <button
                                  type="button"
                                  className="reward-copy-button text-white rounded-1 font-14 montserrat-regular py-1 background-text-blue"
                                  onClick={() => handleCopy(linkRef, 'link')}
                                >
                                  {copiedLink ? 'Copied!' : 'Copy Link'}
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                        <div className="d-flex justify-content-between mt-4">
                          <button
                            className={`px-4 font-16 montserrat-semibold width-48 py-2 rounded-3 ${
                              showGameCard === 'cards'
                                ? 'text-white background-text-blue' // Active style
                                : 'bg-white text-blue border-blue' // Inactive style
                            }`}
                            onClick={() => setShowGameCard('cards')}
                          >
                            Play & Earn
                          </button>
                          <button
                            className={`px-4 font-16 montserrat-semibold width-48 py-2 rounded-3 ${
                              showGameCard === 'invite'
                                ? 'text-white background-text-blue'
                                : 'bg-white text-blue border-blue'
                            }`}
                            onClick={() => setShowGameCard('invite')}
                          >
                            Invite a Friend
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`myreward-bottom mt-5 text-center ${RwdAnimate ? 'rwd-jrny-hide' : ''}`}
                  >
                    <h2 className="m-0 font-32 space-grotesk-bold text-blue">
                      Your Reward Journey So Far
                    </h2>
                    <img
                      onClick={handleRewardAnimate}
                      className="offset-3 cursor-pointer"
                      src={longArrow}
                      alt="longArrow"
                    />
                  </div>
                  <div
                    className={`position-absolute bottom-0 start-0 ${RwdAnimate ? 'footer-rkt-down' : ''}`}
                  >
                    <img
                      className="width-60"
                      src={rewardRocket}
                      alt="footerrocket"
                    />
                  </div>
                </div>
              </>
            )}

            {leftScrolAnimt && (
              <>
                {/* REWARD JOURNEY SLIDER */}
                <div className="container">
                  <div
                    className={`d-flex justify-content-between reward-slider-card rounded-4 overflow-hidden position-relative py-3 mt-5 ${RwdAnimate ? 'rwd-jrny-sld-active' : 'rwd-jrny-sld'}`}
                  >
                    <div className="width-16">
                      <h3 className="font-20 montserrat-semibold text-white ms-3 w-100">
                        Your Reward Journey <br /> So Far
                      </h3>
                      <img
                        className="position-absolute reward-moving-rkt"
                        src={moverocket}
                        alt="moverocket"
                      />
                      <img
                        className="width-10 position-absolute bottom-0 "
                        src={clouds}
                        alt="clouds"
                      />
                    </div>
                    <div className="slider-container width-82 pe-2">
                      <Slider
                        className="reward-slider"
                        {...rewardSliderSetting}
                      >
                        {RewardSliderJson?.map((slide, index) => (
                          <div className="background-light-white-2 reward-slides border-radius-12 text-center pt-2 pb-3 px-2">
                            <h4 className="font-14 space-grotesk-bold montserrat-semibold text-blue">
                              {slide?.num}
                            </h4>
                            <div className="position-relative d-flex justify-content-center">
                              <img
                                className="width-24 mx-auto position-absolute"
                                src={slide?.img}
                                alt="reward image"
                              />
                              <img
                                className="width-34 mx-auto mt-5"
                                src={plntbase}
                                alt="reward image"
                              />
                            </div>

                            {/* <h4 className="font-14 montserrat-regular">1000 Meteors</h4> */}
                            {Number(slide?.point) >= Number(ContextHomeDataAPI?.part2) ? (
                              <button className="background-text-blue w-100 mt-4 mx-auto border-0 border-radius-8 font-size-12 d-flex justify-content-center align-items-center py-2 mx-3 opacity-25 montserrat-semibold text-white">
                                {slide?.point} Meteors{' '}
                                <img
                                  className="ms-2"
                                  src={lock}
                                  alt="Loading"
                                />
                              </button>
                            ) : (
                              <button
                                // onClick={handleNextScrAnimt}
                                className="background-text-blue w-100 mt-4 mx-auto border-0 border-radius-8 font-size-12  py-2 mx-3 montserrat-semibold text-white"
                              >
                                <span className="">{slide?.point} Meteors</span>
                              </button>
                            )}
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                  {/* Discount Cards start here */}
                  <div className="discount-code-section my-5 px-4">
                    <div className="discount-bg-img pt-4">
                      <p className="font-size-18 space-grotesk-bold text-blue">
                        Discount Codes
                      </p>
                    </div>
                    <p className="text-blue font-size-14 montserrat-medium mb-1">
                      Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum
                    </p>
                    <div className="slider-container discount-slider pb-4">
                      <Slider className="" {...settings}>
                        {discountData.map((item, index) => (
                          <div key={index} className="px-2">
                            <div className="discount-card background-text-blue p-2 position-relative">
                              <div className="row gx-0">
                                <div className="col-9 text-white d-flex my-2 justify-content-center">
                                  <div className="discount-white-box me-2"></div>
                                  <p className="font-14 montserrat-medium mt-2 lh-sm">
                                    {item.mainText}
                                    <span className="font-16 montserrat-bold">
                                      {item.highlight}
                                    </span>{' '}
                                    {item.subText}
                                  </p>
                                </div>
                              </div>
                              <div className="col-3">
                                <div
                                  className={`discount-deals montserrat-semibold font-12 ${item.badgeClass} px-3 py-1 text-blue me-0 position-absolute top-0 end-0`}
                                >
                                  {item.badgeText}
                                </div>
                              </div>
                              <div className="discount-card-footer p-2 d-flex justify-content-between">
                                <p className="text-white mb-0 font-12 montserrat-regular">
                                  Coupon code:
                                  <span className="text-uppercase font-14 montserrat-medium">
                                    CB1234
                                  </span>
                                </p>
                                {/* <p className='text-white mb-0 font-12 montserrat-regular d-flex'>
                                  Coupon code:
                                  <input
                                    ref={couponRef}
                                    value="CB1234"
                                    readOnly
                                    className='border-0 bg-transparent text-uppercase font-14 montserrat-medium text-white'
                                  />
                                </p> */}
                                <button
                                  className="border-0 bg-white text-blue font-10 montserrat-regular copy-btn px-2"
                                  onClick={() =>
                                    handleCopy(couponRef, 'coupon')
                                  }
                                >
                                  Copy Code
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>

                  {/* Exclusive Perks */}
                  <div className="discount-code-section my-5 px-4">
                    <div className="discount-bg-img pt-4">
                      <p className="font-size-18 space-grotesk-bold text-blue">
                        Exclusive Perks
                      </p>
                    </div>
                    <p className="text-blue font-size-14 montserrat-medium mb-2">
                      Exclusive perks just for you
                    </p>

                    <div className="slider-container exclusive-slider pb-4">
                      <Slider {...settings}>
                        {ExclusiveCardData.map((item, index) => (
                          <div key={index}>
                            <div className="discount-card exclusive-cards w-100 background-text-blue p-3">
                              <div className="row gx-0 mb-3">
                                <div className="col-8 text-white">
                                  <p className="font-16 mb-0 text-uppercase montserrat-medium lh-sm">
                                    {item.title}
                                  </p>
                                  <p className="font-14 montserrat-semibold exclusive-card-yellow-text">
                                    {item.subtitle}
                                  </p>
                                </div>
                                <div className="col-4 d-flex justify-content-end">
                                  <img
                                    src={item.image}
                                    className={`${item.imgClass}`}
                                    alt="Loading"
                                  />
                                </div>
                              </div>
                              <div className="col-12 d-flex justify-content-between align-items-center">
                                <p className="font-14 space-grotesk-medium text-white mb-0">
                                  {item.pointsText}
                                </p>
                                <p className="exclusive-card-blue-text font-12 montserrat-medium mb-0">
                                  T&C Applied
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </section>
      <section
        className={`myreward-second-section ${RwdAnimate ? '' : 'd-none'}`}
      >
        {/*------- SECOND SECTION START AFTER BANNER ---------- */}
        {/* REFERRED TO SECTION */}
        <div className="referred-banner position-relative">
          <div className="container">
            <div className="row py-5 py-3 my-4 align-items-center">
              <div className="col-lg-6 col-md-12 mb-5 mb-lg-0">
                <h2 className="text-white font-32 montserrat-semibold">
                  You Have Referred To 5 Friends
                </h2>
                <p className="text-white font-24 space-grotesk-medium">
                  Keep Referring To Earn Even More !!
                </p>
                <div className="d-flex justify-content-between gap-4 mb-5">
                  <NavLink to={'/referral'} className={'w-100'}>
                    <button className="py-2 w-100 rounded-3 font-16 montserrat-semibold border border-0 background-text-blue text-white">
                      See my Referrals
                    </button>
                  </NavLink>
                  <NavLink className={'w-100'} to={'/invitefriend'}>
                    <button className="py-2 w-100 rounded-3 font-16 montserrat-semibold border-blue text-blue">
                      Refer more & Earn
                    </button>
                  </NavLink>
                </div>
              </div>
              <div className="col-lg-6 mt-lg-0 mt-5 col-md-12">
                <img
                  className="position-absolute bottom-0 img-fluid"
                  src={refalien}
                  alt="refalien"
                />
              </div>
            </div>
          </div>
        </div>
        {/* PLAY AND EARN CARDS */}
        <div className="container" id="play-and-earn">
          <h2 className="text-dark-blue space-grotesk-bold mt-120 mb-4 pb-4 ">
            Play & Earn
          </h2>
          <PlayAndEarnCard />
        </div>
        {/* REDEEM CLAIM SECTION */}
        <div className="container">
          <h2 className="text-dark-blue space-grotesk-bold mt-120 mb-4 pb-4 ">
            Here's How You Unlock Every Reward
          </h2>

          <div className="redeem-claim text-center rounded-4 p-4">
            <h2 className="font-24 montserrat-semibold text-white mb-3 ls-4">
              Redeem, Claim Or Level Up
            </h2>
            <p className="font-18 montserrat-medium text-white ls-4">
              You’ve earned it, Now it’s time to claim your perks and level up
            </p>

            <div className="text-light-yellow font-32 flex-column flex-lg-row space-grotesk-bold d-flex justify-content-center align-items-center my-5 ls-4">
              Collect meteors
              <img className="mx-4" src={StartFour} alt="Loading" />
              Unlock Planets
              <img className="mx-4" src={StartFour} alt="Loading" />
              Redeem Stars
            </div>
            <div className="pt-3 row justify-content-between justify-content-lg-center align-items-center">
              <div className="col-6 col-lg-3">
                <NavLink to={'/invitefriend'}>
                  <button className="py-2 w-100 mb-0 rounded-3 text-white bg-transparent border border-white font-16 montserrat-semibold">
                    Invite a Friend
                  </button>
                </NavLink>
              </div>
              <div className="col-6 col-lg-3">
                <button
                  onClick={() => toastInfo('Comming Soon')}
                  className="py-2 w-100 rounded-3 border-0 bg-white text-blue font-16 montserrat-semibold"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* FAQ SECTION */}
        <FAQ items={ContextFaqsDataAPI?.rewards_faqs} />
        {/* FOOTER SECTION */}
        <div
          ref={footerRef}
          className="offer-footer position-relative overflow-hidden mt-5"
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
      </section>
    </>
  );
};

export default MyRewardFirstScreen;
