import { useState } from 'react';
import './rewardHistory.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { PiFadersHorizontal } from 'react-icons/pi';
import { IoIosArrowBack } from 'react-icons/io';
const RewardHistory = ({ showHistory, MyRewardDataAPI }) => {
  console.log('MyRewardDataAPI: ', MyRewardDataAPI);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTable, setSelectedTable] = useState('History');

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    const totalData = getSelectedData();
    const totalPages = Math.ceil(totalData.length / rowsPerPage);
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number.parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleToggle = () => {
    showHistory(false);
  };

  const getSelectedData = () => {
    if (selectedTable === 'Referral') {
      return MyRewardDataAPI?.part10 || [];
    } else if (selectedTable === 'Product') {
      return MyRewardDataAPI?.part9 || [];
    }
    return MyRewardDataAPI?.part5 || [];
  };

  // Calculate displayed data based on pagination
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // const displayedData = MyRewardDataAPI?.part5?.slice(startIndex, endIndex);
  const displayedData = getSelectedData().slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const StatCard = ({ number, title, index }) => (
    <div
      className={`stat-card ${index == 4 ? '' : 'border-bottom border-1 border-white'} py-4 px-5 mx-3 text-center`}
    >
      <div className="font-24 text-blue montserrat-bold py-2">{number}</div>
      <div className="font-16 text-blue montserrat-semibold py-2">{title}</div>
    </div>
  );

  const renderTableHeader = () => {
    if (selectedTable === 'Referral') {
      return (
        <tr>
          <th className="px-4 text-center font-14 montserrat-semibold">
            Referred
          </th>
          <th className="px-4 text-center font-14 montserrat-semibold">Date</th>
          <th className="px-4 text-center font-14 montserrat-semibold">
            Earned
          </th>
          <th className="px-4 text-center font-14 montserrat-semibold">
            Status
          </th>
        </tr>
      );
    } else if (selectedTable === 'Product') {
      return (
        <tr>
          <th className="px-4 text-center font-14 montserrat-semibold">Name</th>
          <th className="px-4 text-center font-14 montserrat-semibold">Date</th>
          <th className="px-4 text-center font-14 montserrat-semibold">
            Amount
          </th>
          <th className="px-4 text-center font-14 montserrat-semibold">End</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th className="px-4 text-center font-14 montserrat-semibold">
            Reward Type
          </th>
          <th className="px-4 text-center font-14 montserrat-semibold">Date</th>
          <th className="px-4 text-center font-14 montserrat-semibold">
            Status
          </th>
          <th className="px-4 text-center font-14 montserrat-semibold">
            Earnings/Redemption
          </th>
        </tr>
      );
    }
  };

  const renderTableRow = (row, index) => {
    if (selectedTable === 'Referral') {
      return (
        <tr key={index} className="bg-transparent text-center">
          <td className="py-3 text-center px-4 bg-transparent font-16 montserrat-semibold">
            {row?.referred_to}
          </td>
          <td className="py-3 text-center px-4 bg-transparent font-16 montserrat-semibold">
            {row?.date}
          </td>
          <td className="py-3 text-center px-4 bg-transparent font-16 montserrat-semibold">
            {row?.earning}
          </td>
          <td className="py-3 text-center px-4 bg-transparent font-16 montserrat-semibold">
            {row?.status}
          </td>
        </tr>
      );
    } else if (selectedTable === 'Product') {
      return (
        <tr key={index} className="bg-transparent text-center">
          <td className="py-3 text-center px-4 bg-transparent font-16 montserrat-semibold">
            {row?.product_name}
          </td>
          <td className="py-3 text-center px-4 bg-transparent font-16 montserrat-semibold">
            {row?.date}
          </td>
          <td className="py-3 text-center px-4 bg-transparent font-16 montserrat-semibold">
            {row?.price}
          </td>
          <td className="py-3 text-center px-4 bg-transparent font-16 montserrat-semibold">
            {row?.expires_in}
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={index} className="bg-transparent text-center">
          <td className="py-3 text-center bg-transparent px-4">
            <div className="d-flex justify-content-center align-items-center font-16 montserrat-semibold">
              {row?.earned_by_action}
            </div>
          </td>
          <td className="py-3 text-center px-4 bg-transparent font-16 montserrat-semibold">
            {row?.referred_on}
          </td>
          <td
            className={`py-3 px-4 ${row?.transaction_type == 'credit' ? 'text-green' : 'text-danger'} text-center bg-transparent font-18 montserrat-semibold`}
          >
            {row?.transaction_type || '-'}
          </td>
          <td className="py-3 text-center bg-transparent px-4">
            <span className="py-2 px-3 rounded-2 btn-green font-14 montserrat-medium text-blue d-flex justify-content-center align-items-center">
              <span className="dot dot-green rounded-circle me-3"></span>
              {row?.earned_meteors}
            </span>
          </td>
        </tr>
      );
    }
  };

  return (
    <section className="hero-section mb-5">
      <div className="inner-div">
        <div className="container-fluid px-5">
          <div
            onClick={handleToggle}
            className="back text-white my-3 d-flex align-items-center font-14 montserrat-medium"
          >
            <span className="cursor-pointer">
              <IoIosArrowBack /> Back
            </span>
          </div>
          <div className="head d-flex  justify-content-between my-3">
            <h2 className="font-32 space-grotesk-bold text-blue">
              My Reward History
            </h2>
            <span>
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  className="custom-filter font-14 montserrat-medium"
                >
                  {selectedTable} Table
                  <PiFadersHorizontal className="ms-2 text-blue font-24" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-filter">
                  <Dropdown.Item onClick={() => setSelectedTable('History')}>
                    History Table
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelectedTable('Referral')}>
                    Referral Table
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSelectedTable('Product')}>
                    Products Table
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-4">
              <div className="sidebar">
                <StatCard
                  index="1"
                  number={MyRewardDataAPI?.part3}
                  title="Total Rewards"
                />
                <StatCard
                  index="2"
                  number={MyRewardDataAPI?.part7}
                  title="Total Redeemed"
                />
                <StatCard
                  index="3"
                  number={MyRewardDataAPI?.part2}
                  title="Total Meteors"
                />
                <StatCard
                  index="4"
                  number={MyRewardDataAPI?.part1}
                  title="Total Stars"
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9 col-md-8">
              <div className="main-content">
                <div className="table-container">
                  <table className="table table-hover text-start mb-0">
                    <thead>{renderTableHeader()}</thead>
                    <tbody>
                      {displayedData?.map((row, index) =>
                        renderTableRow(row, index),
                      )}

                      {/* {displayedData?.length > 0 ? (
                        displayedData?.map((row, index) => renderTableRow(row, index))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-muted">
                            No data available.
                          </td>
                        </tr>
                      )} */}
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
                    className="rows-select bg-transparent"
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
