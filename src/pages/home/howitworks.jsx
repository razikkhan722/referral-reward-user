// // below jsx is for scrollup and scroll down animation
// import React, { useEffect, useRef, useState } from "react";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// import Robortgif from '../../assets/icons/home/HowItWorks/gif-hiw.gif';
// import Planet1 from '../../assets/icons/home/HowItWorks/HIW-planet-1.svg';
// import Planet2 from '../../assets/icons/home/HowItWorks/HIW-planet-2.svg';
// import Planet3 from '../../assets/icons/home/HowItWorks/HIW-planet-3.svg';
// import Rocketgif from '../../assets/icons/home/HowItWorks/racketgif.gif';

// const Howitworks = ({ isActive, isExiting }) => {
//   const sectionRef = useRef(null);
//   const [step, setStep] = useState(0);
//   const [robotClicked, setRobotClicked] = useState(false);
//   const [showSteps, setShowSteps] = useState(false);
//   const [showExit, setShowExit] = useState(false);
//   const [scrollDir, setScrollDir] = useState('down'); // Local scroll direction

//   // AOS init
//   useEffect(() => {
//     AOS.init({ once: true });
//   }, []);

//   // Local wheel scroll direction tracking
//   const handleWheel = (e) => {
//     if (e.deltaY > 0) {
//       setScrollDir('down');
//     } else if (e.deltaY < 0) {
//       setScrollDir('up');
//     }
//   };

//   // Attach wheel listener only when section is active
//   useEffect(() => {
//     if (isActive) {
//       window.addEventListener('wheel', handleWheel);
//     } else {
//       window.removeEventListener('wheel', handleWheel);
//     }

//     return () => {
//       window.removeEventListener('wheel', handleWheel);
//     };
//   }, [isActive]);

//   // Animation step logic with interval
//   useEffect(() => {
//     if (showSteps) {
//       const interval = setInterval(() => {
//         setStep(prev => {
//           if (prev < 6) {
//             return prev + 1;
//           } else {
//             clearInterval(interval);
//             return prev;
//           }
//         });
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [showSteps]);

//   // Reset section when active again
//   useEffect(() => {
//     if (isActive) {
//       setShowExit(false);
//       setRobotClicked(false);
//       setShowSteps(false);
//       setStep(0);
//       setTimeout(() => AOS.refreshHard(), 100);
//     }
//   }, [isActive]);

//   // Trigger exit animation
//   useEffect(() => {
//     if (isExiting) {
//       setShowExit(true);
//     }
//   }, [isExiting]);

//   const handleRobotClick = () => {
//     if (robotClicked) return; // prevent double clicks
//     setRobotClicked(true);
//     setTimeout(() => {
//       setShowSteps(true);
//     }, 1000);
//   };

//   return (
//     <section
//       ref={sectionRef}
//       className={`section-howitworks text-center ${
//         showExit ? (scrollDir === 'down' ? 'zoom-down-out' : 'fade-out') : ''
//       } ${isActive ? 'aos-animate zoom-in-up-custom start-animation' : 'zoom-down'}`}
//     >
//       <div className="container position-relative h-100">
//         <h2 className="space-grotesk-bold font-40 text-black-heading mb-5">
//           How It Works
//         </h2>

//         {!showSteps && (
//           <div
//             className={`howitwork-first cursor-pointer d-flex h-100 justify-content-center align-items-center ${robotClicked ? 'robot-exit' : ''}`}
//             onClick={handleRobotClick}
//           >
//             <img className="robort-image cursor-pointer" src={Robortgif} alt="Robot" />
//           </div>
//         )}

//         {showSteps && (
//           <div className="howitwork-second" data-aos="zoom-in-up">
//             <img src={Rocketgif} alt="Rocket" className="rocket-gif mb-4" />
//             <div className="row text-center position-relative inner-row-index">
//               <div className={`col-4 howitworks-step ${step >= 1 ? 'visible' : ''}`}>
//                 <h6 className="montserrat-bold font-20 mb-22">Launch Your Cosmic Journey</h6>
//                 <p className="montserrat-regular font-18">
//                   Start your adventure by signing up and setting course for your first galaxy.
//                   Every star you navigate brings you closer to exciting rewards. Ready to explore?
//                 </p>
//               </div>

