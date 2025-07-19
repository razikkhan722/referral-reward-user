// import { Link, useNavigate } from 'react-router-dom';
// import React from 'react';
// import Plus from '../../assets/icons/home/offer/whitePlus.svg';

// const fabItems = [
//   {
//     id: 'Home',
//     className: 'opt1',
//     to: '/',
//   },
//   {
//     id: 'Rewards',
//     className: 'opt2',
//     to: '/reward',
//   },
//   {
//     id: 'Referrals',
//     className: 'opt3',
//     to: '/referral',
//   },
//   {
//     id: 'Profile',
//     className: 'opt4',
//     to: '/profile',
//   },
// ];

// const FloatingActionButton = ({ toTop }) => {
//   const navigate = useNavigate();

//   const HandleNavi = (to) => {
//     if (to == '/') {
//      return toTop(0);
//     }
//     navigate(to);
//   };

//   return (
//     <>
//       <div className="mainopShadow"></div>
//       <div className="fab">
//         <div className="mainop cursor-pointer d-flex align-items-center justify-content-center text-center">
//           <img className="flotnav-icon mx-auto my-auto" src={Plus} alt="" />
//         </div>

//         {fabItems.map((item) => (
//           <div
//             key={item.id}
//             id={item.id}
//             onClick={() => HandleNavi(item?.to)}
//             className={`minifab cursor-pointer d-flex align-items-center justify-content-center m-2 ${item.className}`}
//           >
//             <span className="minifabIcon font-14 text-white" src={item.icon}>
//               {item.id}
//             </span>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default FloatingActionButton;

import { useNavigate } from 'react-router-dom';
import React from 'react';
import Plus from '../../assets/icons/home/offer/whitePlus.svg';

const fabItems = [
  {
    id: 'Home',
    className: 'opt1',
    to: '/',
  },
  {
    id: 'Rewards',
    className: 'opt2',
    to: '/reward',
  },
  {
    id: 'Referrals',
    className: 'opt3',
    to: '/referral',
  },
  {
    id: 'Profile',
    className: 'opt4',
    to: '/profile',
  },
];

const FloatingActionButton = ({ toTop }) => {
  const navigate = useNavigate();

  const handleNavigate = (to) => {
    if (to === '/') {
      toTop?.(0);
    } else {
      navigate(to);
    }
  };

  return (
    <>
      <div className="mainopShadow"></div>
      <div className="fab">
        <div className="mainop cursor-pointer d-flex align-items-center justify-content-center text-center">
          <img className="flotnav-icon mx-auto my-auto" src={Plus} alt="plus-icon" />
        </div>

        {fabItems.map((item) => (
          <div
            key={item.id}
            id={item.id}
            onClick={() => handleNavigate(item.to)}
            className={`minifab cursor-pointer d-flex align-items-center justify-content-center m-2 ${item.className}`}
          >
            <span className="minifabIcon font-14 text-white">
              {item.id}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingActionButton;
