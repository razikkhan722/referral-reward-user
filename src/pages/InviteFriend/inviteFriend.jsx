import React from 'react'

// Common Components
import Navbar from "../../components/navbar"
import Invitefriend from '../home/invitefriend';

// import third Party Components
import { NavLink } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const InviteFriend = () => {
    return (
        <>
            <div className='invite-bg overflow-hidden'>
                <div className='container'>
                    <NavLink to={"/"} className={"text-decoration-none"}>
                        <div className='back text-blue my-3 d-flex align-items-center font-14 montserrat-semibold'>
                            <IoIosArrowBack />Back
                        </div>
                    </NavLink>
                </div>
                {/* <Navbar/> */}
                <Invitefriend />
            </div>

        </>
    );
};

export default InviteFriend;