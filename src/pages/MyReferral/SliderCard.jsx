import React, { useState } from 'react'
import "./slidercard.scss"
import Slider from "react-slick";
import { FaList } from "react-icons/fa6";
import TrackModal from './trackModal';

// Import Json
const referralUsers = [
    {
        cardColor: "user-green-card",
        name: "Aakriti Soni",
        email: "akritixyz@gmail.com",
        status: "Joined"
    },
    {
        cardColor: "user-blue-card",
        name: "John Doe",
        email: "john@example.com",
        status: "Joined"
    },
    {
        cardColor: "user-purple-card",
        name: "Sara Khan",
        email: "sara@example.com",
        status: "Pending"
    },
    {
        cardColor: "user-green-card",
        name: "Ravi Verma",
        email: "ravi@example.com",
        status: "Joined"
    },
    {
        cardColor: "user-blue-card",
        name: "Megha Patil",
        email: "megha@example.com",
        status: "Joined"
    },
    {
        cardColor: "user-purple-card",
        name: "Sara Khan",
        email: "sara@example.com",
        status: "Pending"
    },
];

const referralData = [
    {
        name: "Aakriti Soni",
        email: "akritixyz@gmail.com",
        referredOn: "9th April 2025",
        status: "Pending",
        points: "@1234 Meteors",
        action: "Track"
    },
    {
        name: "Aakriti Soni",
        email: "akritixyz@gmail.com",
        referredOn: "9th April 2025",
        status: "Joined",
        points: "@1234 Meteors",
        action: "-"
    },
    {
        name: "Aakriti Soni",
        email: "akritixyz@gmail.com",
        referredOn: "9th April 2025",
        status: "Pending",
        points: "@1234 Meteors",
        action: "Track"
    },
    {
        name: "Aakriti Soni",
        email: "akritixyz@gmail.com",
        referredOn: "9th April 2025",
        status: "Pending",
        points: "@1234 Meteors",
        action: "Track"
    }
];

let ColorCode = ["user-green-card",
    "user-blue-card",
    "user-purple-card",
    "user-green-card",
    "user-blue-card",
    "user-purple-card",]

const SliderCard = ({ RefralDataAPI }) => {
    const [showTable, setShowTable] = useState(false);
    var settings = {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        // initialSlide: 0,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <div className='d-flex align-items-center justify-content-between'>
                <p className='font-32 space-grotesk-bold text-blue mt-5'>My Referrals</p>
                <div className='referral-toggle-btn text-center d-flex align-items-center justify-content-center cursor-pointer'
                    onClick={() => setShowTable(!showTable)}
                >
                    <FaList className='fs-5 text-blue cursor-pointer' />
                </div>
            </div>

            {RefralDataAPI?.part4?.length > 0 ? (
                <>
                    {!showTable ? (
                        <div className="slider-container">
                            <Slider {...settings}>
                                {RefralDataAPI?.part4?.map((user, index) => (
                                    <div key={index} className={`referral-user-card ${ColorCode[index % ColorCode.length]}`}>
                                        <div className='row p-3 mb-3'>
                                            <div className='col-9 col-lg-9 d-flex'>
                                                <div className='rounded-circle bg-white user-icon'></div>
                                                <div className='text-white ms-3'>
                                                    <p className='font-24 montserrat-semibold mb-0'>{user?.username}</p>
                                                    <p className='montserrat-regular font-14'>{user?.email || "abc@gmail.com"}</p>
                                                </div>
                                            </div>
                                            <div className='col-3 col-lg-3'>
                                                <div className='status d-flex justify-content-center align-items-center py-1'>
                                                    <span className='rounded-circle bg-white small-white-circle me-2'></span>
                                                    {/* <p className='text-white font-10 montserrat-regular mb-0'>{user?.referral_status}</p> */}
                                                    <p className='text-white font-10 montserrat-regular mb-0'>{user?.referral_status}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='user-card-bottom d-flex justify-content-between align-items-center p-3'>
                                            <div className='text-white'>
                                                <p className='mb-0 font-12 montserrat-regular'>Referred on</p>
                                                <p className='mb-0 font-16 montserrat-medium'>{user?.date}</p>
                                            </div>
                                            <div className='text-white'>
                                                <p className='mb-0 font-12 montserrat-regular'>Earned Points</p>
                                                <p className='mb-0 font-16 montserrat-medium text-end'>{user?.earned_meteors}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        /* Referral Table Start Here */
                        <div className='referral-table table-responsive mt-5'>
                            <table className="table  align-middle">
                                <thead className='referral-table-header text-center'>
                                    <tr>
                                        <th scope="col" className='font-size-20 montserrat-medium text-start ps-5 py-3'>Name</th>
                                        <th scope="col" className='font-size-20 montserrat-medium py-3'>Reffered On</th>
                                        <th scope="col" className='font-size-20 montserrat-medium py-3'>Status</th>
                                        <th scope="col" className='font-size-20 montserrat-medium py-3'>Earned Points</th>
                                        <th scope="col" className='font-size-20 montserrat-medium py-3'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='referral-table-body text-center'>
                                    {RefralDataAPI?.part4.map((item, index) => (
                                        <tr key={index}>
                                            <td scope="row" className='text-start ps-5 d-flex'>
                                                <span className='referral-table-user rounded-circle me-3'></span>
                                                <div>
                                                    {/* <p className='font-size-16 montserrat-semibold mb-0'>{item?.username}</p> */}
                                                    <p className='font-size-16 montserrat-semibold mb-0'>{item?.username}</p>
                                                    <p className='font-size-14 montserrat-medium mb-0'>{item?.email || "abc@gmail.com"}</p>
                                                </div>
                                            </td>
                                            <td className='font-size-16 montserrat-semibold'>{item?.date}</td>
                                            {/* <td className='font-size-16 montserrat-semibold'>{item?.referral_status}</td> */}
                                            <td className='font-size-16 montserrat-semibold'>{item?.status}</td>
                                            <td className='font-size-16 montserrat-semibold'>{item?.earned_meteors}</td>
                                            <td className='font-size-24 montserrat-medium'>
                                                {item?.referral_status !== "completed" ? (
                                                    <TrackModal />
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div >
                    )}
                </>

            ) : (
                <div className="text-blue montserrat-semibold font-20 py-3">You have not reffered anyone yet!!</div>
            )}
        </>
    );
};

export default SliderCard;