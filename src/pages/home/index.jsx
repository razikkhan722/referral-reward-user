import React, { useRef, useEffect, useState, useContext } from 'react';
import Navbar from '../../components/navbar';
import Herosection from './herosection';
// import PlanetSlider from './PlanetSlider/planetSlider';
// import SecondScreen from '../Pages/secondScreen/secondScreen';
// import images
import metero from '../../assets/icons/home/secondScreen/metero.svg';
import tiltship from '../../assets/icons/home/secondScreen/tillship1.svg';
import star from '../../assets/icons/home/secondScreen/star.svg';
import borderstar from '../../assets/icons/home/secondScreen/bdrstar.svg';
import prgicon from '../../assets/icons/home/secondScreen/prgicon.svg';
import leftarrow from '../../assets/icons/home/secondScreen/leftarrow.svg';
import longarrow from '../../assets/icons/home/secondScreen/lngarw.svg';
import rocket from '../../assets/icons/home/secondScreen/rocket.svg';
import astronot from '../../assets/icons/home/secondScreen/astronot.svg';
import alenship from '../../assets/icons/home/secondScreen/alienship.svg';

import pathway from '../../assets/icons/home/secondScreen/pathway.svg';
import centerPlanet1 from '../../assets/icons/planets/purple.svg';
import centerPlanet2 from '../../assets/icons/planets/yellow.svg';
import centerPlanet3 from '../../assets/icons/planets/green.svg';
import centerPlanet4 from '../../assets/icons/planets/blue.svg';
import planetRing from '../../assets/icons/planets/rings.svg';
import { postData } from '../../services/api';
import { UserContext } from '../../utils/UseContext/useContext';
import { DecryptFunction } from '../../utils/decryptFunction';
import { NavLink } from 'react-router-dom';
// import { processDynamicSpecificFieldsParallel } from '../../utils/decryptFunction';

const images = [centerPlanet1, centerPlanet2, centerPlanet3, centerPlanet4];

