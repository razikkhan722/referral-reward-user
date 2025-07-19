import { useState, useEffect, useRef, useCallback, useContext } from 'react';
// import '../../styles/main.scss';
import '../../App.scss';
import '../../../src/styles/main.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Components
import Index from './index';
import Invitefriend from './invitefriend';
import Howitworks from './howitworks';
import RedeemAndEarn from './redeemAndEarn';
import PlayEarn from './playEarn';
import Offer from './offer';
import FloatingActionButton from '../MyReferral/floatingFab';

import offpop from '../../assets/icons/home/offer/offpop.svg';
import offimg from '../../assets/icons/home/offer/offspec.svg';
import cross from '../../assets/icons/home/offer/cross.svg';
import { Modal } from 'react-bootstrap';
import { UserContext } from '../../UseContext/useContext';

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const offerRef = useRef(null);
  const { ContextFaqsDataAPI, ContextSpclOffer, setContextSpclOffer } =
    useContext(UserContext);
  console.log(
    'ContextFaqsDataAPI: ',
    ContextFaqsDataAPI?.special_offer?.offer_code,
  );
  // Scroll lock flag for extra scroll at edge
  const edgeScrollUpTriggered = useRef(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      AOS.refreshHard();
    }, 500);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === 2) {
      setExitAnimation(false);
    } else if (activeIndex > 2) {
      setExitAnimation(true);
    }
  }, [activeIndex]);

  const handleWheel = useCallback(
    (e) => {
      const isOfferSection = activeIndex === 5;

      if (isOfferSection && offerRef.current) {
        const el = offerRef.current;
        const { scrollTop, scrollHeight, clientHeight } = el;

        // ✔️ Allow FULL native scroll inside offer section always
        if (
          (e.deltaY > 0 && scrollTop + clientHeight < scrollHeight) || // scrolling down, content is still remaining
          (e.deltaY < 0 && scrollTop > 0) // scrolling up but NOT at the top yet
        ) {
          // ✔️ Allow natural browser scroll
          edgeScrollUpTriggered.current = false; // reset the flag while scrolling inside
          return;
        }

        // ✔️ At the top of offer section: Require an extra scroll up to switch section
        if (e.deltaY < 0 && scrollTop <= 0) {
          if (edgeScrollUpTriggered.current) {
            e.preventDefault();
            changeSection(activeIndex - 1);
            edgeScrollUpTriggered.current = false;
          } else {
            e.preventDefault();
            edgeScrollUpTriggered.current = true; // First attempt to scroll up at the top
          }
          return;
        }

        return; // inside Offer section → always allow scroll down freely
      }

      // For all other sections
      e.preventDefault();
      if (transitioning) return;

      if (e.deltaY > 0 && activeIndex < 5) {
        changeSection(activeIndex + 1);
      } else if (e.deltaY < 0 && activeIndex > 0) {
        changeSection(activeIndex - 1);
      }
    },
    [activeIndex, transitioning],
  );

  const changeSection = (newIndex) => {
    if (transitioning) return;

    setTransitioning(true);
    setExitAnimation(true);

    setTimeout(() => {
      setActiveIndex(newIndex);
      setExitAnimation(false);

      edgeScrollUpTriggered.current = false;

      setTimeout(() => {
        setTransitioning(false);
      }, 1200);
    }, 800);
  };

  useEffect(() => {
    const wheelHandler = (e) => handleWheel(e);
    window.addEventListener('wheel', wheelHandler, { passive: false });

    return () => {
      window.removeEventListener('wheel', wheelHandler);
    };
  }, [handleWheel]);

  const HandleSet = () => {
    setActiveIndex(0);
    console.log(activeIndex);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (ContextSpclOffer) {
      setShow(true)
      setContextSpclOffer(false);
    }
  }, []);

  return (
    <>
      <div className="fixed-section-container">
        {[Index, Invitefriend, Howitworks, RedeemAndEarn, PlayEarn, Offer].map(
          (Component, index) => {
            const isActive = index === activeIndex;
            const isOfferSection = index === 5;

            return (
              <div
                key={index}
                className={`section ${isActive ? 'active' : ''} ${isOfferSection ? ' offer' : ''}`}
                ref={isOfferSection ? offerRef : null}
                style={{
                  overflowY: isOfferSection && isActive ? 'auto' : 'hidden',
                }}
              >
                {index === 0 ? (
                  <Index isActive={isActive} isExiting={exitAnimation} />
                ) : index === 1 ? (
                  <Invitefriend isActive={isActive} isExiting={exitAnimation} />
                ) : index === 2 ? (
                  <Howitworks isActive={isActive} isExiting={exitAnimation} />
                ) : index === 3 ? (
                  <RedeemAndEarn isActive={isActive} />
                ) : index === 4 ? (
                  <PlayEarn isActive={isActive} />
                ) : index === 5 ? (
                  <Offer isActive={isActive} />
                ) : (
                  <div data-aos="fade-up">
                    <Component />
                  </div>
                )}
              </div>
            );
          },
        )}
      </div>
      {/* Side Popup Nav */}
      {activeIndex > 0 ? <FloatingActionButton toTop={setActiveIndex} /> : null}

      {/* Side Special Offer Modal  */}
      {activeIndex == 0 && ContextFaqsDataAPI?.special_offer?.offer_code ? (
        <img
          className="offer-popup cursor-pointer"
          onClick={()=>setActiveIndex(5)}
          src={offpop}
          alt=""
        />
      ) : null}
      {/* Offer Modal */}
      <Modal
        className={` box-off ${!show ? 'box-open-off' : 'box-closing-off'}`}
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header className="border-0 justify-content-between">
          <span></span>
          <button
            onClick={handleClose}
            className="p-2 rounded-circle border-0 d-flex align-items-center"
          >
            <img src={cross} alt="" />
          </button>
        </Modal.Header>
        <Modal.Body className="">
          <div className="text-center mb-3">
            <img className="special-off-img" src={offimg} alt="" />
          </div>
          <p className="font-16 montserrat-medium text-blue text-center my-2">
           {ContextFaqsDataAPI?.special_offer?.pop_up_text}
          </p>
          <button
            onClick={() => {
              (setActiveIndex(5), handleClose());
            }}
            className="w-100 font-14 mb-2 mt-2 montserrat-medium background-text-blue text-white rounded-4 border-0 py-2"
          >
            See Offers
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Home;
