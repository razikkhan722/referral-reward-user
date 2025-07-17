import React, { useContext } from 'react';

// Assets icons
import Logo from '../../../assets/icons/logo/logo.svg';
import OrangePlanet from '../../../assets/icons/subscription/Orange-Planet.svg';
import GreenPlanet from '../../../assets/icons/subscription/Green Planet 3.svg';
import Plane from '../../../assets/icons/subscription/Plane.svg';
import stargroup from '../../../assets/icons/auth/stargroup.svg';

// React Icon
import { IoIosArrowForward } from 'react-icons/io';

// Carousel
import Slider from 'react-slick';

// Navigation
import { useNavigate } from 'react-router-dom';

// API services
import { postData } from '../../../services/api';

// Toast messages
import { toastError, toastSuccess } from '../../../utils/toster';

// Context
import { UserContext } from '../../../utils/UseContext/useContext';

const Product = () => {
  const navigate = useNavigate();
  const uid = sessionStorage.getItem('uid');

  const { ContextInviteRefferAPI } = useContext(UserContext); // Meteor points

  // Carousel settings for responsiveness
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    centerMode: true,
    centerPadding: '0px',
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4.4 } },
      { breakpoint: 1200, settings: { slidesToShow: 3.5 } },
      { breakpoint: 992, settings: { slidesToShow: 2.5 } },
      { breakpoint: 768, settings: { slidesToShow: 1.8 } },
      { breakpoint: 576, settings: { slidesToShow: 1.2 } },
    ],
  };

  // Card data for slider
  const CardData = [
    {
      discount: '20%',
      bgClass: 'card-bg-purple-color',
      img: OrangePlanet,
      title: 'Social Media',
      cardImg: 'orange-planet',
      price: '₹ 20,000/-',
      description: `Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem veritatis et quasi architecto beatae vitae dicta sunt, explicabo`,
      btnText: 'Purchase',
      btnClass: 'product-btn-purple',
    },
    {
      discount: '10%',
      bgClass: 'card-bg-pink-color',
      img: Plane,
      title: 'Sales Ninja',
      cardImg: 'pink-planet',
      price: '₹ 10,000/-',
      description: `Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa`,
      btnText: 'Unlock with 300 points',
      btnClass: 'product-btn-pink',
    },
    {
      discount: '10%',
      bgClass: 'card-bg-green-color',
      img: GreenPlanet,
      cardImg: 'green-planet',
      title: 'Upcoming Offer',
      description: `Next: Get 50% Off on DM Services at 500 Points`,
      btnText: 'Unlock with 500 points',
      btnClass: 'product-btn-green',
    },
    // Duplicates (can be removed or reused)
    {
      discount: '10%',
      bgClass: 'card-bg-purple-color',
      img: OrangePlanet,
      cardImg: 'orange-planet',
      title: 'Social Media',
      price: '₹ 20,000/-',
      description: `Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem veritatis et quasi architecto beatae vitae dicta sunt, explicabo`,
      btnText: 'Purchase',
      btnClass: 'product-btn-purple',
    },
    {
      discount: '10%',
      bgClass: 'card-bg-pink-color',
      img: Plane,
      cardImg: 'pink-planet',
      title: 'Sales Ninja',
      price: '₹ 10,000/-',
      description: `Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa`,
      btnText: 'Unlock with 300 points',
      btnClass: 'product-btn-pink',
    },
    {
      discount: '10%',
      bgClass: 'card-bg-green-color',
      img: GreenPlanet,
      cardImg: 'green-planet',
      title: 'Upcoming Offer',
      description: `Next: Get 50% Off on DM Services at 500 Points`,
      btnText: 'Unlock with 500 points',
      btnClass: 'product-btn-green',
    },
  ];

  // Purchase button handler
  const HandleClick = async () => {
    try {
      const response = await postData('/purchase', {
        user_id: uid,
      });

      if (response?.success) {
        toastSuccess(response?.message);
        sessionStorage.removeItem('uid');
        navigate("/login");
      }
    } catch (error) {
      toastError(error?.message);
    }
  };

  return (
    <div className="product-img-bg d-flex flex-column min-vh-100 overflow-hidden">
      {/* Top Logo */}
      <div className="flex-grow-1">
        <div className="nav-logo text-center mt-0">
          <img className="header-center-img width-13" src={Logo} alt="logo" />
        </div>

        {/* Congratulations Text */}
        <div className="row d-flex justify-content-center">
          <div className="col-lg-7">
            <div className="text-center mt-3">
              <p className="font-44 text-blue montserrat-bold mb-2">Congratulations</p>
              <p className="text-blue montserrat-semibold font-size-20 pb-2">
                You have earned {ContextInviteRefferAPI} Meteor Points!
                <br />
                Use your points to unlock up to 20% off on your first purchase.
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Slider */}
        <div className="slider-container product-slider my-5 z-3">
          <Slider {...settings}>
            {CardData.map((card, index) => (
              <div
                key={index}
                className={`${card.bgClass} product-card d-flex flex-column justify-content-center align-items-center`}
              >
                {/* Discount Badge */}
                <div className="discount-badge d-flex justify-content-center align-items-center text-center">
                  {card.discount} <br />
                  Discount
                </div>

                {/* Card Image */}
                <div className="overflow-hidden">
                  <img
                    src={card.img}
                    className={`rounded-start-3 ${card.cardImg}`}
                    alt="Product Visual"
                  />
                </div>

                {/* Card Body */}
                <div className="text-center px-4 pb-4 z-3 pt-5">
                  <p className="text-blue font-size-24 montserrat-semibold mb-0">
                    {card.title}
                  </p>
                  {card.price && (
                    <p className="text-blue font-size-20 montserrat-medium">
                      {card.price}
                    </p>
                  )}
                  <p className="text-blue font-size-14 montserrat-medium">
                    {card.description}
                    <span className="text-red"> learn more....</span>
                  </p>

                  {/* CTA Button */}
                  <button
                    className={`product-btn w-100 text-white ${card?.btnClass} px-3 py-2 border-0 mt-3`}
                    onClick={card.btnText === 'Purchase' ? HandleClick : null}
                  >
                    {card.btnText}
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Footer */}
      <footer className="product-footer z-2">
        <div className="container">
          <div className="row align-items-center justify-content-between pt-4">
            <div className="col-lg-9 position-relative">
              <div className="footer-star-text ps-5">
                <img src={stargroup} className="footer-star-icon" alt="Stars" />
                <p className="text-blue ms-4 montserrat-semibold fotnt-size-18 text-uppercase">
                  Shop with us and join our Rewards & Referral Program to earn even more!
                </p>
              </div>
            </div>
            <div className="col-lg-3 text-end mb-2">
              <button className="montserrat-semibold px-4 border-0 font-16 py-2 rounded-3 background-text-blue text-white d-flex align-items-center justify-content-center">
                Explore More Products <IoIosArrowForward className='ms-2' />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Product;
