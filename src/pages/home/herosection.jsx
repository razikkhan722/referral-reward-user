import React, { useContext } from 'react';
import { UserContext } from '../../UseContext/useContext';

const Herosection = ({ currentPlnt, HomeDataAPI }) => {
  const { ContextFaqsDataAPI,ContextHomeDataAPI,MeterUpdateData } = useContext(UserContext);

  let LtrToNum = currentPlnt?.charCodeAt(0) - 64;


  // States
  // =========

  return (
    <section id="Hero_Section" className="banner-section">
      <div className="container">
        <div className="text-center">
          <h3 className="text-uppercase text-blue space-grotesk-bold font-46 mb-0">
            {HomeDataAPI?.part3?.at(-1) || 'Milky Way Galaxy'}
          </h3>
        </div>
        <ul
          className="d-flex  justify-content-between mb-0 mt-4 pt-2 px-0"
          id="banner-sec-heading-desk"
        >
          <li className="list-unstyled text-dark-blue  montserrat-semibold font-24">
            <span className="d-block font-16 space-grotesk-regular text-white mb-1">
              Meteors Gained
            </span>
            {MeterUpdateData?.meteors || 0} Meteors
          </li>
          <li className="list-unstyled text-dark-blue  montserrat-semibold font-24">
            <span className="d-block font-16 space-grotesk-regular text-white mb-1">
              Stars Gained
            </span>
            {HomeDataAPI?.part1 || 0} Stars
          </li>
          <li className="list-unstyled space-grotesk-medium font-46 text-white">
            Planet {currentPlnt}
          </li>
          <li className="list-unstyled text-dark-blue  montserrat-semibold font-24">
            <span className="d-block font-16 space-grotesk-regular text-white mb-1">
              Meteors to Unlock
            </span>
            {
              ContextFaqsDataAPI?.galaxy_data?.milestones[LtrToNum - 1]
                ?.meteors_required_to_unlock
            }{' '}
            Meteors
          </li>
          <li className="list-unstyled text-dark-blue  montserrat-semibold font-24">
            <span className="d-block font-16 space-grotesk-regular text-white mb-1">
              Planet Status
            </span>
            {LtrToNum - 1 <= ContextHomeDataAPI?.part4?.length - 1 ? "Unlocked":"Locked"}
            
          </li>
        </ul>
        <div
          className="row  justify-content-center mt-5 pt-5"
          id="banner-sec-heading-mob"
        >
          <div className="col-3 col-lg-3 ">
            <div className="list-unstyled text-dark-blue montserrat-semibold font-24">
              <span className="d-block font-16 space-grotesk-regular text-white mb-1">
                Meteors Gained
              </span>
              {MeterUpdateData?.meteors || 0} Meteors
            </div>
            <div className="list-unstyled text-dark-blue montserrat-semibold font-24">
              <span className="d-block font-16 space-grotesk-regular text-white mb-1">
                Stars Gained
              </span>
              {HomeDataAPI?.part1 || 0} Stars
            </div>
          </div>
          <div className="col-4 col-lg-4 text-center">
            <div className="list-unstyled space-grotesk-medium font-46 text-white">
              Planet {currentPlnt}
            </div>
          </div>
          <div className="col-3 col-lg-3 ">
            <div className="list-unstyled text-dark-blue montserrat-semibold font-24">
              <span className="d-block font-16 space-grotesk-regular text-white mb-1">
                Total Meteors
              </span>
              {
                ContextFaqsDataAPI?.galaxy_data?.milestones[LtrToNum - 1]
                  ?.meteors_required_to_unlock
              }{' '}
              Meteors
            </div>
            <div className="list-unstyled text-dark-blue montserrat-semibold font-24">
              <span className="d-block font-16 space-grotesk-regular text-white mb-1">
                Planet Status
              </span>
              Unlocked
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
