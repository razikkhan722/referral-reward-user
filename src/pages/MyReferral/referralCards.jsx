import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Images
import ReferralUfo from '../../assets/icons/home/MyReferral/UFO-LEFT.svg';
import HoverUfo from '../../assets/icons/home/MyReferral/referral-ufo.svg';
import LeftArrowIcon from '../../assets/icons/home/MyReferral/right-arrow.svg';


const ReferralCards = ({ RefralDataAPI }) => {
  const [isHovered, setIsHovered] = useState(null);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardsData = [
    {
      id: 1,
      count: `${RefralDataAPI?.part1}`,
      title: 'Total Referrals',
      subtitle: "People You've Referred",
      image: ReferralUfo,
      hoverImage: HoverUfo,
    },
    {
      id: 2,
      count: `${RefralDataAPI?.part2}`,
      title: 'Referrals Earnings',
      subtitle: "People You've Referred",
      image: ReferralUfo,
      hoverImage: HoverUfo,
    },
    {
      id: 3,
      count: `${RefralDataAPI?.part3}`,
      title: 'Pending Referrals',
      subtitle: 'No of Invites Waiting to Join',
      image: ReferralUfo,
      hoverImage: HoverUfo,
    },
  ];

   const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  const Card = ({ card }) => (
    <div
      className="referral-card me-3 mb-4 position-relative text-center ufo-light-img"
      onMouseEnter={() => setIsHovered(card.id)}
      onMouseLeave={() => setIsHovered(null)}
    >
      <img
        src={isHovered === card.id ? card.hoverImage : card.image}
        alt="UFO"
        className="card-ufo-img"
      />
      <p className="font-size-32 referral-txt montserrat-bold text-white pt-4">{card.count}</p>
      <p className="font-size-28 referral-txt montserrat-semibold text-white mb-0">{card.title}</p>
      <p className="font-size-14 montserrat-semibold referral-yellow-text">{card.subtitle}</p>
      {/* <button className="border-0 text-white rounded background-text-blue px-4 py-2 mt-3">
        View
      </button> */}
    </div>
  );

  return (
    <div className="mt-5">
      {isTablet ? (
        <Slider {...sliderSettings} className="referral-slider">
          {cardsData.map((card) => (
            <div key={card.id}>
              <Card card={card} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="row">
          {cardsData.map((card) => (
            <div className="col-lg-4" key={card.id}>
              <Card card={card} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferralCards;