//               <div className={`col-4 howitworks-step ${step >= 3 ? 'visible' : ''}`}>
//                 <img src={Planet2} className="planet-width mb-3" alt="Planet 2" />
//               </div>

//               <div className={`col-4 howitworks-step ${step >= 5 ? 'visible' : ''}`}>
//                 <h6 className="montserrat-bold font-20 mb-22">Discover New Worlds & Unlock Rewards</h6>
//                 <p className="montserrat-regular font-18">
//                   Every galaxy you explore holds new treasures!
//                   Collect points along the way and redeem them for exclusive rewards.
//                 </p>
//               </div>

//               <div className="col-12 my-4">
//                 <div className={`timeline-dot ${step >= 1 ? 'visible' : ''}`} />
//                 <div className={`timeline-dot ${step >= 2 ? 'visible' : ''}`} />
//                 <div className={`timeline-dot ${step >= 3 ? 'visible' : ''}`} />
//                 <div className="timeline-border" />
//               </div>

//               <div className={`col-4 howitworks-step ${step >= 2 ? 'visible' : ''}`}>
//                 <img src={Planet1} className="planet-width mt-3" alt="Planet 1" />
//               </div>

//               <div className={`col-4 howitworks-step ${step >= 4 ? 'visible' : ''}`}>
//                 <h6 className="montserrat-bold font-20 mb-22">Invite a Friend & Travel Together</h6>
//                 <p className="montserrat-regular font-18">
//                   Space expeditions are better with a co-pilot! Invite friends and earn points together.
//                 </p>
//               </div>

//               <div className={`col-4 howitworks-step ${step >= 6 ? 'visible' : ''}`}>
//                 <img src={Planet3} className="planet-width mt-3" alt="Planet 3" />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Howitworks;

