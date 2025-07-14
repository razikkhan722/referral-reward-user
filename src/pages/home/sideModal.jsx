import React from 'react';
import sideArrow from '../../assets/icons/home/redeemEarn/sidemodalarrow.svg';

const SideModal = () => {
  return (
    <section className="howitwork-side-modal bg-white rounded-start-3 position-absolute end-0 user-select-none">
      <div className="d-flex align-items-center p-2 flex-column">
        <img className="mb-2" src={sideArrow} alt="" />
        <span className="side-text text-dark-blue font-16 space-grotesk-regular">
          How It Works
        </span>
      </div>
    </section>
  );
};

export default SideModal;
