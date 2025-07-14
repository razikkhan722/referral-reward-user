import React, { useEffect, useRef, useState } from 'react';
import '../../styles/main.scss';
import '../../App.scss'
import AOS from 'aos';
import 'aos/dist/aos.css';
import stars from '../../assets/icons/home/redeemEarn/starts.svg';
import footer from '../../assets/images/home/Invitefriend/Bottom-invite.svg';
import FacebookIcon from '../../assets/icons/home/Invitefriend/fb-invite.svg';
import TwitterIcon from '../../assets/icons/home/Invitefriend/twitter-invite.svg';
import InstaIcon from '../../assets/icons/home/Invitefriend/insta-invite.svg';
import YoutubeIcon from '../../assets/icons/home/Invitefriend/youtube-invite.svg';
import Robortgif from '../../assets/icons/home/HowItWorks/gif-hiw.gif';
import Planet1 from '../../assets/icons/home/HowItWorks/HIW-planet-1.svg';
import Planet2 from '../../assets/icons/home/HowItWorks/HIW-planet-2.svg';
import Planet3 from '../../assets/icons/home/HowItWorks/HIW-planet-3.svg';
import Rocketgif from '../../assets/icons/home/HowItWorks/racketgif.gif';
import metero from '../../assets/icons/home/secondScreen/metero.svg';
import redeembox from '../../assets/icons/home/redeemEarn/redembox.svg';
import leftcloud from '../../assets/icons/home/redeemEarn/leftcloud.svg';
import rocket from '../../assets/icons/home/redeemEarn/moverokt.svg';
import coins from '../../assets/icons/home/redeemEarn/coinsclt.svg';
import SideModal from './sideModal';
import spinwheel from '../../assets/images/home/playEarn/spinwheel.svg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import offerastro from '../../assets/icons/home/offer/offerastro.svg';
import offersolor from '../../assets/icons/home/offer/offersolor.svg';
import offerRocket from '../../assets/icons/home/offer/offerRocket.svg';
import rightarrow from '../../assets/icons/home/offer/rightarrow.svg';
import offerexcimg from '../../assets/icons/home/offer/excoffimg.svg';
import zomato from '../../assets/icons/home/offer/zmt.svg';
import excrocket from '../../assets/icons/home/offer/excrocket.svg';
import suitcase from '../../assets/icons/home/offer/suitcase.svg';
import smartwatch from '../../assets/icons/home/offer/smartwatch.svg';
import headphone from '../../assets/icons/home/offer/headphones.svg';
import plus from '../../assets/icons/home/offer/plus.svg';
import minus from '../../assets/icons/home/offer/minus.svg';

