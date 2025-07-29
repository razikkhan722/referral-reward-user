import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import navCenterImg from '../assets/images/home/navCenterImg.svg';

const Navbar = () => {
  const navItems = [
    { label: 'Home', to: '/', color: 'orange' },
    { label: 'My Rewards', to: '/reward', color: 'green' },
    { img: navCenterImg },
    { label: 'My Referrals', to: '/referral', color: 'blue' },
    { label: 'Profile', to: '/profile', color: 'rebeccapurple' },
  ];

  const indicatorRef = useRef(null);
  const blurShadowRef = useRef(null);
  const navRefs = useRef([]);
  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prevIndexRef = useRef(0);

  useEffect(() => {
    const currentPath = location.pathname;
    const foundIndex = navItems.findIndex((item) => item?.to === currentPath);
    if (foundIndex !== -1 && foundIndex !== activeIndex) {
      // Delay updating prevIndex so current animation uses old value
      setTimeout(() => {
        prevIndexRef.current = foundIndex;
      }, 0);
      setActiveIndex(foundIndex);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResizeAndIndicator = () => {
      if (window.innerWidth >= 992) {
        const currentItem = navRefs.current[activeIndex];
        if (currentItem && indicatorRef.current && blurShadowRef.current) {
          const { offsetWidth, offsetLeft } = currentItem;
          const direction =
            activeIndex > prevIndexRef.current ? 'left-to-right' : 'right-to-left';

          indicatorRef.current.style.width = `${offsetWidth}px`;
          indicatorRef.current.style.left = `${offsetLeft}px`;
          indicatorRef.current.style.backgroundColor = '#fff';
          indicatorRef.current.setAttribute('data-direction', direction);
          indicatorRef.current.style.display = 'block';

          blurShadowRef.current.style.width = `200px`;
          blurShadowRef.current.style.left = `${offsetLeft - 60}px`;
          blurShadowRef.current.style.display = 'block';
        }
      } else {
        if (indicatorRef.current) indicatorRef.current.style.display = 'none';
        if (blurShadowRef.current) blurShadowRef.current.style.display = 'none';
      }
    };

    handleResizeAndIndicator();
    window.addEventListener('resize', handleResizeAndIndicator);
    return () => window.removeEventListener('resize', handleResizeAndIndicator);
  }, [activeIndex]);

  return (
    <>
      <section className="header-section position-relative">
        <nav className="navbar navbar-expand-lg my-0 py-0">
          <div className="container-fluid justify-content-end position-relative">
            {/* Toggle Button for Mobile */}
            <button
              className="mobile-menu-toggle d-lg-none"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>

            {/* Desktop Navigation */}
            <div className="navbar-collapse d-none d-lg-block">
              <div className="container-fluid px-5">
                <ul className="d-flex justify-content-between nav-ul my-0 py-0 px-0 position-relative">
                  {navItems?.map((item, index) =>
                    !item?.img ? (
                      <Link to={item?.to} key={index}>
                        <li className="list-unstyled list-background h-100 text-white mt-4 pt-3">
                          <span
                            ref={(el) => (navRefs.current[index] = el)}
                            className={`nav-link mx-3 cursor-pointer ${
                              activeIndex === index
                                ? 'active space-grotesk-bold'
                                : 'space-grotesk-medium'
                            }`}
                          >
                            {item?.label}
                          </span>
                        </li>
                      </Link>
                    ) : (
                      <li className="list-unstyled text-center" key={index}>
                        <img
                          className="header-center-img h-75"
                          src={navCenterImg}
                          alt="navCenterImg"
                        />
                      </li>
                    )
                  )}
                  <span
                    className="nav-indicator rounded-pill position-absolute"
                    ref={indicatorRef}
                  ></span>
                  <span
                    className="active-blur-shadow position-absolute"
                    ref={blurShadowRef}
                  />
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </section>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar for Mobile */}
      <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
          &times;
        </button>
        <ul className="mobile-nav-list px-0">
          {navItems?.map(
            (item, index) =>
              !item?.img && (
                <li key={index} className="list-unstyled">
                  <Link
                    to={item?.to}
                    onClick={() => {
                      if (window.innerWidth < 992) {
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    <span
                      className={`nav-link d-block py-3 px-4 text-white ${
                        activeIndex === index ? 'active' : ''
                      }`}
                    >
                      {item?.label}
                    </span>
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
