import React, { useState } from 'react';
import centerPlanet1 from '../../assets/home/planets/purple.svg';
import centerPlanet2 from '../../assets/home/planets/yellow.svg';
import centerPlanet3 from '../../assets/home/planets/green.svg';
import centerPlanet4 from '../../assets/home/planets/blue.svg';
import planetRing from '../../assets/home/planets/rings.svg';

const images = [centerPlanet1, centerPlanet2, centerPlanet3, centerPlanet4];

const PlanetSlider = ({ onPlanetClick, setIsVisible, isVisible }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [ringRotation, setRingRotation] = useState(0);
  const [direction, setDirection] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

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
  };

  return (
    <div id='PlanetSLider_Section' className="text-center solar-sys mt-5 pt-5">
      <div className="row align-items-center mt-5">
        <div className={`d-flex justify-content-center ${isVisible ? 'plnt-animt-up' : 'plnt-animt-down'}`}>
          <img
            className="bg-planet-ring position-absolute"
            src={planetRing}
            alt="planet-ring"
            style={{
              transform: `rotate(${ringRotation}deg)`,
              transition: 'transform 0.2s linear',
            }}
          />
        </div>

        <div className={` text-start ${isVisible ? 'plnt-animt-up' : 'plnt-animt-down'}`}>
          <img
            className={`navitag-left cursor-pointer planet-shadow-${prevIndex === 0 ? 'purple' : prevIndex === 1 ? 'yellow' : prevIndex === 2 ? 'green' : 'blue'}`}
            onClick={() => rotate('left')}
            src={images[prevIndex]}
            alt="left-planet"
          />
          <span className="navi-plnt-left">
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
              onClick={toggleAnimtElements}
              className={`img-fluid rounded-circle cursor-pointer planet-shadow-${currentIndex === 0 ? 'purple' : currentIndex === 1 ? 'yellow' : currentIndex === 2 ? 'green' : 'blue'} ${
                isAnimating ? 'fade-down-shrink' : ''
              }`}
            />
          </div>
        </div>

        <div className={` text-end ${isVisible ? 'plnt-animt-up' : 'plnt-animt-down'}`}>
          <img
            className={`navitag-right cursor-pointer planet-shadow-${nextIndex === 0 ? 'purple' : nextIndex === 1 ? 'yellow' : nextIndex === 2 ? 'green' : 'blue'}`}
            onClick={() => rotate('right')}
            src={images[nextIndex]}
            alt="right-planet"
          />
          <span className="navi-plnt-right">
            Planet {['A', 'B', 'C', 'D'][nextIndex]}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlanetSlider;