const Test = (isActive) => {
  const inputRef = useRef(null);
  const animationTriggered = useRef(false);

  const [animateTop, setAnimateTop] = useState(false);
  const [animateFooter, setAnimateFooter] = useState(false);
  const [animateMiddle, setAnimateMiddle] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [step, setStep] = useState(0);
  const [robotClicked, setRobotClicked] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const sectionRef = useRef(null);

  const cards = [
    { id: 1, img: offerRocket, title: 'Explore, Earn, Elevate', content: 'Every referral fuels your journey, climb the ranks and claim your rewards!' },
    { id: 2, img: offerastro, title: 'Reach for Rewards, Refer for More!', content: 'Invite your friends, collect cosmic points, and unlock stellar perks!' },
    { id: 3, img: offersolor, title: 'Explore, Earn, Elevate', content: 'Every referral fuels your journey, climb the ranks and claim your rewards!' },
    { id: 4, img: offerastro, title: 'Reach for Rewards, Refer for More!', content: 'Invite your friends, collect cosmic points, and unlock stellar perks!' },
  ];

  const items = [
    { title: '1. Collapsible Group Item', content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.' },
    { title: '2. Collapsible Group Item', content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.' },
    { title: '3. Collapsible Group Item', content: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.' },
  ];

  const settings = { dots: false, infinite: true, speed: 500, slidesToShow: 2, slidesToScroll: 1, centerMode: true, centerPadding: '20px' };

  useEffect(() => { AOS.init({ once: true }); }, []);

  useEffect(() => {
    if (showSteps) {
      const interval = setInterval(() => {
        setStep(prev => {
          if (prev < 6) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showSteps]);

  const handleMouseEnter = (cardId) => setHoveredCard(cardId);
  const handleMouseLeave = () => setHoveredCard(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);
  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    }
  };

  const handleClick = () => {
    const url = `https://wa.me/?text=${encodeURIComponent('Join me on this amazing app: https://example.com/my-link')}`;
    window.open(url, '_blank');
  };

  const handleRobotClick = () => {
    setRobotClicked(true);
    setTimeout(() => setShowSteps(true), 1000);
  };

  return (
  <>
    {/* Invite Friend Section */}
    <div className="invitefriend-wrapper invite-bg-image section-invitefriend position-relative overflow-hidden vh-100 d-flex align-items-center justify-content-center">
      {/* Top Stars */}
      <img
        className={`w-100 position-absolute top-0 left-0 asto-transition-all ${animateTop ? 'nav-slide-top' : ''}`}
        src={stars}
        alt="Stars"
      />

      {/* Bottom Footer */}
      <img
        className={`w-100 position-absolute bottom-0 left-0 asto-transition-all ${animateFooter ? 'astro-slide-down' : ''}`}
        src={footer}
        alt="Footer"
      />

      {/* Center Section */}
      <div className={`container center-section transition-all duration-1000 ${animateMiddle ? 'form-fade-down' : ''}`}>
        <div className="row text-center justify-content-center align-items-start h-100">
          <div className="col-12 col-md-5 content-z-index pt-72">
            <h2 className="text-white font-40 mb-58 space-grotesk-b">Invite a friend</h2>

            <div className="copy-input-container">
              <input
                ref={inputRef}
                type="text"
                defaultValue="https://example.com/my-link"
                className="copy-input input-invite-friend bg-white mb-60"
              />
              <button className="copy-button" onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="divider-with-text">
              <span className="divider-border">Or</span>
            </div>

            <button
              onClick={handleClick}
              className="btn-share-via-whatsapp poppins-regular text-white bg-primary-color font-18 mb-46"
            >
              Share Via Whatsapp
            </button>

            <ul className="social-nav pl-0 d-flex justify-content-center">
              <li className="social-list"><a className="social-link" href="#"><img className="social-icon" src={FacebookIcon} alt="Facebook" /></a></li>
              <li className="social-list"><a className="social-link" href="#"><img className="social-icon" src={InstaIcon} alt="Instagram" /></a></li>
              <li className="social-list"><a className="social-link" href="#"><img className="social-icon" src={YoutubeIcon} alt="YouTube" /></a></li>
              <li className="social-list"><a className="social-link" href="#"><img className="social-icon" src={TwitterIcon} alt="Twitter" /></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    {/* How It Works Section */}
    <section ref={sectionRef} className={`section-howitworks text-center ${showExit ? 'zoom-down-out' : ''} ${isActive ? 'aos-animate zoom-in-up-custom' : ''}`}>
      <div className="container position-relative h-100">
        <h2 className="space-grotesk-bold font-40 text-black-heading mb-5">How It Works</h2>

        {!showSteps && (
          <div className={`howitwork-first cursor-pointer d-flex h-100 justify-content-center align-items-center ${robotClicked ? 'robot-exit' : ''}`} onClick={handleRobotClick}>
            <img className="robort-image cursor-pointer" src={Robortgif} alt="Robot" />
          </div>
        )}

        {showSteps && (
          <div className="howitwork-second" data-aos="zoom-in-up">
            <img src={Rocketgif} alt="Rocket" className="rocket-gif mb-4" />
            <div className="row text-center position-relative inner-row-index">
              <div className={`col-4 howitworks-step ${step >= 1 ? 'visible' : ''}`}>
                <h6 className="montserrat-bold font-20 mb-22">Launch Your Cosmic Journey</h6>
                <p className="montserrat-regular font-18">
                  Start your adventure by signing up and setting course for your first galaxy.
                  Every star you navigate brings you closer to exciting rewards. Ready to explore?
                </p>
              </div>
              <div className={`col-4 howitworks-step ${step >= 3 ? 'visible' : ''}`}>
                <img src={Planet2} className="planet-width mb-3" alt="Planet 2" />
              </div>
              <div className={`col-4 howitworks-step ${step >= 5 ? 'visible' : ''}`}>
                <h6 className="montserrat-bold font-20 mb-22">Discover New Worlds & Unlock Rewards</h6>
                <p className="montserrat-regular font-18">
                  Every galaxy you explore holds new treasures! Collect points along the way and redeem them for exclusive rewards.
                </p>
              </div>
              <div className="col-12 my-4">
                <div className={`timeline-dot ${step >= 1 ? 'visible' : ''}`} />
                <div className={`timeline-dot ${step >= 2 ? 'visible' : ''}`} />
                <div className={`timeline-dot ${step >= 3 ? 'visible' : ''}`} />
                <div className="timeline-border" />
              </div>
              <div className={`col-4 howitworks-step ${step >= 2 ? 'visible' : ''}`}>
                <img src={Planet1} className="planet-width mt-3" alt="Planet 1" />
              </div>
              <div className={`col-4 howitworks-step ${step >= 4 ? 'visible' : ''}`}>
                <h6 className="montserrat-bold font-20 mb-22">Invite a Friend & Travel Together</h6>
                <p className="montserrat-regular font-18">
                  Space expeditions are better with a co-pilot! Invite friends and earn points together.
                </p>
              </div>
              <div className={`col-4 howitworks-step ${step >= 6 ? 'visible' : ''}`}>
                <img src={Planet3} className="planet-width mt-3" alt="Planet 3" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>

    {/* Redeem and Earn Section */}
    <section className="hero-section d-flex justify-content-center align-items-center px-5 position-relative">
      <div className="container">
        <div className="row justify-content-center">
          <div className="redeem-box col-lg-7 position-relative p-5 bg-opacity-25 bg-light rounded-4" data-aos="fade-up" data-aos-offset="300" data-aos-easing="ease-in-sine" data-aos-duration="500">
            <div className="redeem-circle-sect position-absolute" data-aos="fade-left" data-aos-offset="600" data-aos-easing="ease-in-sine">
              <div className="redeem-circle gift-circle-sec redeem-shadow position-relative d-flex justify-content-center align-items-center">
                <img className="position-absolute redem-box" src={redeembox} alt="redeembox" />
                <img className="position-absolute left-cloud start-0" src={leftcloud} alt="redeembox" />
                <div className="redeem-circle-cont text-center">
                  <h2 className="text-white mb-0 font-size-24 ms-5 ps-3">Redeem</h2>
                  <div className="text-white d-flex justify-content-center align-items-center ms-5 ps-4">
                    <span className="text-light-yellow font-size-12 montserrat-semibold">150</span>
                    <img className="mx-1" src={metero} alt="metero" />
                    <span className="font-size-14 montserrat-medium">Total Meteors</span>
                  </div>
                </div>
                <img className="position-absolute launch-rocket" src={rocket} alt="rocket" />
              </div>
            </div>
            <p className="text-center font-32 space-grotesk-medium px-5 py-4 mb-0 text-dark-blue lh-sm">
              Earn more with every action and redeem for real rewards on your journey through the stars
            </p>
            <div className="earnmore-circle-sect position-absolute" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
              <div className="redeem-circle playearn-circle-sec earn-shadow position-relative d-flex justify-content-center align-items-center">
                <img className="position-absolute coins-box" src={coins} alt="coins" />
                <img className="position-absolute left-cloud start-0" src={leftcloud} alt="redeembox" />
                <div className="earnmore-circle-cont text-center">
                  <h2 className="text-white mb-0 font-size-24 ms-5 ps-3">Earn More</h2>
                  <div className="text-white d-flex justify-content-center align-items-center ms-5 ps-4">
                    <span className="text-light-yellow font-size-12 montserrat-semibold">150</span>
                    <img className="mx-1" src={metero} alt="metero" />
                    <span className="font-size-14 montserrat-medium">Total Meteors</span>
                  </div>
                </div>
                <img className="position-absolute launch-rocket" src={rocket} alt="rocket" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideModal />
    </section>

    {/* Play and Earn Section */}
    <section className="pay-earn-section position-relative">
      <div className="pay-earn-content" data-aos="zoom-in-up" data-aos-delay="300" data-aos-duration="600">
        <div className="container h-100 pb-5">
          <div className="h-100 d-flex align-items-end position-relative">
            <img className={`position-absolute play-earn-img ${hoveredCard ? 'play-img-eft-act' : 'play-img-eft'} mt-5`} src={spinwheel} alt="spinwheel" />
            <div className="row justify-content-between p-4 rounded-4" data-aos="fade-up" data-aos-duration="600" data-aos-delay="500">
              <div className="col-lg-2 text-center ms-3 my-3">
                <h4 className="mt-4 pt-1 mb-2 font-size-28 space-grotesk-bold text-uppercase text-dark-blue">Play & Win</h4>
                <p className="font-size-18 montserrat-semibold text-dark-blue">Enter the Game Zone and get chance to earn more points!!</p>
              </div>

              {[1, 2, 3].map((id) => (
                <div key={id} className="col-lg-3 hover-card pb-1 bg-light text-center rounded-4 my-3" onMouseEnter={() => handleMouseEnter(id)} onMouseLeave={handleMouseLeave}>
                  <h3 className="mt-4 pt-1 mb-2 text-uppercase font-size-24 space-grotesk-bold text-dark-blue">Spin The Wheel</h3>
                  <p className="font-size-16 montserrat-medium text-blue">Spin and win bonus points, perks, and exclusive rewards. Give it a go now!</p>
                  <button className="btn background-text-blue text-white font-size-16 montserrat-medium rounded-5 mb-4 px-4">Play Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SideModal />
    </section>

    {/* Offer Section */}
    {/* You can now continue from the offer section and the rest you already provided. If you want, I can paste that as well directly. */}
    {/* Offer Section */}
<section className="offer-section">
  <div className="container-fluid px-5 pt-5">
    <div
      className="row"
      data-aos="fade-left"
      data-aos-offset="500"
      data-aos-delay="200"
      data-aos-easing="linear"
      data-aos-duration="5000"
    >
      <Slider className="offer-slider" {...settings}>
        {cards?.map((card, index) => (
          <div key={index} className={`d-flex offer-cards offer-bg-img-${card?.id}`}>
            <div className="col-lg-7 ms-3 ps-3 my-3 py-3 d-grid align-items-end">
              <h3 className="text-white font-36 montserrat-semibold mb-2 pb-1 truncate-text-2 lh-sm">{card.title}</h3>
              <p className="text-white font-20 montserrat-regular mb-4 pb-3 truncate-text-3 lh-sm">{card.content}</p>
              <a className="text-decoration-none text-white font-18 montserrat-medium d-flex" href="#">
                Learn More <img className="ms-2" src={rightarrow} alt="rightarrow" />
              </a>
            </div>
            <div className="col-lg-5 d-flex justify-content-center align-items-center">
              <img className="width-82" src={card?.img} alt="offerImages" />
            </div>
          </div>
        ))}
      </Slider>
    </div>

    {/* Exclusive Offers Section */}
    <h1 className="text-dark-blue mt-120 mb-4 pb-4 ">Exclusive Offers</h1>
    <div className="pt-5 d-grid price-exclusive gap-3">
      {[1, 2, 3].map((item, index) => (
        <div key={index} className="mt-5 rounded-4 shadow-lg bg-white px-0">
          <div className="head-sec position-relative">
            <img className="w-100" src={offerexcimg} alt="offerexcimg" />
            <img className="position-absolute offer-exc-rocket" src={excrocket} alt="excrocket" />
          </div>
          <div className="text-center px-5">
            <img src={zomato} alt="zomato" />
            <h3 className="font-24 text-light-black montserrat-semibold mt-3 mb-2">Get 10% Off on Zomato</h3>
            <p className="font-16 text-light-black montserrat-regular">Enjoy delicious deals on your next order!</p>
            <hr className="my-4 border-1" />
            <button className="btn background-text-blue text-white font-14 montserrat-medium mb-4 w-100 rounded-5" type="button">
              Claim Now
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Win Exciting Prizes Section */}
    <h2 className="text-dark-blue mt-120 mb-4 pb-4">Win Exciting Prizes</h2>
    <div className="row justify-content-between">
      <div className="col-lg-6 shadow-lg d-flex justify-content-between px-0 price-trolley">
        <div className="col-lg-8 pt-5 ps-5 d-grid">
          <div className="head-content">
            <h2 className="font-24 montserrat-medium text-white mb-2">Exciting Chance to Win a Trolley Bag!!</h2>
            <p className="font-14 montserrat-light text-white mb-5 pb-5">*Terms & Conditions Applied*</p>
          </div>
          <div className="section-offer align-self-end mb-3 pb-1">
            <h4 className="font-40 montserrat-medium text-white mb-0">Collect</h4>
            <div className="d-flex align-items-center">
              <span className="font-24 montserrat-semibold text-light-yellow">1500</span>
              <img className="mx-3" src={metero} alt="metero" />
              <span className="font-28 montserrat-medium text-white">Total Meteors</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 d-flex justify-content-start">
          <img className="align-self-end mb-1" src={suitcase} alt="suitcase" />
        </div>
      </div>

      <div className="col-lg-6 px-4 d-grid">
        <div className="col-lg-12 shadow-lg py-3 d-flex price-watch align-self-start">
          <div className="col-lg-8 ms-4 ps-4 align-self-end mb-1">
            <h4 className="font-40 montserrat-medium text-white mb-0">Collect</h4>
            <div className="d-flex align-items-center">
              <span className="font-24 montserrat-semibold text-light-yellow">1500</span>
              <img className="mx-3" src={metero} alt="metero" />
              <span className="font-28 montserrat-medium text-white">Total Meteors</span>
            </div>
          </div>
          <div className="col-lg-4 d-flex align-items-center">
            <img src={smartwatch} alt="smartwatch" />
          </div>
        </div>

        <div className="col-lg-12 py-3 shadow-lg d-flex price-headphone align-self-end">
          <div className="col-lg-8 ms-4 ps-4 align-self-end mb-1">
            <h4 className="font-40 montserrat-medium text-white mb-0">Collect</h4>
            <div className="d-flex align-items-center">
              <span className="font-24 montserrat-semibold text-light-yellow">1500</span>
              <img className="mx-3" src={metero} alt="metero" />
              <span className="font-28 montserrat-medium text-white">Total Meteors</span>
            </div>
          </div>
          <div className="col-lg-4 d-flex align-items-center">
            <img src={headphone} alt="headphone" />
          </div>
        </div>
      </div>
    </div>

    {/* FAQ Section */}
    <h2 className="text-dark-blue mt-120 mb-1 pb-1">Frequently Asked Questions</h2>
    <div className="row">
      <div className="accordion">
        {items.map((item, index) => (
          <div key={index} className="mt-4 pt-3">
            <div className="purple-border-bottom pb-4 pt-1" id={`heading${index}`}>
              <h6 className="mb-0 font-16 text-dark-blue montserrat-medium">
                <button
                  className="border-0 bg-transparent d-flex justify-content-between align-items-center w-100"
                  onClick={() => toggle(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`collapse${index}`}
                >
                  {item.title}
                  <span><img src={openIndex === index ? minus : plus} alt="" /></span>
                </button>
              </h6>
            </div>
            <div
              id={`collapse${index}`}
              className={`collapse ${openIndex === index ? 'show' : ''}`}
              aria-labelledby={`heading${index}`}
              data-parent="#accordion"
            >
              <div className="card-body p-3">
                <p className="mb-0 font-16 text-dark-blue montserrat-regular">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Footer Section */}
  <div className="offer-footer position-relative overflow-hidden mt-5">
    <div className="offer-footer-section position-relative d-flex justify-content-center text-center">
      <p className="width-36 font-32 space-grotesk-medium mb-5 text-white align-self-end">
        The more you refer, the brighter your rewards shine!
      </p>
    </div>
    <div
      className="position-absolute footer-semi-planet"
      data-aos="fade-up"
      data-aos-delay="100"
    ></div>
  </div>
</section>


  </>
);

};

export default Test;
