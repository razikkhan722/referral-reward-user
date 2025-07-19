import React, {  useContext, useEffect, useState } from 'react';

// imports images
import metero from '../../assets/icons/home/secondScreen/metero.svg';
import redeembox from '../../assets/icons/home/redeemEarn/redembox.svg';
import leftcloud from '../../assets/icons/home/redeemEarn/leftcloud.svg';
import rocket from '../../assets/icons/home/redeemEarn/moverokt.svg';
import coins from '../../assets/icons/home/redeemEarn/coinsclt.svg';
import SideModal from './sideModal';
import { UserContext } from '../../UseContext/useContext';

const RedeemAndEarn = ({ isActive }) => {
  const [showBox, setShowBox] = useState(false);
  const [showCircles, setShowCircles] = useState(false);

  const { ContextHomeDataAPI } = useContext(UserContext);
  console.log("dfghjkl",ContextHomeDataAPI)

  useEffect(() => {
    if (isActive) {
      // Start first animation
      setShowBox(true);

      // Start second animation after 2 seconds
      const timer = setTimeout(() => {
        setShowCircles(true);
      }, 700);

      return () => clearTimeout(timer);
    } else {
      // Reset animations when section becomes inactive
      setShowBox(false);
      setShowCircles(false);
    }
  }, [isActive]);

  return (
    <section id='RedeemAndEarn_Section' className="hero-section d-flex justify-content-center align-items-center px-5 position-relative">
      <div className="container">
        <div className="row justify-content-center position-relative">
          {/* Redeem Box */}
          <div
            className={`redeem-box col-lg-7 p-5 bg-opacity-25 bg-light rounded-4 fade-up ${showBox ? 'aos-animate' : ''}`}
          >
            <p className="text-center font-32 space-grotesk-medium px-5 py-4 mb-0 text-dark-blue lh-sm">
              Earn more with every action and redeem for real rewards on your
              journey through the stars
            </p>
          </div>

          {/* Redeem Circle */}
          <div
            className={`redeem-circle-sect position-absolute fade-left ${showCircles ? 'aos-animate' : ''}`}
          >
            <div className="redeem-circle gift-circle-sec redeem-shadow position-relative d-flex justify-content-center align-items-center">
              <img
                className="position-absolute redem-box"
                src={redeembox}
                alt="redeembox"
              />
              <img
                className="position-absolute left-cloud start-0 "
                src={leftcloud}
                alt="redeembox"
              />

              <div className="redeem-circle-cont text-center">
                <h2 className="text-white mb-0 font-size-24 ms-5 ps-3">
                  Redeem
                </h2>
                <div className="text-white d-flex justify-content-center align-items-center ms-5 ps-4">
                  <span className="text-light-yellow font-size-12 montserrat-semibold">
                    {ContextHomeDataAPI?.part6}
                  </span>
                  <img className="mx-1" src={metero} alt="metero" />
                  <span className="font-size-14 montserrat-medium">
                    Total Meteors
                  </span>
                </div>
              </div>
              <img
                className="position-absolute launch-rocket"
                src={rocket}
                alt="rocket"
              />
            </div>
          </div>

          {/* Earn More Circle */}
          <div
            className={`earnmore-circle-sect position-absolute fade-right ${showCircles ? 'aos-animate' : ''}`}
          >
            <div className="redeem-circle playearn-circle-sec earn-shadow position-relative d-flex justify-content-center align-items-center">
              <img
                className="position-absolute coins-box"
                src={coins}
                alt="coins"
              />
              <img
                className="position-absolute left-cloud start-0 "
                src={leftcloud}
                alt="redeembox"
              />

              <div className="earnmore-circle-cont text-center">
                <h2 className="text-white mb-0 font-size-24 ms-5 ps-3">
                  Earn More
                </h2>
                <div className="text-white d-flex justify-content-center align-items-center ms-5 ps-4">
                  <span className="text-light-yellow font-size-12 montserrat-semibold">
                    {ContextHomeDataAPI?.part2}
                  </span>
                  <img className="mx-1" src={metero} alt="metero" />
                  <span className="font-size-14 montserrat-medium">
                    Total Meteors
                  </span>
                </div>
              </div>
              <img
                className="position-absolute launch-rocket"
                src={rocket}
                alt="rocket"
              />
            </div>
          </div>
        </div>
      </div>
      <SideModal />
    </section>
  );
};

export default RedeemAndEarn;
