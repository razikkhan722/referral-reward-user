import React from 'react'
import "./error.scss"
import { NavLink } from 'react-router-dom'

// Images
import ErrorImg from "../../assets/images/home/Error-img/404.svg"
const Error = () => {
    return (
        <>
            <div className='error-bg d-flex align-items-center justify-content-centre'>
                <div className='container text-center'>
                    <p className='font-34 text-white montserrat-semibold pb-4'>Looks like you are lost in space!</p>
                    <div>
                        <img src={ErrorImg} className='error-img' alt="Loading" />
                    </div>

                    <NavLink to={"/"}>
                        <button className='font-18 mt-4 montserrat-semibold text-blue bg-white border-0 px-5 py-2 rounded-pill'>Go Back</button>
                    </NavLink>
                </div>

            </div>
        </>
    )
}

export default Error;