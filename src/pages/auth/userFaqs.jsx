import React, { useContext } from 'react';

// import Common Component
import FAQ from '../../components/faq';

// UseContext
import { UserContext } from '../../UseContext/useContext';

// Import Thort Party components
// React-Icons
import { IoIosArrowBack } from 'react-icons/io';
// Navigation
import { NavLink } from 'react-router-dom';

const UserFaqs = () => {
  // Global context
  const { ContextFaqsDataAPI } = useContext(UserContext);

  return (
    <section className="pt-5 pb-5">
      <div className='container '>
        <NavLink to={"/profile"} className={"text-decoration-none"}>
          <div className='back text-white my-3 d-flex align-items-center font-14 montserrat-medium'>
            <IoIosArrowBack />Back
          </div>

        </NavLink>
        <div className="pt-5 mt-5 pb-5 bg-white rounded-4">
          {/* Faq Section */}
          <FAQ items={ContextFaqsDataAPI?.help_and_support} classes={'mt-0'} />
        </div>
      </div>
    </section >
  );
};

export default UserFaqs;
