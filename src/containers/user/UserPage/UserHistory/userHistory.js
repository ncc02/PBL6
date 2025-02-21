import UserTab from "containers/user/UserTab/userTab";
import { memo, useEffect, useState } from "react";
import "./userHistory.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {
  getAppoinment,
  ratingAppointment,
  statusAppoinment,
} from "service/UserService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import Moment from "react-moment";
import { FaRegCalendarAlt } from "react-icons/fa";
import avatar from "../../../../assets/avatar.jpg";
import { toast } from "react-toastify";
const UserHistory = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [view, setView] = useState(false);
  const handleCloseView = () => setView(false);
  const handleShowView = () => setView(true);
  const [showSchedule, setShowSchedule] = useState(false);
  const handleCloseSchedule = () => setShowSchedule(false);
  const handleShowSchedule = () => setShowSchedule(true);
  const [showScheduleComing, setShowScheduleComing] = useState(false);
  const handleCloseScheduleComing = () => setShowScheduleComing(false);
  const handleShowScheduleComing = () => setShowScheduleComing(true);
  const [showRating, setShowRating] = useState(false);
  const handleCloseRating = () => setShowRating(false);
  const handleShowRating = () => setShowRating(true);
  const [loading, setLoading] = useState(true);
  const [scheduleBook, setScheduleBook] = useState([]);
  const [scheduleComing, setScheduleComing] = useState([]);
  const [schedulePassed, setSchedulePassed] = useState([]);
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState([]);
  const [hospital, setHospital] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [idSchedule, setIdSchedule] = useState("");
  const [star, setStar] = useState(0);
  console.log(idSchedule);
  const getBooking = async () => {
    let res = await getAppoinment();
    if (res) {
      console.log(res);
      setLoading(false);
      setScheduleBook(res?.not_confirm);
      setScheduleComing(res?.coming);
      setSchedulePassed(res?.confirmed);
    }
  };
  const formatTime = (time) => {
    if (time) {
      const timeParts = time.split(":");
      return `${timeParts[0]}:${timeParts[1]}`;
    }
    return "";
  };
  const cancelSchedule = async (id) => {
    let res = await statusAppoinment(id, "2");
    if (res?.date) {
      console.log(res);
      toast.success("Hủy thành công!");
    } else {
      toast.error("Có lỗi trong việc xử lý!");
    }
  };
  const vote = async (id) => {
    let res = await ratingAppointment(id, rating);
    if (res?.rating) {
      console.log(res);
      getBooking();
      toast.success("Vote thành công!");
    } else if (res?.detail) {
      toast.error("Lịch hẹn này đã được vote");
    }
  };
  useEffect(() => {
    getBooking();
  }, []);
  useEffect(() => {
    getBooking();
  }, [update]);
  return (
    <div className="UserPageContainer">
      <div className="UserPageContent">
        <UserTab></UserTab>
        {loading ? (
          <div className="lds lds-user">
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className="history">
            <h1>Lịch sử đặt chỗ</h1>
            <div className="history__tab">
              <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="Lịch sử đặt hẹn">
                  {scheduleBook.length > 0 ? (
                    <div>
                      <table class="table align-middle mb-0 bg-white history__tab_table">
                        <thead class="bg-light">
                          <tr>
                            <th style={{ minWidth: "210px" }}>Tên bác sĩ</th>
                            <th>Bệnh viện</th>
                            <th>Thời gian</th>
                            <th style={{ minWidth: "120px" }}>Địa điểm</th>
                            <th className="history__tab_table_title">
                              Hành động
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {scheduleBook &&
                            scheduleBook.map((item, index) => {
                              return (
                                <tr>
                                  <td key={index}>
                                    <div class="d-flex align-items-center">
                                      <img
                                        src={
                                          item?.schedule_doctor?.doctor?.account
                                            ?.avatar || avatar
                                        }
                                        alt=""
                                        class="rounded-circle"
                                        style={{
                                          width: "45px",
                                          height: "45px",
                                        }}
                                      />
                                      <div class="ms-3">
                                        <p class="fw-bold mb-0">
                                          {item?.schedule_doctor?.doctor
                                            ?.name || "Tên bác sĩ"}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="d-flex align-items-center">
                                      <div class="ms-3">
                                        <p class=" mb-0 table__name">
                                          {item?.schedule_doctor?.doctor
                                            ?.hospital?.name || "Tên bệnh viện"}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p class="fw-normal mb-1">
                                      {formatTime(
                                        `${item?.schedule_doctor?.schedule?.start}`,
                                      )}
                                      -
                                      {formatTime(
                                        `${item?.schedule_doctor?.schedule?.end}`,
                                      )}
                                    </p>
                                    <p class="text-muted mb-0">
                                      <Moment format="DD/MM/YYYY">
                                        {item?.date}
                                      </Moment>
                                    </p>
                                  </td>
                                  <td>
                                    <p
                                      class="fw-normal mb-1 table__address"
                                      style={{ flexWrap: "nowrap" }}
                                    >
                                      {
                                        item?.schedule_doctor?.doctor?.hospital
                                          ?.address
                                      }
                                    </p>
                                  </td>
                                  <td className="d-flex table__action">
                                    <button
                                      type="button"
                                      class="btn btn-link btn-sm btn-rounded"
                                      onClick={() => {
                                        handleShow();
                                        setIdSchedule(item?.id);
                                      }}
                                    >
                                      Hủy
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-link btn-sm btn-rounded"
                                      onClick={() => {
                                        handleShowView();
                                        setName(
                                          item?.schedule_doctor?.doctor?.name,
                                        );
                                        setSpecialty(
                                          item?.schedule_doctor?.doctor
                                            ?.specialties,
                                        );
                                        setHospital(
                                          item?.schedule_doctor?.doctor
                                            ?.hospital?.name,
                                        );
                                        setTimeStart(
                                          item?.schedule_doctor?.schedule
                                            ?.start,
                                        );
                                        setTimeEnd(
                                          item?.schedule_doctor?.schedule?.end,
                                        );
                                        setDate(item?.date);
                                        setAddress(
                                          item?.schedule_doctor?.doctor
                                            ?.hospital?.address,
                                        );
                                      }}
                                    >
                                      Xem
                                    </button>
                                  </td>
                                  <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                      <Modal.Title>
                                        Bạn có muốn hủy lịch hẹn không!
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      Quá trình này không thể hoàn tác!
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant="secondary"
                                        onClick={handleClose}
                                      >
                                        Đóng
                                      </Button>
                                      <Button
                                        variant="primary"
                                        onClick={() => {
                                          handleClose();
                                          cancelSchedule(idSchedule);
                                          setUpdate(!update);
                                          getBooking();
                                        }}
                                      >
                                        Xác nhận hủy
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                  <Modal show={view} onHide={handleCloseView}>
                                    <Modal.Header closeButton>
                                      <Modal.Title>
                                        Chi tiết lịch hẹn
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <div className="view__schedule">
                                        <div className="view__content">
                                          <p className="view__text">
                                            Tên bác sĩ :
                                          </p>
                                          <p>{name}</p>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Chuyên khoa :
                                          </p>
                                          <div className="d-flex">
                                            {specialty.map((item, index) => {
                                              return (
                                                <p>
                                                  {item?.specialty?.name},{""}
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Bệnh viện :
                                          </p>
                                          <p>{hospital}</p>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Thời gian :
                                          </p>
                                          <p>
                                            {formatTime(timeStart)}-
                                            {formatTime(timeEnd)} | {date}
                                          </p>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Địa điểm :
                                          </p>
                                          <p>{address}</p>
                                        </div>
                                      </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant="secondary"
                                        onClick={handleCloseView}
                                      >
                                        Đóng
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      {/* <div className="history__pagination">
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel=">"
                          // onPageChange={handlePageClick}
                          pageRangeDisplayed={5}
                          pageCount={3}
                          previousLabel="<"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item previous"
                          previousLinkClassName="page-link"
                          nextClassName="page-item previous"
                          nextLinkClassName="page-link"
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          containerClassName="pagination"
                          activeClassName="active active-pagination"
                        />
                      </div> */}
                    </div>
                  ) : (
                    <div className="no__schedule">
                      <div className="no__schedule_icon">
                        <FaRegCalendarAlt></FaRegCalendarAlt>
                      </div>
                      <p> Không có lịch sử đặt hẹn</p>
                    </div>
                  )}
                </Tab>
                <Tab
                  eventKey="schedule"
                  title="Lịch hẹn sắp đến"
                  className="history__tab_title"
                >
                  {scheduleComing.length > 0 ? (
                    <div>
                      <table class="table align-middle mb-0 bg-white history__tab_table">
                        <thead class="bg-light">
                          <tr>
                            <th style={{ minWidth: "210px" }}>Tên bác sĩ</th>
                            <th>Bệnh viện</th>
                            <th>Thời gian</th>
                            <th style={{ minWidth: "120px" }}>Địa điểm</th>
                            <th className="history__tab_table_title">
                              Hành động
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {scheduleComing &&
                            scheduleComing.length > 0 &&
                            scheduleComing.map((item, index) => {
                              return (
                                <tr>
                                  <td key={index}>
                                    <div class="d-flex align-items-center">
                                      <img
                                        src={
                                          item?.schedule_doctor?.doctor?.account
                                            ?.avatar || avatar
                                        }
                                        alt=""
                                        class="rounded-circle"
                                        style={{
                                          width: "45px",
                                          height: "45px",
                                        }}
                                      />
                                      <div class="ms-3">
                                        <p class="fw-bold mb-0">
                                          {item?.schedule_doctor?.doctor
                                            ?.name || "Tên bác sĩ"}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="d-flex align-items-center">
                                      <div class="ms-3">
                                        <p class=" mb-0 table__name">
                                          {item?.schedule_doctor?.doctor
                                            ?.hospital?.name || "Tên bệnh viện"}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p class="fw-normal mb-1">
                                      {formatTime(
                                        `${item?.schedule_doctor?.schedule?.start}`,
                                      )}
                                      -
                                      {formatTime(
                                        `${item?.schedule_doctor?.schedule?.end}`,
                                      )}
                                    </p>
                                    <p class="text-muted mb-0">
                                      <Moment format="DD/MM/YYYY">
                                        {item?.date}
                                      </Moment>
                                    </p>
                                  </td>
                                  <td>
                                    <p
                                      class="fw-normal mb-1 table__address"
                                      style={{ flexWrap: "nowrap" }}
                                    >
                                      {
                                        item?.schedule_doctor?.doctor?.hospital
                                          ?.address
                                      }
                                    </p>
                                  </td>
                                  <td style={{ minWidth: "164px" }}>
                                    <button
                                      type="button"
                                      class="btn btn-link btn-sm btn-rounded"
                                      onClick={handleShowScheduleComing}
                                      style={{ transform: "translateX(26px)" }}
                                    >
                                      Xem
                                    </button>
                                  </td>
                                  {/* Xem lịch hẹn */}
                                  <Modal
                                    show={showScheduleComing}
                                    onHide={handleCloseScheduleComing}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>
                                        Chi tiết lịch hẹn
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <div className="view__schedule">
                                        <div className="view__content">
                                          <p className="view__text">
                                            Tên bác sĩ :
                                          </p>
                                          <p>{name}</p>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Chuyên khoa :
                                          </p>
                                          <div className="d-flex">
                                            {specialty.map((item, index) => {
                                              return (
                                                <p>
                                                  {item?.specialty?.name},{""}
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Bệnh viện :
                                          </p>
                                          <p>{hospital}</p>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Thời gian :
                                          </p>
                                          <p>
                                            {formatTime(timeStart)}-
                                            {formatTime(timeEnd)} | {date}
                                          </p>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Địa điểm :
                                          </p>
                                          <p>{address}</p>
                                        </div>
                                      </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant="secondary"
                                        onClick={handleCloseScheduleComing}
                                      >
                                        Đóng
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      {/* <div className="history__pagination">
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel=">"
                          // onPageChange={handlePageClick}
                          pageRangeDisplayed={5}
                          pageCount={3}
                          previousLabel="<"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item previous"
                          previousLinkClassName="page-link"
                          nextClassName="page-item previous"
                          nextLinkClassName="page-link"
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          containerClassName="pagination"
                          activeClassName="active active-pagination"
                        />
                      </div> */}
                    </div>
                  ) : (
                    <div className="no__schedule">
                      <div className="no__schedule_icon">
                        <FaRegCalendarAlt></FaRegCalendarAlt>
                      </div>
                      <p> Không có lịch hẹn nào sắp đến</p>
                    </div>
                  )}
                </Tab>
                <Tab
                  eventKey="profile"
                  title="Lịch hẹn đã hoàn thành"
                  className="history__tab_title"
                >
                  {schedulePassed.length > 0 ? (
                    <div>
                      <table class="table align-middle mb-0 bg-white history__tab_table">
                        <thead class="bg-light">
                          <tr>
                            <th style={{ minWidth: "210px" }}>Tên bác sĩ</th>
                            <th>Bệnh viện</th>
                            <th>Thời gian</th>
                            <th style={{ minWidth: "120px" }}>Địa điểm</th>
                            <th className="history__tab_table_title">
                              Hành động
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedulePassed &&
                            schedulePassed.map((item, index) => {
                              return (
                                <tr>
                                  <td key={index}>
                                    <div class="d-flex align-items-center">
                                      <img
                                        src={
                                          item?.schedule_doctor?.doctor?.account
                                            ?.avatar || avatar
                                        }
                                        alt=""
                                        class="rounded-circle"
                                        style={{
                                          width: "45px",
                                          height: "45px",
                                        }}
                                      />
                                      <div class="ms-3">
                                        <p class="fw-bold mb-0">
                                          {item?.schedule_doctor?.doctor
                                            ?.name || "Tên bác sĩ"}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div class="d-flex align-items-center">
                                      <div class="ms-3">
                                        <p class=" mb-0 table__name">
                                          {item?.schedule_doctor?.doctor
                                            ?.hospital?.name || "Tên bệnh viện"}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <p class="fw-normal mb-1">
                                      {formatTime(
                                        `${item?.schedule_doctor?.schedule?.start}`,
                                      )}
                                      -
                                      {formatTime(
                                        `${item?.schedule_doctor?.schedule?.end}`,
                                      )}
                                    </p>
                                    <p class="text-muted mb-0">
                                      <Moment format="DD/MM/YYYY">
                                        {item?.date}
                                      </Moment>
                                    </p>
                                  </td>
                                  <td>
                                    <p
                                      class="fw-normal mb-1 table__address"
                                      style={{ flexWrap: "nowrap" }}
                                    >
                                      {
                                        item?.schedule_doctor?.doctor?.hospital
                                          ?.address
                                      }
                                    </p>
                                  </td>
                                  <td className="d-flex table__action">
                                    {item?.rating > 0 ? (
                                      <button
                                        type="button"
                                        class="btn btn-link btn-sm btn-rounded"
                                        disabled
                                      >
                                        Voted
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        class="btn btn-link btn-sm btn-rounded"
                                        onClick={() => {
                                          handleShowRating();
                                          setIdSchedule(item?.id);
                                        }}
                                      >
                                        Vote
                                      </button>
                                    )}
                                    {/* <button
                                      type="button"
                                      class="btn btn-link btn-sm btn-rounded"
                                      onClick={() => {
                                        handleShowRating();
                                        setIdSchedule(item?.id);
                                      }}
                                    >
                                      Vote
                                    </button> */}
                                    <button
                                      type="button"
                                      class="btn btn-link btn-sm btn-rounded"
                                      onClick={() => {
                                        handleShowSchedule();
                                        setName(
                                          item?.schedule_doctor?.doctor?.name,
                                        );
                                        setSpecialty(
                                          item?.schedule_doctor?.doctor
                                            ?.specialties,
                                        );
                                        setHospital(
                                          item?.schedule_doctor?.doctor
                                            ?.hospital?.name,
                                        );
                                        setTimeStart(
                                          item?.schedule_doctor?.schedule
                                            ?.start,
                                        );
                                        setTimeEnd(
                                          item?.schedule_doctor?.schedule?.end,
                                        );
                                        setDate(item?.date);
                                        setAddress(
                                          item?.schedule_doctor?.doctor
                                            ?.hospital?.address,
                                        );
                                        setStar(item?.rating);
                                      }}
                                    >
                                      Xem
                                    </button>
                                  </td>
                                  {/* Xác nhận hủy */}
                                  <Modal
                                    show={showRating}
                                    onHide={handleCloseRating}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>
                                        Hãy cho chúng tôi biết trải nghiệm của
                                        bạn!
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <div className="schedule__rating">
                                        <ReactStars
                                          count={5}
                                          onChange={setRating}
                                          size={50}
                                          activeColor="#ffd700"
                                        />
                                      </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant="secondary"
                                        onClick={handleCloseRating}
                                      >
                                        Đóng
                                      </Button>
                                      <Button
                                        variant="primary"
                                        onClick={() => {
                                          handleCloseRating();
                                          vote(idSchedule);
                                        }}
                                      >
                                        Xác nhận
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                  {/* Xem lịch hẹn */}
                                  <Modal
                                    show={showSchedule}
                                    onHide={handleCloseSchedule}
                                  >
                                    <Modal.Header closeButton>
                                      <Modal.Title>
                                        Chi tiết lịch hẹn
                                      </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <div className="view__schedule">
                                        <div className="view__content">
                                          <p className="view__text">
                                            Tên bác sĩ :
                                          </p>
                                          <p>{name}</p>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Chuyên khoa :
                                          </p>
                                          <div className="d-flex">
                                            {specialty.map((item, index) => {
                                              return (
                                                <p>
                                                  {item?.specialty?.name},{""}
                                                </p>
                                              );
                                            })}
                                          </div>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Bệnh viện :
                                          </p>
                                          <p>{hospital}</p>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Thời gian :
                                          </p>
                                          <p>
                                            {formatTime(timeStart)}-
                                            {formatTime(timeEnd)} | {date}
                                          </p>
                                        </div>
                                        <div className="view__content">
                                          <p className="view__text">
                                            Địa điểm :
                                          </p>
                                          <p>{address}</p>
                                        </div>
                                        {star > 0 && (
                                          <div className="view__content">
                                            <p className="view__text">
                                              Bạn đánh giá cuộc hẹn :
                                            </p>
                                            <p>{star}/5</p>
                                            <FaRegStar
                                              style={{
                                                transform: "translateY(-9px)",
                                                color: "yellow",
                                              }}
                                            ></FaRegStar>
                                          </div>
                                        )}
                                      </div>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button
                                        variant="secondary"
                                        onClick={handleCloseSchedule}
                                      >
                                        Đóng
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      {/* <div className="history__pagination">
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel=">"
                          // onPageChange={handlePageClick}
                          pageRangeDisplayed={5}
                          pageCount={3}
                          previousLabel="<"
                          pageClassName="page-item"
                          pageLinkClassName="page-link"
                          previousClassName="page-item previous"
                          previousLinkClassName="page-link"
                          nextClassName="page-item previous"
                          nextLinkClassName="page-link"
                          breakClassName="page-item"
                          breakLinkClassName="page-link"
                          containerClassName="pagination"
                          activeClassName="active active-pagination"
                        />
                      </div> */}
                    </div>
                  ) : (
                    <div className="no__schedule">
                      <div className="no__schedule_icon">
                        <FaRegCalendarAlt></FaRegCalendarAlt>
                      </div>
                      <p> Không có lịch hẹn nào đã hoàn thành</p>
                    </div>
                  )}
                </Tab>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default memo(UserHistory);
