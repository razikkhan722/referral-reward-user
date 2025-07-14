import React, { useState } from 'react';
import bottle from '../../assets/images/home/playEarn/bottle.svg';
import astro from '../../assets/images/home/playEarn/astronaut.svg';
import ticTac from '../../assets/images/home/playEarn/tic-tac.svg';
import SideModal from './sideModal';
import { toast } from 'react-toastify';
import { toastInfo } from '../../utils/toster';

const PlayEarn = ({ isActive }) => {
  const [hoveredCard, setHoveredCard] = useState();

  const handleMouseEnter = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };
  const cardData = [
  {
    id: 1,
    title: 'Spin The Wheel',
    description: 'Spin and win bonus points, perks, and exclusive rewards.',
    buttonText: 'Play Now',
    image: bottle,
  },
  {
    id: 2,
    title: 'Tic Tac Game',
    description: 'Play and win bonus points, perks, and exclusive rewards. Take your turn!',
    buttonText: 'Play Now',
    image: ticTac,
  },
  {
    id: 3,
    title: 'Interstellar quiz',
    description: 'Test your knowledge and win bonus points, perks, and exclusive rewards.',
    buttonText: 'Play Now',
    image: astro,
  },
];


  return (
    <section id='PlayEarn_Section'
      className={`pay-earn-section position-relative ${isActive ? 'animate-section' : ''}`}
    >
      <div className={`pay-earn-content ${isActive ? 'animate-content' : ''}`}>
        <div className="container h-100 pb-5">
          <div className="h-100 d-flex align-items-end position-relative">
            <img
              className={`position-absolute play-earn-img ${hoveredCard ? 'play-img-eft-act' : 'play-img-eft'} mt-5`}
              // src={hoveredCard == 1 ? ticTac ? hoveredCard == 2 ?astro : bottle}
              src={
                hoveredCard === 1 ? bottle : hoveredCard === 2 ? ticTac : astro
              }
              alt="spinwheel"
            />
            <div
              className={`row justify-content-between playearn-card p-4 rounded-4 h-auto ${isActive ? 'animate-card' : ''}`}
            >
              {/* First Play & Win section */}
              <div className="col-lg-2 text-center d-flex justify-content-center flex-column ms-3 my-3">
                <h4 className="mb-2 font-32 space-grotesk-bold text-uppercase text-dark-blue">
                  Play & Win
                </h4>
                <p className="font-size-18 montserrat-semibold text-dark-blue">
                  Enter the Game Zone and get chance to earn more points!!
                </p>
              </div>

              {cardData.map((cardId) => (
                <div
                  key={cardId.id}
                  className="col-lg-3 hover-card pb-1 bg-light text-center d-flex justify-content-between flex-column rounded-4 my-3"
                  onMouseEnter={() => handleMouseEnter(cardId.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <h3 className="mt-4 pt-1 mb-2 text-uppercase font-size-24 space-grotesk-bold text-dark-blue">
                    {cardId.title}
                  </h3>
                  <p className="font-size-16 montserrat-medium text-blue">
                    {cardId.description}
                  </p>
                  <div className='mt-1'>
                  <button className="btn background-text-blue text-white font-size-16 montserrat-medium rounded-5 mb-4 px-4"
                  //  onClick={() => alert('Coming Soon')}
                  onClick={()=>toastInfo("Comming Soon")}
                  >
                    {cardId.buttonText}
                  </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SideModal />
    </section>
  );
};

export default PlayEarn;
