import React, { useContext } from 'react';
import FAQ from '../../components/faq';
import { IoIosArrowBack } from 'react-icons/io';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../UseContext/useContext';

// Import Json
const faqData = [
  {
    title: '1. What is wealth Elites Reward & Program?',
    content: 'You can return any item within 30 days of purchase.',
  },
  {
    title: '2. How do I track my referrals?',
    content:
      'You can track your order from the “My Orders” section after login.',
  },
  {
    title: '3. What does a successfull referral mean?',
    content: 'Yes, we offer 24/7 customer support via chat and email.',
  },
  {
    title: '3. What does a successfull referral mean?',
    content: 'Yes, we offer 24/7 customer support via chat and email.',
  },
];

const UserFaqs = () => {
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
          <FAQ items={ContextFaqsDataAPI?.help_and_support} classes={'mt-0'} />
        </div>
      </div>
    </section >
  );
};

export default UserFaqs;