import React, { useContext, useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Robortgif from '../../assets/icons/home/HowItWorks/gif-hiw.gif';
import Planet1 from '../../assets/icons/home/HowItWorks/HIW-planet-1.svg';
import Planet2 from '../../assets/icons/home/HowItWorks/HIW-planet-2.svg';
import Planet3 from '../../assets/icons/home/HowItWorks/HIW-planet-3.svg';
import Rocketgif from '../../assets/icons/home/HowItWorks/racketgif.gif';
import { postData } from '../../services/api';
import { DecryptFunction } from '../../utils/decryptFunction';
import { UserContext } from '../../utils/UseContext/useContext';

const Howitworks = ({ isActive, isExiting }) => {
  const sectionRef = useRef(null);
  const [step, setStep] = useState(0);
  const [robotClicked, setRobotClicked] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [scrollDir, setScrollDir] = useState('down'); // Local scroll direction
  const Auth = JSON?.parse(sessionStorage.getItem('Auth') ?? '{}');
  const { ContextFaqsDataAPI } = useContext(UserContext);

  // =================================
  //       API FUNCTIONALITY
  // =================================

  const HandleAPI = async () => {
    try {
      const enyptData = await postData('/admin/fetch_custom_data', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
      });
      const Decrpty = await DecryptFunction(enyptData);
    } catch (error) {
    }
  };

  useEffect(() => {
    HandleAPI();
  }, []);

  // AOS init
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  // Local wheel scroll direction tracking
  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setScrollDir('down');
    } else if (e.deltaY < 0) {
      setScrollDir('up');
    }
  };

  // Attach wheel listener only when section is active
  useEffect(() => {
    if (isActive) {
      window.addEventListener('wheel', handleWheel);
    } else {
      window.removeEventListener('wheel', handleWheel);
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isActive]);

  // Animation step logic with interval
  useEffect(() => {
    if (showSteps) {
      const interval = setInterval(() => {
        setStep((prev) => {
          if (prev < 6) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 900);

      return () => clearInterval(interval);
    }
  }, [showSteps]);

  // Reset section when active again
  useEffect(() => {
    if (isActive) {
      setShowExit(false);
      setRobotClicked(false);
      setShowSteps(false);
      setStep(0);
      setTimeout(() => AOS.refreshHard(), 100);

      // ✅ Auto trigger robot exit after 0.5s
      setTimeout(() => {
        setRobotClicked(true);
      }, 500);

      // ✅ Trigger second step AFTER robot animation is done (1s animation + 0.5s delay)
      setTimeout(() => {
        setShowSteps(true);
      }, 1500);
    }
  }, [isActive]);

  // Trigger exit animation
  useEffect(() => {
    if (isExiting) {
      setShowExit(true);
    }
  }, [isExiting]);

  return (
    <section
      id="HowItWorks_Section"
      ref={sectionRef}
      className={`section-howitworks text-center ${showExit ? (scrollDir === 'down' ? 'zoom-down-out' : 'fade-out') : ''
        } ${isActive ? 'aos-animate zoom-in-up-custom start-animation' : 'zoom-down'}`}
    >
      <div className="container position-relative h-100">
        <h2 className="space-grotesk-bold section-heading font-40 text-black-secondry">
          How It Works
        </h2>

        {/* ✅ Removed click handler completely */}
        {!showSteps && (
          <div
            className={`howitwork-first cursor-pointer d-flex h-100 justify-content-center align-items-center ${robotClicked ? 'robot-exit' : ''}`}
          >
            <img
              className="robort-image cursor-pointer"
              src={Robortgif}
              alt="Robot"
            />
          </div>
        )}

        {showSteps && (
          <div
            className="howitwork-second h-100 d-flex align-items-center justify-content-center"
            data-aos="zoom-in-up"
          >
            <div className="row text-center position-relative inner-row-index">
              <div
                className={`col-4 howitworks-step ${step >= 1 ? 'visible' : ''}`}
              >
                <h6 className="montserrat-bold font-20 mb-22">
                  {ContextFaqsDataAPI?.how_it_works?.[0]?.title1}
                </h6>
                <p className="montserrat-regular font-18">
                  {ContextFaqsDataAPI?.how_it_works?.[0]?.desc1}
                </p>
              </div>

              <div
                className={`col-4 d-flex align-items-end justify-content-center howitworks-step ${step >= 3 ? 'visible' : ''}`}
              >
                <img
                  src={Planet2}
                  className="planet-width mb-3"
                  alt="Planet 2"
                />
              </div>

              <div
                className={`col-4 howitworks-step ${step >= 5 ? 'visible' : ''}`}
              >
                <h6 className="montserrat-bold font-20 mb-22">
                  {ContextFaqsDataAPI?.how_it_works?.[0]?.title3}
                </h6>
                <p className="montserrat-regular font-18">
                  {ContextFaqsDataAPI?.how_it_works?.[0]?.desc3}
                </p>
              </div>

              <div className="col-12 my-4 position-relative">
                <div className={`timeline-dot ${step >= 1 ? 'visible' : ''}`} />
                <div className={`timeline-dot ${step >= 3 ? 'visible' : ''}`} />
                <div className={`timeline-dot ${step >= 4 ? 'visible' : ''}`} />
                <div className="timeline-border" />
                <img src={Rocketgif} alt="Rocket" className="rocket-gif" />

              </div>

              <div
                className={`col-4 howitworks-step ${step >= 2 ? 'visible' : ''}`}
              >
                <img
                  src={Planet1}
                  className="planet-width mt-3"
                  alt="Planet 1"
                />
              </div>

              <div
                className={`col-4 howitworks-step ${step >= 4 ? 'visible' : ''}`}
              >
                <h6 className="montserrat-bold font-20 mb-22">
                  {ContextFaqsDataAPI?.how_it_works?.[0]?.title2}
                </h6>
                <p className="montserrat-regular font-18">
                  {ContextFaqsDataAPI?.how_it_works?.[0]?.desc2}
                </p>
              </div>

              <div
                className={`col-4 howitworks-step ${step >= 6 ? 'visible' : ''}`}
              >
                <img
                  src={Planet3}
                  className="planet-width mt-3"
                  alt="Planet 3"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Howitworks;