const Index = ({ isExiting, isActive }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showSecScr, setShowSecScr] = useState(true);
  const [SecScrAnimt, setSecScrAnimt] = useState(false);
  const {
    AuthLocal,
    ContextFaqsDataAPI,
    ContextHomeDataAPI,
    setContextHomeDataAPI,
    MeterUpdateData,
    setMeterUpdateData,
  } = useContext(UserContext);

  // --------------------------------------------------
  const [currentIndex, setCurrentIndex] = useState(
    ContextHomeDataAPI?.part4?.length - 1 || 0,
  );
  const [rotation, setRotation] = useState(0);
  const [ringRotation, setRingRotation] = useState(0);
  const [direction, setDirection] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // ==========
  // Function
  // ==========

  const handleToggle = () => {
    setSecScrAnimt(true);
  };

  const handleAnimationEnd = () => {
    setShowSecScr((prev) => !prev);
    setSecScrAnimt(false);
  };

  // ======================================================
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => setShowModal(false);
  // const handleOpen = () => setShowModal(true);

  //  Animation Functionality Code
  const leftBoxRef = useRef(null);
  const rightBoxRef = useRef(null);
  const b2Ref = useRef(null);

  // State for positions of left and right boxes
  const [leftBoxLeft, setLeftBoxLeft] = useState('0%'); // initial position for left box
  const [rightBoxLeft, setRightBoxLeft] = useState('0%'); // initial position for right box
  const [BoxOpacity, setBoxOpacity] = useState(1);
  const [sectionOpacity, setsectionOpacity] = useState(1);
  const [HomeDataAPI, setHomeDataAPI] = useState();

  const Auth = JSON?.parse(sessionStorage.getItem('Auth') ?? '{}');

  // const [leftBoxClass, setLeftBoxClass] = useState('left-box default-position');
  // const [rightBoxClass, setRightBoxClass] = useState('left-box default-position');

  // ===============================
  // Planet Section Functionality
  // ===============================
  const rotate = (dir) => {
    if (isAnimating) return; // prevent interaction during animation
    setDirection(dir);
    setRotation((prev) => (dir === 'right' ? prev + 50 : prev - 50));
    setRingRotation((prev) => (dir === 'right' ? prev + 50 : prev - 50));

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        dir === 'right'
          ? (prevIndex + 1) % images.length
          : (prevIndex - 1 + images.length) % images.length,
      );
    }, 200);
  };

  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  // Trigger Animation

  const toggleAnimtElements = () => {
    setIsVisible((prev) => !prev);
    handleToggle();
  };
  const filteredImages = images.filter(
    (_, index) =>
      index !== prevIndex && index !== nextIndex && index !== currentIndex,
  );

  // Choose an image from the filtered list
  const selectedImage = filteredImages[0];
  // =================================
  // Planet Section Functionality END
  // =================================

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
      setHomeDataAPI(Decrpty);
      setContextHomeDataAPI(Decrpty);
      setCurrentIndex(Decrpty?.part4?.length - 1 || 0);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const UpdMtrData = async () => {
    try {
      const enyptData = await postData(
        `/update-user-rewards/${Auth?.user_id}`,
        {
          user_id: Auth?.user_id,
          log_alt: Auth?.log_alt,
          mode: Auth?.mode,
        },
      );
      setMeterUpdateData(enyptData);
      // const Decrpty = await DecryptFunction(enyptData);
      // console.log('Decrpty: ', Decrpty);
      // setHomeDataAPI(Decrpty);
      // setContextHomeDataAPI(Decrpty);
      // setCurrentIndex(Decrpty?.part4?.length - 1 || 0);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    const updateMeteors = setInterval(() => {
      UpdMtrData();
    }, 7000);

    return () => {
      clearInterval(updateMeteors);
    };
  }, []);

  useEffect(() => {
    HandleAPI();
  }, []);

  return (
    <>
      <section
        id="Heome_Section"
        className={`hero-section  position-relative height-100vh ${showSecScr ? 'bg-firstscreen' : 'bg-secondscreen'}`}
      >
        <div className={`${showSecScr ? '' : 'container'}`}>
          {/* Navbar */}
          <div className={`${isVisible ? 'home-animt-show' : ''}`}>
            {showSecScr ? (
              <span
                className={`nav-section scr-fst-nav ${isVisible ? 'nav-slide-down' : 'nav-slide-up'}`}
                style={{
                  animation: SecScrAnimt
                    ? 'moveUpFade 0.7s forwards'
                    : 'fadeInDown 0.7s',
                }}
                onAnimationEnd={SecScrAnimt ? handleAnimationEnd : undefined}
              >
                <Navbar />
              </span>
            ) : (
              <div
                className="row justify-content-between mt-4 "
                style={{
                  animation: SecScrAnimt
                    ? 'moveDownFade 0.7s forwards'
                    : 'fadeInUp 0.7s',
                }}
                onAnimationEnd={SecScrAnimt ? handleAnimationEnd : undefined}
              >
                <div className="col-lg-3">
                  <span
                    className=" text-white d-flex font-size-14 montserrat-medium"
                    onClick={toggleAnimtElements}
                  >
                    <img
                      className="me-1 cursor-pointer"
                      src={leftarrow}
                      alt="leftarrow"
                    />{' '}
                    <span className="cursor-pointer">Back</span>
                  </span>
                </div>
                <div className="col-lg-4 d-flex justify-content-end px-0 mt-4">
                  <div className="till-ship w-75 position-relative tilte-shadow rounded-3">
                    <img
                      className="position-absolute till-ship-img"
                      src={tiltship}
                      alt="tiltship"
                    />
                    <div className="py-2 offset-2 text-white d-flex justify-content-evenly align-items-center">
                      <span className="montserrat-bold font-14 montserrat-bold till-ship-border-color pe-3 z-1 position-relative">
                        {ContextHomeDataAPI?.part2}
                        <img className="my-1 mx-2" src={metero} alt="metero" />
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
              </div>
            )}
          </div>
          {/* Middle Section */}
          <div
            className="row justify-content-between second-screen-xl mt-xl-72"
            ref={b2Ref}
          >
            {showSecScr ? (
              <span className={`${!SecScrAnimt ? '' : 'middle-sect'}`}>
                <Herosection
                  HomeDataAPI={HomeDataAPI}
                  currentPlnt={['A', 'B', 'C', 'D'][currentIndex]}
                />
              </span>
            ) : (
              // second page middle section sidepanel and 4 plnts
              <div
                className={`row justify-content-between second-screen-xl ${isExiting ? 'hidden-second-sect' : 'visible-second-sect'} ${isActive ? 'default-position' : 'hidden-second-sect'} ${
                  !SecScrAnimt ? 'visible-second-sect' : 'hidden-second-sect'
                }`}
              >
                <div
                  className={`col-lg-2 px-0 d-flex flex-column justify-content-between ${
                    !SecScrAnimt ? 'visible-second-sect' : 'hidden-second-sect'
                  }`}
                >
                  <div
                    className={`left-sidebar-main-div ${isExiting ? 'hidden-second-sect' : 'visible-second-sect'} ${isActive ? 'default-position' : 'hidden-second-sect'} `}
                  >
                    <p className="text-dark-blue space-grotesk-medium font-16 mb-3">
                      Your Progress So far
                    </p>
                    <div className="progress-sect rounded-4">
                      {/* Progress bar */}
                      <ul className="list-unstyled mb-0 ps-4 pt-1">
                        <li className="d-flex pt-2 mt-2 position-relative">
                          <div className="d-grid progress-side-sec">
                            <img
                              className="w-50 mx-auto"
                              src={prgicon}
                              alt="prgicon"
                            />{' '}
                            <hr className="opacity-100 progress-side-hr " />
                          </div>{' '}
                          {ContextHomeDataAPI?.part2 <=
                          ContextFaqsDataAPI?.galaxy_data?.milestones[0]
                            ?.meteors_required_to_unlock ? (
                            <span className="position-absolute space-grotesk-medium font-12 tooltiptext p-2 rounded text-light-yellow">
                              {ContextHomeDataAPI?.part2} Meteors
                            </span>
                          ) : null}
                          {
                            <span className="ms-2 progress-sect-name mt-1 space-grotesk-medium font-16 text-blue-2">
                              Planet A
                            </span>
                          }
                        </li>
                        <li
                          className={`d-flex ${ContextHomeDataAPI?.part2 >= ContextFaqsDataAPI?.galaxy_data?.milestones[0]?.meteors_required_to_unlock + 1 && ContextHomeDataAPI?.part2 <= ContextFaqsDataAPI?.galaxy_data?.milestones[1]?.meteors_required_to_unlock ? 'position-relative' : ''}`}
                        >
                          <div className="d-grid progress-side-sec">
                            {ContextHomeDataAPI?.part2 <=
                            ContextFaqsDataAPI?.galaxy_data?.milestones[0]
                              ?.meteors_required_to_unlock ? (
                              <hr className="opacity-100 progress-side-hr11" />
                            ) : null}
                            <img
                              className="w-50 mx-auto"
                              src={prgicon}
                              alt="prgicon"
                            />{' '}
                            {ContextHomeDataAPI?.part2 >=
                              ContextFaqsDataAPI?.galaxy_data?.milestones[0]
                                ?.meteors_required_to_unlock +
                                1 &&
                            ContextHomeDataAPI?.part2 <=
                              ContextFaqsDataAPI?.galaxy_data?.milestones[2]
                                ?.meteors_required_to_unlock ? (
                              <hr className="opacity-100 progress-side-hr " />
                            ) : null}
                          </div>{' '}
                          {ContextHomeDataAPI?.part2 >=
                            ContextFaqsDataAPI?.galaxy_data?.milestones[0]
                              ?.meteors_required_to_unlock +
                              1 &&
                          ContextHomeDataAPI?.part2 <=
                            ContextFaqsDataAPI?.galaxy_data?.milestones[1]
                              ?.meteors_required_to_unlock ? (
                            <span className="position-absolute space-grotesk-medium font-12 tooltiptext p-2 rounded text-light-yellow">
                              {ContextHomeDataAPI?.part2} Meteors
                            </span>
                          ) : null}
                          <span
                            className={`${ContextHomeDataAPI?.part2 >= ContextFaqsDataAPI?.galaxy_data?.milestones[1]?.meteors_required_to_unlock ? 'ms-2 progress-sect-name mt-1 space-grotesk-medium font-16 text-blue-2' : 'ms-2 progress-sect-name progress-test-mt d-flex align-items-end space-grotesk-medium font-16 text-blue-2'}`}
                          >
                            Planet B
                          </span>
                        </li>
                        <li
                          className={`d-flex ${ContextHomeDataAPI?.part2 >= ContextFaqsDataAPI?.galaxy_data?.milestones[1]?.meteors_required_to_unlock + 1 && ContextHomeDataAPI?.part2 <= ContextFaqsDataAPI?.galaxy_data?.milestones[2]?.meteors_required_to_unlock ? 'position-relative' : ''}`}
                        >
                          <div className="d-grid progress-side-sec">
                            {ContextHomeDataAPI?.part2 <=
                            ContextFaqsDataAPI?.galaxy_data?.milestones[1]
                              ?.meteors_required_to_unlock ? (
                              <hr className="opacity-100 progress-side-hr11" />
                            ) : null}
                            <img
                              className="w-50 mx-auto"
                              src={prgicon}
                              alt="prgicon"
                            />{' '}
                            {ContextHomeDataAPI?.part2 >=
                              ContextFaqsDataAPI?.galaxy_data?.milestones[1]
                                ?.meteors_required_to_unlock +
                                1 &&
                            ContextHomeDataAPI?.part2 <=
                              ContextFaqsDataAPI?.galaxy_data?.milestones[2]
                                ?.meteors_required_to_unlock ? (
                              <hr className="opacity-100 progress-side-hr " />
                            ) : null}
                          </div>{' '}
                          {ContextHomeDataAPI?.part2 >=
                            ContextFaqsDataAPI?.galaxy_data?.milestones[1]
                              ?.meteors_required_to_unlock +
                              1 &&
                          ContextHomeDataAPI?.part2 <=
                            ContextFaqsDataAPI?.galaxy_data?.milestones[2]
                              ?.meteors_required_to_unlock ? (
                            <span className="position-absolute space-grotesk-medium font-12 tooltiptext p-2 rounded text-light-yellow">
                              {ContextHomeDataAPI?.part2} Meteors
                            </span>
                          ) : null}
                          <span
                            className={`${ContextHomeDataAPI?.part2 >= ContextFaqsDataAPI?.galaxy_data?.milestones[2]?.meteors_required_to_unlock ? 'ms-2 progress-sect-name mt-1 space-grotesk-medium font-16 text-blue-2' : 'ms-2 progress-sect-name progress-test-mt d-flex align-items-end space-grotesk-medium font-16 text-blue-2'}`}
                          >
                            Planet C
                          </span>
                        </li>
                        <li
                          className={`d-flex ${ContextHomeDataAPI?.part2 >= ContextFaqsDataAPI?.galaxy_data?.milestones[3]?.meteors_required_to_unlock + 1 && ContextHomeDataAPI?.part2 <= 4000 ? 'position-relative' : ''}`}
                        >
                          <div className="d-grid progress-side-sec">
                            {ContextHomeDataAPI?.part2 <=
                            ContextFaqsDataAPI?.galaxy_data?.milestones[3]
                              ?.meteors_required_to_unlock ? (
                              <hr className="opacity-100 progress-side-hr11" />
                            ) : null}
                            <img
                              className="w-50 mx-auto"
                              src={prgicon}
                              alt="prgicon"
                            />{' '}
                            {ContextHomeDataAPI?.part2 >=
                              ContextFaqsDataAPI?.galaxy_data?.milestones[3]
                                ?.meteors_required_to_unlock +
                                1 && ContextHomeDataAPI?.part2 <= 6000 ? (
                              <hr className="opacity-100 progress-side-hr " />
                            ) : null}
                          </div>{' '}
                          {ContextHomeDataAPI?.part2 >=
                            ContextFaqsDataAPI?.galaxy_data?.milestones[3]
                              ?.meteors_required_to_unlock +
                              1 && ContextHomeDataAPI?.part2 <= 6000 ? (
                            <span className="position-absolute space-grotesk-medium font-12 tooltiptext p-2 rounded text-light-yellow">
                              {ContextHomeDataAPI?.part2} Meteors
                            </span>
                          ) : null}
                          <span
                            className={`${ContextHomeDataAPI?.part2 >= 6000 ? 'ms-2 progress-sect-name mt-1 space-grotesk-medium font-16 text-blue-2' : 'ms-2 progress-sect-name progress-test-mt d-flex align-items-end space-grotesk-medium font-16 text-blue-2'}`}
                          >
                            Planet D
                          </span>
                        </li>{' '}
                        {/* <li
                          className={`d-flex ${ContextHomeDataAPI?.part2 >= 4000 ? 'position-relative' : ''}`}
                        >
                          <div className="d-grid progress-side-sec">
                            {pnt <= 2000 ? (
                              <hr className="opacity-100 progress-side-hr-2" />
                            ) : null}
                            <img
                              className="w-50 mx-auto opacity-75"
                              src={prgicon}
                              alt="prgicon"
                            />{' '}
                          </div>{' '}
                          <span className="ms-2 progress-sect-name progress-test-mt d-flex align-items-end space-grotesk-medium font-16 text-blue-2">
                            Planet C
                          </span>
                        </li>
                        <li
                          className={`d-flex ${pnt >= 5000 ? 'position-relative' : ''}`}
                        >
                          <div className="d-grid progress-side-sec">
                            {pnt >= 5000 ? (
                              <hr className="opacity-100 progress-side-hr-2" />
                            ) : null}
                            <img
                              className="w-50 mx-auto opacity-75"
                              src={prgicon}
                              alt="prgicon"
                            />{' '}
                          </div>{' '}
                          <span className="ms-2 progress-sect-name progress-test-mt d-flex align-items-end space-grotesk-medium font-16 text-blue-2">
                            Planet D
                          </span>
                        </li> */}
                      </ul>

                      <div className="text-center mt-34 pb-3">
                        <img
                          className="w-25"
                          src={borderstar}
                          alt="borderstar"
                        />
                        <h4 className="my-0 mt-2 text-blue-2  font-18 space-grotesk-medium">
                          Galaxy Complete
                        </h4>
                      </div>
                    </div>
                  </div>
                  <NavLink to={'/reward'} className={'text-decoration-none'}>
                    <div
                      className={`d-flex justify-content-evenly background-text-blue rounded-2 position-relative py-2 left-box play-earn-box ${isExiting ? 'move-left' : ''} ${isActive ? 'default-position' : 'move-left'}`}
                      ref={leftBoxRef}
                      id="leftBox"
                    >
                      <img
                        className="w-25 progress-sect-rocket position-absolute"
                        src={rocket}
                        alt="rocket"
                      />
                      <span className="text-white font-14 montserrat-semibold offset-2">
                        Play & Earn
                      </span>
                      <img src={longarrow} alt="longarrow" />
                    </div>
                  </NavLink>
                  <NavLink
                    to={'/invitefriend'}
                    className={'text-decoration-none'}
                  >
                    <div
                      className={`d-flex justify-content-evenly background-dark-pink mt-0 rounded-2 position-relative py-2 left-box ${isExiting ? 'move-left' : ''} ${isActive ? 'default-position' : 'move-left'} `}
                      ref={leftBoxRef}
                      id="leftBox"
                    >
                      <img
                        className=" progress-sect-astronot position-absolute"
                        src={astronot}
                        alt="astronot"
                      />
                      <span className="text-white font-14 montserrat-semibold offset-2 ">
                        Invite & Earn
                      </span>
                      <img src={longarrow} alt="longarrow" />
                    </div>
                  </NavLink>
                </div>
                <div className="col-lg-9 planet-section">
                  <div className="row ">
                    <div className="col-lg-3 text-center">
                      <img
                        className={`width-50 width-md-50 width-lg-25 width-xl-70 planet-shadow-${currentIndex === 0 ? 'purple' : currentIndex === 1 ? 'yellow' : currentIndex === 2 ? 'green' : 'blue'}`}
                        src={images[currentIndex]}
                        alt="purple"
                      />
                    </div>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-3 text-center">
                      <img
                        className={`width-50 width-md-50 width-lg-25 width-xl-70 planet-shadow-${nextIndex === 0 ? 'purple' : nextIndex === 1 ? 'yellow' : nextIndex === 2 ? 'green' : 'blue'}`}
                        src={images[nextIndex]}
                        alt="yellow"
                      />
                    </div>
                    <div className="col-lg-3"></div>
                  </div>
                  <div className="row position-relative">
                    <img
                      className="position-absolute second-screen-pathway px-0"
                      src={pathway}
                      alt="pathway"
                    />
                    <div className="col-lg-3 text-center text-dark-blue mt-4 pt-4 px-0">
                      <h4 className="mb-2 space-grotesk-medium font-24">
                        {
                          ContextFaqsDataAPI?.galaxy_data?.milestones[0]
                            ?.milestone_name
                        }
                      </h4>

                      {ContextFaqsDataAPI?.galaxy_data?.milestones[0]?.milestone_description
                        ?.split(/(\d+\s*meteors)/gi)
                        ?.map((part, index) =>
                          /(\d+\s*meteors)/i?.test(part) ? (
                            <span className="space-grotesk-medium" key={index}>
                              {part}
                            </span>
                          ) : (
                            <p className="space-grotesk-regular font-14 my-0">
                              {part}
                            </p>
                          ),
                        )}
                    </div>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-3 text-center text-dark-blue mt-4 pt-4 px-0">
                      <h4 className="mb-2 space-grotesk-medium font-24">
                        {
                          ContextFaqsDataAPI?.galaxy_data?.milestones[2]
                            ?.milestone_name
                        }
                      </h4>
                      {ContextFaqsDataAPI?.galaxy_data?.milestones[2]?.milestone_description
                        ?.split(/(\d+\s*meteors)/gi)
                        ?.map((part, index) =>
                          /(\d+\s*meteors)/i?.test(part) ? (
                            <span className="space-grotesk-medium" key={index}>
                              {part}
                            </span>
                          ) : (
                            <p className="space-grotesk-regular font-14 my-0">
                              {part}
                            </p>
                          ),
                        )}
                    </div>
                    <div className="col-lg-3"></div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-3 text-center text-dark-blue second-scrn-padding">
                      <img
                        className={`width-50 width-md-50 width-lg-25 width-xl-70 planet-shadow-${prevIndex === 0 ? 'purple' : prevIndex === 1 ? 'yellow' : prevIndex === 2 ? 'green' : 'blue'}`}
                        src={images[prevIndex]}
                        alt="greenplnt"
                      />
                      <div className=" text-center text-dark-blue">
                        <h4 className="mb-2 space-grotesk-medium font-24">
                          {
                            ContextFaqsDataAPI?.galaxy_data?.milestones[1]
                              ?.milestone_name
                          }
                        </h4>
                        {ContextFaqsDataAPI?.galaxy_data?.milestones[1]?.milestone_description
                          ?.split(/(\d+\s*meteors)/gi)
                          ?.map((part, index) =>
                            /(\d+\s*meteors)/i?.test(part) ? (
                              <span
                                className="space-grotesk-medium"
                                key={index}
                              >
                                {part}
                              </span>
                            ) : (
                              <p className="space-grotesk-regular font-14 my-0">
                                {part}
                              </p>
                            ),
                          )}
                      </div>
                    </div>
                    <div className="col-lg-3"></div>
                    <div className="col-lg-3 text-center text-dark-blue">
                      <img
                        className={`width-50 width-md-50 width-lg-25 width-xl-70 planet-shadow-${selectedImage === 0 ? 'purple' : selectedImage === 1 ? 'yellow' : selectedImage === 2 ? 'green' : 'blue'}`}
                        src={selectedImage}
                        alt="blueplnt"
                      />
                      <div className=" text-center text-dark-blue">
                        <h4 className="mb-2 space-grotesk-medium font-24">
                          {
                            ContextFaqsDataAPI?.galaxy_data?.milestones[3]
                              ?.milestone_name
                          }
                        </h4>
                        {ContextFaqsDataAPI?.galaxy_data?.milestones[3]?.milestone_description
                          ?.split(/(\d+\s*Star)/gi)
                          ?.map((part, index) =>
                            /(\d+\s*Star)/i?.test(part) ? (
                              <span
                                className="space-grotesk-medium"
                                key={index}
                              >
                                {part}
                              </span>
                            ) : (
                              <p className="space-grotesk-regular font-14 my-0">
                                {part}
                              </p>
                            ),
                          )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`footer-responsive position-relative right-box ${isActive ? 'default-position' : 'move-right'} ${isExiting ? 'move-right' : ''} ${showModal ? 'visible' : 'invisible'}`}
                    ref={rightBoxRef}
                    id="rightBox"
                  >
                    <div
                      className="fade show d-block"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-xl modal-bottom">
                        <div className="modal-content border-0">
                          <div className="modal-header border-0">
                            <button
                              type="button"
                              className="btn-close bg-light p-2 notify-cross mb-2 rounded-circle cursor-pointer z-1"
                              onClick={handleClose}
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body position-relative background-push-notification rounded-3 d-flex justify-content-between align-items-center">
                            <div className="alien-ship">
                              <img
                                className="position-absolute progress-foot-alen"
                                src={alenship}
                                alt="alenship"
                              />
                            </div>
                            <span className="py-4 font-18 space-grotesk-medium text-white">
                              Push Up Notification
                            </span>
                            <button
                              type="button"
                              className="btn btn-light rounded-3 me-3 font-16 montserrat-semibold cursor-pointer z-1"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Footer Section */}
            {/* planet section */}

            <div className="text-center solar-sys mt-5">
              <div className="row align-items-center">
                <div
                  className={`d-flex justify-content-center ${isVisible ? 'plnt-animt-up' : 'plnt-animt-down'}`}
                >
                  <img
                    className={`bg-planet-ring position-absolute `}
                    src={planetRing}
                    alt="planet-ring"
                    style={{
                      transform: `rotate(${ringRotation}deg)`,
                      transition: 'transform 0.2s linear',
                    }}
                  />
                </div>

                <div className={` text-start`}>
                  <img
                    className={`navitag-left cursor-pointer planet-shadow-${prevIndex === 0 ? 'purple' : prevIndex === 1 ? 'yellow' : prevIndex === 2 ? 'green' : 'blue'} ${isVisible ? 'plnt-animt-up' : 'plnt-animt-down'}`}
                    onClick={() => rotate('left')}
                    src={images[prevIndex]}
                    alt="left-planet"
                  />
                  <span
                    className={`font-24 space-grotesk-medium text-dark-blue navi-plnt-left ${isVisible ? 'plnt-animt-up' : 'plnt-animt-down'}`}
                  >
                    Planet {['A', 'B', 'C', 'D'][prevIndex]}
                  </span>
                </div>

                <div className="col-6">
                  <div
                    className={`image-container d-flex justify-content-center align-items-center ${direction} ${isVisible ? 'big-plnt-btm' : 'big-plnt-top'}`}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: 'transform 0.2s linear',
                    }}
                  >
                    <img
                      src={images[currentIndex]}
                      alt="center-planet"
                      onClick={
                        currentIndex <= ContextHomeDataAPI?.part4?.length - 1
                          ? toggleAnimtElements
                          : null
                      }
                      className={`img-fluid ${currentIndex <= ContextHomeDataAPI?.part4?.length - 1 ? 'cursor-pointer' : ''} rounded-circle planet-shadow-${currentIndex === 0 ? 'purple' : currentIndex === 1 ? 'yellow' : currentIndex === 2 ? 'green' : 'blue'} ${
                        isAnimating ? 'fade-down-shrink' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className={` text-end`}>
                  <img
                    className={`navitag-right cursor-pointer planet-shadow-${nextIndex === 0 ? 'purple' : nextIndex === 1 ? 'yellow' : nextIndex === 2 ? 'green' : 'blue'} ${isVisible ? 'plnt-animt-up' : 'plnt-animt-down'}`}
                    onClick={() => rotate('right')}
                    src={images[nextIndex]}
                    alt="right-planet"
                  />
                  <span
                    className={`font-24 space-grotesk-medium text-dark-blue navi-plnt-right ${isVisible ? 'plnt-animt-up' : 'plnt-animt-down'}`}
                  >
                    Planet {['A', 'B', 'C', 'D'][nextIndex]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
