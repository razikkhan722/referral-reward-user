import React, { useState } from 'react'
 
// Images
import cardimg2 from '../assets/icons/home/MyRewards/Quiz.svg';
import cardimg4 from '../assets/icons/home/MyRewards/Tic.svg';
import cardimg3 from '../assets/icons/home/MyRewards/Spin.svg';
import arrowTop from '../assets/icons/home/MyRewards/arowtop2.svg';


// Play Earn Card Json
const playEarnCardJson = [
  // {
  //   backgroundUrl: cardimg1,
  //   cls: 'opt-1',
  //   wid: '10%',
  // },
  {
    backgroundUrl: cardimg2,
    cls: 'opt-2',
    wid: '15%',
  },
  {
    backgroundUrl: cardimg3,
    cls: 'opt-3',
    wid: '20%',
  },
  {
    backgroundUrl: cardimg4,
    cls: 'opt-4',
    wid: '25%',
  },
];
 
const PlayAndEarnCard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
 
  return (
    <>
  <div className="playearn-section d-flex justify-content-center">
          <div className="playearn-card">
            {/* {playEarnCardJson?.map((option, index) => (
              <div
                key={index}
                className={playearn-content d-grid position-relative ${option?.cls} ${activeIndex === index ? 'active' : ''}}
                onMouseDown={(e) => HandleDragCard(e, index)}
                style={{
                  '--optionBackground': url(${option.backgroundUrl}),
                  background: ${activeIndex === index
                    ? radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%),
                         var(--optionBackground)
                    : var(--optionBackground)
                    },
                  flexGrow: activeIndex === index ? 100 : 1,
                  width: activeIndex === index ? '0%' : ${option?.wid},
                }}
              >
                <img
                  className={position-absolute end-0 ${activeIndex === index ? 'background-light-white m-3 p-1 rounded-circle' : 'd-none'}}
                  src={arrowTop}
                  alt="toparrow"
                />
                <div
                  className={align-self-end p-3 ${activeIndex === index ? '' : 'd-none'}}
                >
                  <h2 className="mb-0 font-24 montserrat-semibold text-white">
                    Jackpot 777
                  </h2>
                  <p className="mb-0 font-14 montserrat-regular text-white">
                    One spin could change everything
                  </p>
                </div>
              </div>
            ))} */}
 
            {playEarnCardJson?.map((option, index) => {
              const isActive =
                hoveredIndex === index ||
                (hoveredIndex === null && index === playEarnCardJson.length - 1);
 
              return (
                <div
                  key={index}
                  className={`playearn-content d-grid position-relative ${option?.cls} ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    backgroundImage: `url(${option.backgroundUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    flexGrow: isActive ? 100 : 1,
                  }}
                >
                  <img
                    className={`position-absolute end-0 ${isActive ? 'background-light-white m-3 p-1 rounded-circle' : 'd-none'
                      }`}
                    src={arrowTop}
                    alt="toparrow"
                  />
                  <div className={`align-self-end p-3 ${isActive ? '' : 'd-none'}`}>
                    <h2 className="mb-0 font-24 montserrat-semibold text-white">Jackpot 777</h2>
                    <p className="mb-0 font-14 montserrat-regular text-white">
                      One spin could change everything
                    </p>
                  </div>
                </div>
              );
            })}
 
          </div>
        </div>
    </>
  );
};
 
export default PlayAndEarnCard;