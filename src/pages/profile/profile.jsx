import React, { useState, useEffect, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

// Assets
import ProfileIcon from '../../assets/icons/auth/add-profile.svg';
import AddIcon from '../../assets/icons/auth/profile-pluse-icon.svg';
import Balance from '../../assets/icons/auth/profile-balance.svg';
import Pending from '../../assets/icons/auth/profile-pending.svg';
import Redeemed from '../../assets/icons/auth/profile-redeemed.svg';
import Reward from '../../assets/icons/auth/profile-reward.svg';
import Edit from '../../assets/icons/auth/profile-edit.svg';
import Close from '../../assets/icons/auth/modal-close.svg';
import UploadIcon from '../../assets/icons/auth/upload-icon.svg';
import UploadFile from '../../assets/icons/auth/uploaded-file.svg';
import star from '../../assets/icons/home/profile/starGroup.svg';
import coin from '../../assets/icons/home/profile/coinGroup.svg';
import meteor from '../../assets/icons/home/profile/meteorGroup.svg';

// API call service
import { postData } from '../../services/api';

// UserContext

// Utilities
import { DecryptFunction } from '../../utils/decryptFunction';

// Toast messages
import { toastError, toastSuccess } from '../../utils/toster';

// Components
import Navbar from '../../components/navbar';
import { UserContext } from '../../UseContext/useContext';

const Profile = () => {
  // Profile form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
  } = useForm();

  // Meteor conversion form
  const {
    register: registerMeteor,
    handleSubmit: handleSubmitMeteor,
    formState: { errors: errorsMeteor },
    watch: watchMeteor,
    rest,
  } = useForm();
  // Stars conversion form
  const {
    register: registerStar,
    handleSubmit: handleSubmitStar,
    formState: { errors: errorsStar },
    watch: watchStar,
  } = useForm();

  const navigate = useNavigate();

  // Profile data state
  const [profileData, setProfileData] = useState({
    name: 'Areeba Mujeeb',
    mobile: '9123454678',
    email: 'areeba1234@gmail.com',
  });

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [ismeteroModalOpen, setIsmeteroModalOpen] = useState(false);
  const [isStarModalOpen, setIsStarModalOpen] = useState(false);
  const [contratsModal, setcontratsModal] = useState(false);
  const [UserDataAPI, setUserDataAPI] = useState();

  const { ContextFaqsDataAPI, ContextHomeDataAPI, setAuthLocal } =
    useContext(UserContext);

  const Auth = JSON?.parse(sessionStorage.getItem('Auth') ?? '{}');
  // Add state to track the calculated value
  const [calculatedStars, setCalculatedStars] = useState(0);
  const [calculatedCash, setCalculatedCash] = useState(0);

  // Message form state
  const [messageForm, setMessageForm] = useState({
    name: profileData.name,
    email: profileData.email,
    message: '',
    files: [],
  });

  // Sync profileData with messageForm
  useEffect(() => {
    setMessageForm((prevForm) => ({
      ...prevForm,
      name: profileData.name,
      email: profileData.email,
    }));
  }, [profileData]);

  // Accordion state
  const [activeSection, setActiveSection] = useState('');

  // Profile image state
  const [profileImage, setProfileImage] = useState(null);

  // Accordion toggle
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };

  const codeRef = useRef();
  const linkRef = useRef();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopy = (ref, type) => {
    if (ref.current) {
      const value = ref.current.value;
      navigator.clipboard.writeText(value);
      // Set state to show "Copied!" text
      if (type === 'code') {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000); // Reset after 2 seconds
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    }
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  // Handle profile image change
  // const handleSendImage = (e) => {
  //   const file = e.target.files;
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // Handle form input change
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfileData({ ...profileData, [name]: value });
  // };

  // Handle form submit
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // Mobile number validation
  //   if (!/^\d{10}$/.test(profileData.mobile)) {
  //     alert('Mobile number must be exactly 10 digits.');
  //     return;
  //   }
  //   alert('Profile updated successfully!');
  //   setIsEditModalOpen(false);
  // };

  // Handle message form submit
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsMessageModalOpen(false);
      // Reset form
      setMessageForm({
        name: profileData.name,
        email: profileData.email,
        message: '',
        files: [],
      });
      // messageForm
      const enyptData = await postData('/contact', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
        username: UserDataAPI?.part1,
        email: UserDataAPI?.part2,
        message: messageForm?.message,
        files: messageForm?.files,
      });

      setIsMessageModalOpen(false);
      toastSuccess(enyptData?.message);
    } catch (error) {
      toastError(error?.error);
    }
  };

  // =================================
  //       API FUNCTIONALITY
  // =================================

  const HandleAPI = async () => {
    try {
      const enyptData = await postData('/profile', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
      });
      const Decrpty = await DecryptFunction(enyptData);
      console.log('Decrpty: ', Decrpty);
      setUserDataAPI(Decrpty);
    } catch (error) {}
  };

  useEffect(() => {
    HandleAPI();
  }, []);

  //   --------------

  const [passwords, setPasswords] = useState({
    newPassword: '',
    rePassword: '',
  });
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async (data) => {
    try {
      const enyptData = await postData('/update-profile', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
        username: data?.name,
        email: data?.email,
        mobile_number: data?.mobile,
        image: profileImage,
        password: data?.currentPassword,
        new_password: data?.newPassword,
      });
      setIsEditModalOpen(false);
      toastSuccess(enyptData?.message);
      if (enyptData?.success) {
        const response = await postData('/profile', {
          user_id: Auth?.user_id,
          log_alt: Auth?.log_alt,
          mode: Auth?.mode,
        });
        const Decrpty = await DecryptFunction(response);
        setUserDataAPI(Decrpty);
      }
    } catch (error) {
      toastError(error?.error);
    }
  };

  const onMeteorConvert = async (data) => {
    try {
      const response = await postData('/meteors-to-stars', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
        meteors_to_debit: Number(data?.meteors),
        stars_credited: calculatedStars,
      });
      toastSuccess(response?.message);
      setIsmeteroModalOpen(false);
      setcontratsModal(true);
    } catch (error) {
      console.log('error: ', error);
      toastError(error?.error);
    }
  };

  const onStarConvert = async (data) => {
    try {
      const response = await postData('/stars-to-currency', {
        user_id: Auth?.user_id,
        log_alt: Auth?.log_alt,
        mode: Auth?.mode,
        stars_debited: Number(data?.stars),
        currency_credited: calculatedCash,
      });
      toastSuccess(response?.message);
      setIsStarModalOpen(false);
      setcontratsModal(true);
    } catch (error) {
      console.log('error: ', error);
      toastError(error?.error);
    }
  };

  const modalRef = useRef(null); // Reference to modal content

  // Effect to handle outside click for edit modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isEditModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setIsEditModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditModalOpen]);

  // ------Logout Functionailty
  const HandleLogout = () => {
    sessionStorage.removeItem('Auth');
    setAuthLocal('');
    console.log('check auth');
    navigate('/login');
  };

  return (
    <section className="profile-section" id="Profile_Section">
      <Navbar />
      <div className="container py-4 profile-container">
        {/* Header */}
        <div className="bg-profile-detail rounded-4 mb-32 p-4">
          <div className="d-flex justify-content-between  mb-36">
            <div className="d-flex align-items-center">
              <div className="position-relative me-3">
                <div className="rounded-circle bg-light profile-pic d-flex align-items-center justify-content-center overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    <span className="fw-bold fs-4 text-primary">
                      <img
                        className="h-100 w-100 user-profile-icon"
                        src={ProfileIcon}
                        alt=""
                      />
                    </span>
                  )}
                </div>
              </div>
              <div className="user-details">
                <h4 className="mb-3 user-name montserrat-semibold font-24 text-uppercase text-primary-color">
                  {UserDataAPI?.part1}
                </h4>
                <small className="user-contact montserrat-medium font-16">
                  {UserDataAPI?.part3} <span>|</span> {UserDataAPI?.part2}
                </small>
              </div>
            </div>
            <div className="d-flex h-max-content">
              {UserDataAPI?.part10 ? (
                <span className="ref-code-div font-14 montserrat-medium me-4 px-3 rounded-2 d-flex align-items-center justify-content-center">
                  <span className="text-ref-code montserrat-medium">
                    Ref by
                  </span>
                  <span className="digit-ref-code montserrat-semibold px-2">
                    {UserDataAPI?.part10}
                  </span>
                </span>
              ) : (
                ' '
              )}

              <button
                className="btn background-text-blue  btn-sm btn-edit-profile position-relative pe-3"
                onClick={() => setIsEditModalOpen(true)}
              >
                <img
                  className="edit-icon montserrat-semibold"
                  src={Edit}
                  alt=""
                />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Rewards */}
          <div className="row mt-2 g-3">
            <h3 className="font-18 montserrat-semibold heading-reward-summary mt-0 mb-12">
              Reward Summary
            </h3>
            {[
              {
                value: UserDataAPI?.part9,
                label: 'Total Meteors Earned',
                RewardIcons: Reward,
              },
              {
                value: UserDataAPI?.part5,
                label: 'Referral Earnings',
                RewardIcons: Balance,
              },
              {
                value: UserDataAPI?.part6,
                label: 'Redeemed Meteors',
                RewardIcons: Redeemed,
              },
              {
                value: UserDataAPI?.part4,
                label: 'Available Meteors',
                RewardIcons: Pending,
              },
            ].map((item, idx) => (
              <div className="col-6 col-lg-3 mt-0 mb-3 mb-lg-0" key={idx}>
                <div className="d-flex flex-column justify-content-between bg-light-purple-transparent p-3 rounded">
                  <div className="d-flex  justify-content-between">
                    <div className="reward-icons-div">
                      <img src={item.RewardIcons} alt="Icons" />
                    </div>
                    <h3 className="text-primary-color montserrat-semibold mb-8 font-24">
                      {item.value}
                    </h3>
                  </div>
                  <small className="montserrat-medium font-16 text-end text-primary-color">
                    {item.label}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite Links */}
        <div className="row mb-4 g-3">
          <h3 className="font-18 montserrat-semibold text-light-color mt-0 mb-12">
            Reward Review
          </h3>
          <div className="col-md-6 mt-0">
            <div className="position-relative">
              <input
                ref={linkRef}
                type="text"
                className="w-100 text-light-color montserrat-medium font-14 input-profile-copy-link bg-light-purple-transparent border-0"
                // value={UserDataAPI?.part7}
                value={UserDataAPI?.part7}
                readOnly
              />
              <button
                className="btn position-absolute btn-profile-copy-link font-14 text-white montserrat-regular bg-primary-color"
                // onClick={() => copyToClipboard(inviteLink)}
                onClick={() => handleCopy(linkRef, 'link')}
              >
                {/* Copy Link */}
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
          <div className="col-md-6 mt-0">
            <div className="position-relative">
              <input
                ref={codeRef}
                type="text"
                className="w-100 text-light-color montserrat-medium font-14 input-profile-copy-link bg-light-purple-transparent border-0"
                // value={UserDataAPI?.part8}
                value={UserDataAPI?.part8}
                readOnly
              />
              <button
                className="btn position-absolute btn-profile-copy-link font-14 text-white montserrat-regular bg-primary-color"
                // onClick={() => copyToClipboard(inviteCode)}
                onClick={() => handleCopy(codeRef, 'code')}
              >
                {/* Copy Code */}
                {copiedCode ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>
        </div>

        {/* Accordions */}
        <div className="accordion" id="profileAccordion">
          {/* Wallet */}
          <div className="accordion-item bg-transparent border-0 border-radius-0">
            <h2 className="accordion-header bg-transparent">
              <button
                className={`accordion-button text-light-color bg-transparent font-18 montserrat-semibold pt-4 pb-4 border-radius-0 ${activeSection === 'wallet' ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleSection('wallet')}
              >
                My Wallet
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${activeSection === 'wallet' ? 'show' : ''}`}
            >
              <div className="accordion-body">
                <p className="font-16 montserrat-semibold text-primary-color mb-24">
                  Your Current Wallet Balance
                </p>
                <div className="d-flex gap-4 fw-bold mb-32">
                  <span
                    className="font-24 montserrat-bold text-primary-color"
                    role="button"
                  >
                    {
                      ContextFaqsDataAPI?.conversion_data[0]?.conversion_rates
                        ?.meteor_to_star
                    }{' '}
                    <span className="font-16 montserrat-semibold">Meteors</span>
                  </span>
                  <span className="ml-60 mr-60 text-light-color">|</span>
                  <span
                    className="font-24 montserrat-bold text-primary-rr"
                    role="button"
                  >
                    {
                      ContextFaqsDataAPI?.conversion_data[0]?.conversion_rates
                        ?.star_to_meteor
                    }{' '}
                    <span className="font-16 montserrat-semibold">Stars</span>
                  </span>
                  <span className="ml-60 mr-60 text-light-color">|</span>
                  <span
                    className="font-24 montserrat-bold text-primary-color"
                    role="button"
                  >
                    {
                      ContextFaqsDataAPI?.conversion_data[0]?.conversion_rates
                        ?.reward_to_currency
                    }
                    <span className="font-16 montserrat-semibold">
                      {' '}
                      Cash/Points
                    </span>
                  </span>
                </div>
                <div className="d-flex gap-3 mb-24">
                  <button
                    onClick={() => setIsmeteroModalOpen(true)}
                    className="btn btn-primaryColor font-14 text-white montserrat-semibold"
                  >
                    Convert meteors into stars
                  </button>
                  <button
                    onClick={() => setIsStarModalOpen(true)}
                    className="btn btn-outlineDark font-14 text-primary-color montserrat-semibold"
                  >
                    Convert stars into cash/points
                  </button>
                </div>
                <small className="text-primary-color">
                  <span className="font-14 montserrat-semibold">Note*</span>{' '}
                  <span className="font-14 montserrat-medium">
                    The conversion rates are as follows:
                  </span>{' '}
                  <span className="font-18 montserrat-semibold">
                    "X <span className="font-16">Meteors =</span> Y{' '}
                    <span className="font-16">Stars</span>= Z{' '}
                    <span className="font-16">Cash/Points"</span>
                  </span>
                </small>
              </div>
            </div>
          </div>
          {/* Notification Section */}
          <div className="accordion-item bg-transparent border-0">
            <h2 className="accordion-header bg-transparent">
              <button
                className={`accordion-button text-light-color bg-transparent font-18 montserrat-semibold pt-4 pb-4 ${activeSection === 'notifications' ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleSection('notifications')}
              >
                Notification Settings / Preferences
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${activeSection === 'notifications' ? 'show' : ''}`}
            >
              <div className="accordion-body">
                <div className="form-check form-switch pl-0 mb-20 width-30 d-flex justify-content-between align-items-center">
                  <label
                    className="form-check-label montserrat-medium font-14 text-primary-color"
                    htmlFor="rewardNotifications"
                  >
                    Reward Notifications
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rewardNotifications"
                    defaultChecked
                  />
                </div>

                <div className="form-check form-switch pl-0 mb-20 width-30 d-flex justify-content-between align-items-center">
                  <label
                    className="form-check-label montserrat-medium font-14 text-primary-color"
                    htmlFor="milestoneUpdates"
                  >
                    Milestone Updates
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="milestoneUpdates"
                  />
                </div>

                <div className="form-check form-switch pl-0 mb-20 width-30 d-flex justify-content-between align-items-center">
                  <label
                    className="form-check-label montserrat-medium font-14 text-primary-color"
                    htmlFor="referralAlerts"
                  >
                    Referral Alerts
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="referralAlerts"
                    defaultChecked
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="accordion-item bg-transparent border-0">
            <h2 className="accordion-header bg-transparent">
              <button
                className={`accordion-button text-light-color bg-transparent font-18 montserrat-semibold pt-4 pb-4 ${activeSection === 'account' ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleSection('account')}
              >
                Account Settings
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${activeSection === 'account' ? 'show' : ''}`}
            >
              <div className="accordion-body">
                <ul className="list-unstyled">
                  <li
                    className="montserrat-medium font-14 text-primary-color mb-20"
                    role="button"
                  >
                    <span className="text-blue" onClick={() => HandleLogout()}>
                      Logout
                    </span>
                  </li>
                  <li
                    className="montserrat-medium font-14 text-primary-color"
                    role="button"
                  >
                    <a href="#" className="anchor-link">
                      Delete / De-activate account
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="accordion-item bg-transparent border-0">
            <h2 className="accordion-header bg-transparent">
              <button
                className={`accordion-button text-light-color bg-transparent font-18 montserrat-semibold pt-4 pb-4 ${activeSection === 'help' ? '' : 'collapsed'}`}
                type="button"
                onClick={() => toggleSection('help')}
              >
                Help & Support
              </button>
            </h2>
            <div
              className={`accordion-collapse collapse ${activeSection === 'help' ? 'show' : ''}`}
            >
              <div className="accordion-body">
                <ul className="list-unstyled">
                  <li
                    className="montserrat-medium font-14 text-primary-color mb-20"
                    role="button"
                  >
                    <a
                      onClick={() => setIsMessageModalOpen(true)}
                      className="anchor-link"
                    >
                      Send Message
                    </a>
                  </li>
                  <li
                    className="montserrat-medium font-14 text-primary-color mb-20"
                    role="button"
                  >
                    <a className="anchor-link" href="tel:91788888888">
                      91788888888
                    </a>{' '}
                    |{' '}
                    <a className="anchor-link" href="mailto:abcd1234@gmail.com">
                      abcd1234@gmail.com
                    </a>
                  </li>
                  <li
                    className="montserrat-medium font-14 text-primary-color"
                    role="button"
                  >
                    <Link
                      className="text-decoration-none text-blue"
                      to={'/profile-faqs'}
                    >
                      Frequently Asked Questions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="edit-modal overflow-scroll">
            <div
              className={`modal-content bg-light-gray-blue slide-in p-4`}
              ref={modalRef}
            >
              <button
                className="btn_close border-0 bg-transparent"
                onClick={() => setIsEditModalOpen(false)}
              >
                <img className="close-icon" src={Close} alt="Close icon" />
              </button>
              <h5 className="font-24 text-primary-color mb-42 montserrat-semibold">
                Edit Profile
              </h5>
              <form onSubmit={handleSubmitProfile(onFormSubmit)}>
                {/* Profile Image Section */}
                <div className="position-relative mb-48">
                  <div className="rounded-circle bg-light profile-pic d-flex align-items-center justify-content-center overflow-hidden">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-100 h-100 object-fit-cover"
                      />
                    ) : (
                      <span className="fw-bold fs-4 text-primary">
                        <img
                          className="h-100 w-100 user-profile-icon"
                          src={ProfileIcon}
                          alt="Default Profile"
                        />
                      </span>
                    )}
                  </div>
                  <label className="add-photo-icon d-flex align-items-center justify-content-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      hidden
                    />
                    <img
                      className="addprofile-plus-icon"
                      src={AddIcon}
                      alt="Add"
                    />
                  </label>
                </div>

                {/* Name Input */}
                <div className="mb-32">
                  <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control font-14 text-primary-color montserrat-medium"
                    {...registerProfile('name')}
                    defaultValue={UserDataAPI?.part1}
                  />
                  {/* {errorsProfile.name && (
                    <p className="text-danger">{errorsProfile.name.message}</p>
                  )} */}
                </div>

                {/* Mobile No Input */}
                <div className="mb-32">
                  <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                    Your Mobile No
                  </label>
                  <input
                    type="text"
                    className="form-control font-14 text-primary-color montserrat-medium"
                    {...registerProfile('mobile', {
                      maxLength: { value: 10, message: 'Max length is 10' },
                      pattern: {
                        value: /^\d{10}$/,
                        message: 'Enter a valid 10-digit number',
                      },
                    })}
                    maxLength={10}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    defaultValue={UserDataAPI?.part3}
                  />
                </div>

                {/* Email Input */}
                <div className="mb-32">
                  <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                    Your Email
                  </label>
                  <input
                    type="email"
                    className="form-control font-14 text-primary-color montserrat-medium"
                    {...registerProfile('email', {
                      required: 'Email is required',
                    })}
                    defaultValue={UserDataAPI?.part2}
                  />
                  {errorsProfile.email && (
                    <p className="text-danger">{errorsProfile.email.message}</p>
                  )}
                </div>

                <hr />

                <div className="">
                  <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                    Existing Password
                  </label>
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="form-control font-14 text-primary-color montserrat-medium mb-32"
                    {...registerProfile('currentPassword')}
                  />
                  {errorsProfile.currentPassword && (
                    <p className="text-danger">
                      {errorsProfile.currentPassword.message}
                    </p>
                  )}
                </div>

                {/* Change Password Section */}
                <div className="mb-32">
                  <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                    Change Password
                  </label>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="form-control font-14 text-primary-color montserrat-medium mb-32"
                    {...registerProfile('newPassword', {
                      minLength: { value: 6, message: 'Minimum 6 characters' },
                    })}
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                  />
                  {errorsProfile.newPassword && (
                    <p className="text-danger">
                      {errorsProfile.newPassword.message}
                    </p>
                  )}
                  <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                    Re-enter Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter Password"
                    className="form-control font-14 text-primary-color montserrat-medium"
                    {...registerProfile('rePassword', {
                      validate: (value) =>
                        value === passwords.newPassword ||
                        'Passwords do not match',
                    })}
                    value={passwords.rePassword}
                    onChange={handlePasswordChange}
                  />
                  {errorsProfile.rePassword && (
                    <p className="text-danger">
                      {errorsProfile.rePassword.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primaryColor montserrat-medium text-white font-14 w-100"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Send Message Modal */}
        {isMessageModalOpen && (
          <div className="message-modal">
            <div
              className={`modal-content bg-light-gray-blue slide-in p-4 h-auto`}
            >
              <button
                className="btn_close border-0 bg-transparent"
                onClick={() => setIsMessageModalOpen(false)}
              >
                <img className="close-icon" src={Close} alt="Close icon" />
              </button>
              {/* <button className="btn-close" onClick={() => setIsMessageModalOpen(false)}></button> */}
              <h5 className="font-18 montserrat-semibold text-light-color mb-8">
                Leave us a message
              </h5>
              <p className="font-12 text-primary-color montserrat-medium mb-20">
                We’re here to help—leave us a message and we’ll get back to you
                soon!
              </p>

              <form onSubmit={handleMessageSubmit}>
                <div className="row">
                  <div className="col">
                    <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control font-12 text-primary-color montserrat-medium mb-20"
                      value={UserDataAPI?.part1}
                      readOnly
                    />
                  </div>
                  <div className="col">
                    <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                      Your Email
                    </label>
                    <input
                      type="email"
                      className="form-control font-12 text-primary-color montserrat-medium mb-20"
                      value={UserDataAPI?.part2}
                      readOnly
                    />
                  </div>
                </div>

                <div className="mb-20">
                  <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                    How can we help you?
                  </label>
                  <textarea
                    className="w-100 textarea-message font-12 text-primary-color montserrat-medium"
                    placeholder="Write to us..."
                    value={messageForm.message}
                    onChange={(e) =>
                      setMessageForm({
                        ...messageForm,
                        message: e.target.value,
                      })
                    }
                    required
                  ></textarea>
                </div>

                <div className="row mb-12">
                  <label className="form-label mb-8 font-14 text-light-color montserrat-regular d-block">
                    Attachments (If any)
                  </label>

                  <div className="col-8">
                    {/* Custom File Upload Button */}
                    <label className="custom-upload-btn w-100 text-light-color font-12">
                      <img
                        src={UploadIcon}
                        alt="Upload File Icon"
                        className="me-2"
                      />
                      Attachments (up to 5 files)
                      <input
                        type="file"
                        multiple
                        hidden
                        accept="image/*" // Optional: restrict to images
                        onChange={(e) => {
                          const files = Array.from(e.target.files);

                          if (files.length > 5) {
                            alert(
                              `You can only upload up to 5 files. You selected ${files.length} files.`,
                            );
                            return;
                          }

                          // Convert each file to base64
                          Promise.all(
                            files.map((file) => {
                              return new Promise((resolve, reject) => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  resolve({ file: reader.result });
                                };
                                reader.onerror = reject;
                                reader.readAsDataURL(file);
                              });
                            }),
                          )
                            .then((base64Files) => {
                              // Assuming your messageForm has a 'files' array
                              setMessageForm((prev) => ({
                                ...prev,
                                files: base64Files,
                              }));
                            })
                            .catch((error) => {});
                        }}
                      />
                    </label>

                    {/* Show File Names with Remove Option */}
                    {messageForm.files.length > 0 && (
                      <ul className="mt-2 file-list d-flex">
                        {messageForm.files.map((file, index) => {
                          const ext = file?.file
                            ?.split('.')
                            ?.pop()
                            ?.toLowerCase();

                          // Choose icon based on file type
                          let fileIcon;
                          if (['jpg', 'jpeg', 'png', 'gif']?.includes(ext)) {
                            fileIcon = URL?.createObjectURL(file); // for previewing the image itself
                          } else {
                            fileIcon = UploadFile;
                          }

                          return (
                            <li
                              key={index}
                              className="uploaded-files-list position-relative mb-2 mt-3"
                            >
                              <div className="">
                                <img
                                  className="flie-icon"
                                  src={fileIcon}
                                  alt={ext}
                                />
                                {/* <span className="text-truncate" style={{ maxWidth: '200px' }}>{file.name}</span> */}
                              </div>
                              <button
                                type="button"
                                className="btn position-absolute btn-delete-file"
                                onClick={() => {
                                  const updatedFiles = [...messageForm.files];
                                  updatedFiles.splice(index, 1);
                                  setMessageForm({
                                    ...messageForm,
                                    files: updatedFiles,
                                  });
                                }}
                              >
                                <img
                                  className="remove-icon"
                                  src={Close}
                                  alt="Remove File Icon"
                                />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>

                  <div className="col-4">
                    <button
                      type="submit"
                      className="btn w-100 btn-primaryColor text-white font-14 montserrat-medium"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Meteors Convert Modal */}
        {ismeteroModalOpen && (
          <div className="message-modal">
            <div
              className={`modal-content h-auto bg-light-gray-blue slide-in p-4`}
            >
              <button
                className="btn_close border-0 bg-transparent"
                onClick={() => setIsmeteroModalOpen(false)}
              >
                <img className="close-icon" src={Close} alt="Close icon" />
              </button>
              <h5 className="font-18 montserrat-semibold text-light-color mb-8">
                My Wallet
              </h5>
              <p className="font-12 text-primary-color montserrat-medium mb-20">
                Convert your meteors and stars below
              </p>

              <form onSubmit={handleSubmitMeteor(onMeteorConvert)}>
                <div className="row">
                  <div className="col-lg-12">
                    <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                      Your available meteors
                    </label>

                    <input
                      type="number" // Changed to number for better number handling
                      {...registerMeteor('meteors', {
                        required: 'This field is required',
                        valueAsNumber: true,
                        validate: (value) =>
                          (value >= 0 && value <= ContextHomeDataAPI?.part2) ||
                          `Must be a non-negative number and less than or equal to ${ContextHomeDataAPI?.part2}`,
                      })}
                      onChange={(e) => {
                        const value = Math.min(
                          parseInt(e.target.value) || 0,
                          ContextHomeDataAPI?.part2,
                        );
                        setCalculatedStars(
                          Math.floor(
                            value /
                              (ContextFaqsDataAPI?.conversion_data[0]
                                ?.conversion_rates?.meteor_to_star || 1),
                          ),
                        );
                      }}
                      className="form-control font-12 text-primary-color montserrat-medium mb-20"
                      placeholder="Enter number of meteors"
                      max={ContextHomeDataAPI?.part2} // Prevents user from entering more than 8000
                    />
                    {errorsMeteor.meteors && (
                      <p className="text-danger font-12">
                        {errorsMeteor.meteors.message}
                      </p>
                    )}
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                      Stars you’ll get after conversion
                    </label>
                    <input
                      className="form-control meterStarConvrt font-12  montserrat-medium mb-20"
                      type="text"
                      value={calculatedStars}
                      readOnly
                      {...registerMeteor('stars')}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      {...registerMeteor('terms', { required: true })}
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label montserrat-medium font-12 text-light-gray"
                      htmlFor="flexCheckChecked"
                    >
                      I agree to the conversion terms
                    </label>
                    {errorsMeteor.terms && (
                      <p className="text-danger font-12">
                        You must agree to the terms
                      </p>
                    )}
                  </div>
                  <span className="text-blue montserrat-medium font-12">
                    T&C applied
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-100 mt-3 background-text-blue text-white py-2 border-0 rounded-5"
                >
                  Convert
                </button>
              </form>
            </div>
          </div>
        )}
        {/* Stars Convert Modal */}
        {isStarModalOpen && (
          <div className="message-modal">
            <div
              className={`modal-content h-auto bg-light-gray-blue slide-in p-4`}
            >
              <button
                className="btn_close border-0 bg-transparent"
                onClick={() => setIsStarModalOpen(false)}
              >
                <img className="close-icon" src={Close} alt="Close icon" />
              </button>
              <h5 className="font-18 montserrat-semibold text-light-color mb-8">
                My Wallet
              </h5>
              <p className="font-12 text-primary-color montserrat-medium mb-20">
                Convert your Stars and stars below
              </p>

              <form onSubmit={handleSubmitStar(onStarConvert)}>
                <div className="row">
                  <div className="col-lg-12">
                    <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                      Your available Stars
                    </label>

                    <input
                      type="number" // Changed to number for better number handling
                      {...registerMeteor('stars', {
                        required: 'This field is required',
                        valueAsNumber: true,
                        validate: (value) =>
                          (value >= 0 && value <= ContextHomeDataAPI?.part1) ||
                          `Must be a non-negative number and less than or equal to ${ContextHomeDataAPI?.part1}`,
                      })}
                      onChange={(e) => {
                        const value = Math.min(
                          parseInt(e.target.value) || 0,
                          ContextHomeDataAPI?.part1,
                        );
                        setCalculatedStars(
                          Math.floor(
                            value /
                              (ContextFaqsDataAPI?.conversion_data[0]
                                ?.conversion_rates?.meteor_to_star || 1),
                          ),
                        );
                      }}
                      className="form-control font-12 text-primary-color montserrat-medium mb-20"
                      placeholder="Enter number of stars"
                      max={ContextHomeDataAPI?.part1} // Prevents user from entering more than 8000
                    />
                    {errorsStar.stars && (
                      <p className="text-danger font-12">
                        {errorsStar.stars.message}
                      </p>
                    )}
                  </div>
                  <div className="col-lg-12">
                    <label className="form-label mb-8 font-14 text-light-color montserrat-regular">
                      Stars you’ll get after conversion
                    </label>
                    <input
                      className="form-control meterStarConvrt font-12  montserrat-medium mb-20"
                      type="text"
                      value={calculatedCash}
                      readOnly
                      {...registerStar('cash')}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      {...registerStar('terms', { required: true })}
                      id="flexCheckChecked"
                    />
                    <label
                      className="form-check-label montserrat-medium font-12 text-light-gray"
                      htmlFor="flexCheckChecked"
                    >
                      I agree to the conversion terms
                    </label>
                    {errorsStar.terms && (
                      <p className="text-danger font-12">
                        You must agree to the terms
                      </p>
                    )}
                  </div>
                  <span className="text-blue montserrat-medium font-12">
                    T&C applied
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-100 mt-3 background-text-blue text-white py-2 border-0 rounded-5"
                >
                  Convert
                </button>
              </form>
            </div>
          </div>
        )}
        {/* contratulation Modal */}
        {contratsModal && (
          <div className="message-modal">
            <div
              className={`modal-content h-auto bg-light-gray-blue slide-in p-4`}
            >
              <button
                className="btn_close border-0 bg-transparent"
                onClick={() => setcontratsModal(false)}
              >
                <img className="close-icon" src={Close} alt="Close icon" />
              </button>

              <h5 className="font-18 montserrat-semibold text-blue mt-4 mb-8 text-center">
                Congratulations!!
              </h5>
              <p className="font-12 text-center text-blue montserrat-medium mb-20">
                You have successfully converted XX Meteors into YY Stars
              </p>
              <div className="row justify-content-around my-4">
                <div className="col-lg-3 background-light-purple rounded-3 px-3 py-2 text-center position-relative">
                  <img
                    className="position-absolute profile-congrt-img"
                    src={meteor}
                    alt=""
                  />
                  <h2 className="font-16 montserrat-semibold text-blue">X</h2>
                  <h2 className="font-12 montserrat-semibold text-blue">
                    Meteors
                  </h2>
                </div>
                <div className="col-lg-3 background-light-purple rounded-3 px-3 py-2 text-center position-relative">
                  <img
                    className="position-absolute profile-congrt-img"
                    src={star}
                    alt=""
                  />
                  <h2 className="font-16 montserrat-semibold text-blue">Y</h2>
                  <h2 className="font-12 montserrat-semibold text-blue">
                    Stars
                  </h2>
                </div>
                <div className="col-lg-3 background-light-purple rounded-3 px-3 py-2 text-center position-relative">
                  <img
                    className="position-absolute profile-congrt-img"
                    src={coin}
                    alt=""
                  />
                  <h2 className="font-16 montserrat-semibold text-blue">Z</h2>
                  <h2 className="font-12 montserrat-semibold text-blue">
                    Points
                  </h2>
                </div>{' '}
              </div>
              <button className="font-14 montserrat-medium text-blue rounded-5 py-2 bg-white border-blue mb-2">
                Convert stars into cash
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
