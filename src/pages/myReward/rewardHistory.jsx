import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './rewardHistory.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { PiFadersHorizontal } from 'react-icons/pi';
import { IoIosArrowBack } from 'react-icons/io';
const RewardHistory = ({ showHistory, MyRewardDataAPI }) => {
  console.log('MyRewardDataAPI: ', MyRewardDataAPI);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil((MyRewardDataAPI?.part5)?.length / rowsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number.parseInt(e.target.value));
    setCurrentPage(1);
  };

  const HandleToggle = () => {
    showHistory(false);
  };

  // Calculate displayed data based on pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
   const displayedData = (MyRewardDataAPI?.part5)?.slice(startIndex, endIndex);


  // const displayedData = (() => {
  //   try {
  //     const fixedString = MyRewardDataAPI?.part5
  //       ?.replace(/'/g, '"') // Replace single quotes with double quotes
  //       ?.replace(/\bNone\b/g, 'null') // Replace Python None with JSON null
  //       ?.replace(/\bTrue\b/g, 'true') // If needed, convert booleans
  //       ?.replace(/\bFalse\b/g, 'false')
  //       ?.replace(/datetime\.datetime\([^)]*\)/g, '"2025-01-01"');

  //     return JSON?.parse(fixedString) || [];
  //   } catch (error) {
  //     console.error('JSON parse error:', error);
  //     return [];
  //   }
  // })();

  // console.log(displayedData, "llml,l,")




  const StatCard = ({ number, title, index }) => (
    <div
      className={`stat-card ${index == 4 ? '' : 'border-bottom border-1 border-white'} py-4 px-5 mx-3 text-center`}
    >
      <div className="font-24 text-blue montserrat-bold py-2">{number}</div>
      <div className="font-16 text-blue montserrat-semibold py-2">{title}</div>
    </div>
  );

  const RewardRow = ({ reward }) => (

    <tr className="bg-transparent">
      <td className="py-3 bg-transparent px-4">
        <div className="d-flex align-items-center font-16 montserrat-semibold">
          {/* <span className={`reward-dot me-2 ${reward.type}`}></span> */}
          {reward?.earned_by_action}
        </div>
      </td>
      <td className="py-3 px-4 bg-transparent font-16 montserrat-semibold">
        {reward?.referred_on}
      </td>
      <td
        className="py-3 px-4 expiry-text-color bg-transparent font-16 montserrat-semibold"
      // style={{ color: reward.expiryDate === '-' ? '#6c757d' : '#dc3545' }}
      >
        {reward.expiryDate || '-'}
      </td>
      <td className="py-3 px-4 bg-transparent d-flex align-items-center">
        <span
          className={`py-2 px-3 rounded-2 btn-green font-14 montserrat-medium text-blue d-flex align-items-center`}
        >
          <span className={`dot dot-green rounded-circle me-3`}></span>
          {reward?.earned_meteors}
        </span>
      </td>
    </tr>
  );

  return (
    <section className="hero-section mb-5">
      <div className="inner-div">
        <div className="container-fluid px-5">
          <div onClick={HandleToggle} className="back text-white my-3 d-flex align-items-center font-14 montserrat-medium">
            <span className='cursor-pointer'>
            <IoIosArrowBack /> Back
            </span>
          </div>
          <div className="head d-flex  justify-content-between my-3">
            <h2 className="font-32 space-grotesk-bold text-blue">
              My Reward History
            </h2>
            <span>

              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className='custom-filter font-14 montserrat-medium'>
                  Filter
                  <PiFadersHorizontal className='ms-2 text-blue font-24' />
                </Dropdown.Toggle>

                <Dropdown.Menu className='custom-filter'>
                  <Dropdown.Item href="#/action-1">Date</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Earned</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Redeemed</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-4">
              <div className="sidebar">
                <StatCard index="1" number={MyRewardDataAPI?.part3} title="Total Rewards" />
                <StatCard index="2" number={MyRewardDataAPI?.part7} title="Total Redeemed" />
                <StatCard index="3" number={MyRewardDataAPI?.part2} title="Total Meteors" />
                <StatCard index="4" number={MyRewardDataAPI?.part1} title="Total Stars" />
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9 col-md-8">
              <div className="main-content">
                <div className="table-container">
                  <table className="table table-hover text-start mb-0">
                    <thead className="">
                      <tr className="">
                        <th className="px-4 font-14 montserrat-semibold">
                          Reward Type
                        </th>
                        <th className="px-4 font-14 montserrat-semibold">
                          Date
                        </th>
                        <th className="px-4 font-14 montserrat-semibold">
                          Expiry Date
                        </th>
                        <th className="px-4 font-14 montserrat-semibold">
                          Earnings/Redemption
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {displayedData?.map((reward, index) => (
                        <RewardRow key={index} reward={reward} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Pagination Controls */}
              <div className="pagination-controls mt-4 d-flex justify-content-between align-items-center">
                <div className="space"></div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-pagination me-2 font-14 montserrat-medium"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-pagination background-text-blue text-white active font-14 montserrat-medium"
                    onClick={handleNext}
                  // disabled={
                  //   currentPage >= Math.ceil(rewardsData.length / rowsPerPage)
                  // }
                  >
                    Next
                  </button>
                </div>

                <div className="d-flex align-items-center">
                  <span className="me-2 text-muted">Rows per page:</span>
                  <select
                    className="rows-select bg-transparent   "
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardHistory;
