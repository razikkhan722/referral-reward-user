import React, { useState } from 'react';
import "./trackModal.scss";
import astronaut from "../../assets/icons/home/MyReferral/track-astronut.svg";
import tick from "../../assets/icons/home/MyReferral/tick.svg";
import { Modal, Button } from 'react-bootstrap';
// import { FaCheck } from "react-icons/fa6";

// Import Images
import PinkInvite from "../../assets/images/home/MyReferral/pink-invite.png";
import GrayBox from "../../assets/images/home/MyReferral/gray-box.png";
import GrayCart from "../../assets/images/home/MyReferral/gray-cart.png";
import PurpleBox from "../../assets/images/home/MyReferral/purple-box.png";
import OrangeCart from "../../assets/images/home/MyReferral/orange-cart.png";

const TrackModal = () => {
    const [show, setShow] = useState(false);

    const [progressSteps, setprogressSteps] = useState({
        invitationAccepted: true,
        rewardUnlocked: true,
        productPurchased: false
    });
    const [animateSteps, setAnimateSteps] = useState({
        invitationAccepted: false,
        rewardUnlocked: false,
        productPurchased: false,
    });

    const steps = [
        {
            key: "invitationAccepted",
            grayImg: PinkInvite,
            img: PinkInvite,
            title: "Invitation Accepted",
            desc: "Your friend has accepted your invite and signed up!"
        },
        {
            key: "rewardUnlocked",
            grayImg: GrayBox,
            img: PurpleBox,
            title: "Reward Unlocked",
            desc: "You've earned XYZ reward for your successful referral"
        },
        {
            key: "productPurchased",
            grayImg: GrayCart,
            img: OrangeCart,
            title: "Product Purchased",
            desc: "Haven't done any purchase"
        }
    ];

    const handleClose = () => {
        setShow(false);
        setAnimateSteps({ invitationAccepted: false, rewardUnlocked: false, productPurchased: false });
    }

    const handleShow = () => {
        setShow(true);
        setAnimateSteps({ invitationAccepted: false, rewardUnlocked: false, productPurchased: false });

        setTimeout(() => {
            setAnimateSteps(prev => ({ ...prev, invitationAccepted: true }));
        }, 300);

        setTimeout(() => {
            setAnimateSteps(prev => ({ ...prev, rewardUnlocked: true }));
        }, 800);

        setTimeout(() => {
            setAnimateSteps(prev => ({ ...prev, productPurchased: true }));
        }, 1300);
    }
    return (
        <>
            <button className="track-btn px-2 py-1 rounded font-size-14 border-0 text-blue" onClick={handleShow}>
                Track
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                contentClassName="custom-modal-content"
                backdrop="static"
            >
                <button className="referral-modal-close-btn rounded-circle border-0" onClick={handleClose}>
                    X
                </button>
                <Modal.Body className="p-4 modal-body-custom">

                    <div className="text-center">
                        <img src={astronaut} className="astronaut-img" alt="astronaut" />
                        <p className="font-size-32 space-grotesk-bold text-blue mt-2">Track The Progress</p>
                    </div>

                    <div className="progress-section my-3">
                        {steps.map(step => (
                            <div key={step?.key} className="row step justify-content-center">
                                <div className="col-lg-8 step-content d-flex">
                                    <div>
                                        <img src={progressSteps[step?.key] ? step?.img : step?.grayImg} className='me-2' alt="Step Icon" />
                                    </div>
                                    <div>
                                        <p className={`space-grotesk-medium font-size-18 mb-0 ${progressSteps[step?.key] ? 'text-blue' : 'text-gray'}`}>
                                            {step?.title}
                                        </p>
                                        <p className={`mb-0 font-size-12 space-grotesk-regular lh-1 ${progressSteps[step?.key] ? 'text-blue' : 'text-gray'}`}>
                                            {step?.desc}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-3 d-flex align-items-center flex-column position-relative">
                                    <div className="circle-wrapper position-relative">
                                        <div className={`circle ${progressSteps[step?.key] ? 'filled-circle' : 'empty-circle'}`}>
                                            {progressSteps[step?.key] &&
                                            <img className='track-tick' src={tick} alt="" />
                                             }
                                        </div>
                                        {steps.length - 1 !== steps.findIndex(s => s.key === step?.key) && (
                                            <div className={`vertical-line ${animateSteps[step?.key] ? 'line-fill' : ''}`}></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default TrackModal;
