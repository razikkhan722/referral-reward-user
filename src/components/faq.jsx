import React, { useState } from 'react'

// Images
import plus from '../../src/assets/icons/home/offer/plus.svg';
import minus from '../../src/assets/icons/home/offer/minus.svg';

const FAQ = ({ items, classes }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container">
      <h2 className={`text-dark-blue space-grotesk-bold ${classes} mt-120 mb-1 pb-1`}>
        Frequently Asked Questions
      </h2>
      <div className="row">
        <div className="accordion w-100">
          {items?.map((item, index) => (
            <div className="w-100" key={index}>
              <div className="purple-border-bottom mb-0 pt-1 d-block pt-4 pb-4" id={`heading${index}`}>
                <h6 className="mb-0 font-16 text-dark-blue montserrat-medium">
                  <button
                    className="border-0 bg-transparent d-flex justify-content-between align-items-center w-100"
                    onClick={() => toggle(index)}
                    aria-expanded={openIndex === index}
                  >
                    {item?.question}
                    <span>
                      <img src={openIndex === index ? minus : plus} alt="" />
                    </span>
                  </button>
                </h6>
              </div>

              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <div className="card-body pt-16 pl-16 pb-16">
                  <p className="mb-0 font-16 text-dark-blue montserrat-regular">
                    {item?.answer}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
