import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import {
  loadQueSer,
  loadQueSerStatus,
} from "../../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col } from "antd";
import { db } from "../../../firebase";
import { collection, getDoc, doc } from "firebase/firestore";

import { FaChevronRight } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";

import { Link } from "react-router-dom";

import UserBar from "../../userbar/UserBar";
import Dropdown from "../../dropdown/Dropdown";
import DatePicker from "../../datepicker/DatePicker";
import Search from "../../search/Search";
import AddButon from "../../addButton/AddButon";
import ReactPaginate from "react-paginate";
import "./singleService.css";
const SingleService = () => {
  const params = useParams();
  const [service, setService]: any = useState([""]);
  const [queuing, setQueuing]: any = useState([
    {
      queuingId: "",
      nameClient: "",
      service: "",
      timeGiven: "",
      timeOut: "",
      status: "",
      supply: "",
    },
  ]);

  let id: any = params.serviceID;
  const [status, setStatus]: any = useState("Tất cả");
  const statusArray = ["Tất cả", "Đã sử dụng", "Bỏ qua", "Đang chờ"];
  const queuingServiceData = useSelector((state: any) => state.posts.queuSer);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [inputSearch, setInputSearch] = useState("")

  let elemenServiceName = document.getElementById(
    "service-name"
  ) as HTMLInputElement;
  useEffect(() => {
    const getService = async () => {
      const snap = await getDoc(doc(db, "service", id));

      if (snap.exists()) {
        setService(snap.data());
      } else {
        console.log("No such document");
      }
    };
    getService();
  }, [service]);

  useEffect(()=> {
    if (service.name !== undefined) {
      if (status === "Tất cả") {
        dispatch(loadQueSer(service.name));
      } else if (status !== "Tất cả") {
        dispatch(loadQueSerStatus(service.name, status));
      }
    }
  }, [status, service]);

  useEffect(() => {
    if (queuingServiceData !== undefined) {
      setQueuing(queuingServiceData);
    }
  }, [queuingServiceData, service]);

  return (
    <>
      <Col
        span={20}
        style={{ background: "#F6F6F6", minWidth: "1240px", minHeight: 810 }}
      >
        <div className="device-box" style={{ minHeight: 810 }}>
          <Row style={{ width: "100%" }}>
            <Col span={18}>
              <div className="location-box">
                <p className="location-path">Cài đặt hệ thống</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <Link to={"/services"} className="location-path">
                  Danh sách dịch vụ
                </Link>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">Thêm dịch vụ</p>
              </div>
            </Col>
            <Col
              span={6}
              style={{
                width: "350px",
                maxWidth: "450px",
              }}
            >
              <UserBar />
            </Col>
          </Row>
          <Row>
            <h1 className="device-content">Quản lý dịch vụ</h1>
          </Row>
          <Row style={{ marginTop: 32 }}>
            <Col span={7.5} className="service-col-first">
              <p className="service-content-col">Thông tin dịch vụ</p>
              <div>
                <Row>
                  <Col span={8}>
                    {" "}
                    <p>Mã dịch vụ: </p>
                  </Col>
                  <Col span={16}>
                    <p>{service.serviceId}</p>
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col span={8}>
                    {" "}
                    <p>Tên dịch vụ: </p>
                  </Col>
                  <Col span={16}>
                    <p id="service-name">{service.name}</p>
                  </Col>
                </Row>
              </div>
              <div>
                <Row>
                  <Col span={8}>
                    {" "}
                    <p>Mô tả:</p>
                  </Col>
                  <Col span={16}>
                    <p>{service.description}</p>
                  </Col>
                </Row>
              </div>
              <p className="service-content-col">Quy tắc cấp số</p>
              <div className="queuing-box-footer">
                <p className="content-first">Tăng tự động từ:</p>
                <input
                  type="number"
                  className="input-number"
                  style={{ height: "44px", maxWidth: "61px" }}
                  value={service.min}
                />
                <p className="content-second">đến</p>
                <input
                  type="number"
                  className="input-number"
                  style={{ height: "44px", maxWidth: "61px" }}
                  value={service.max}
                />
              </div>
              <div className="queuing-box-footer">
                <p className="content-first">Prefix:</p>
                <input
                  type="number"
                  className="input-number"
                  style={{ height: "44px", maxWidth: "61px" }}
                  value={service.prefix}
                />
              </div>
              <p className="reset-service-content">
                {service.reset ? "Reset mỗi ngày" : ""}
              </p>
            </Col>
            <Col span={14} className="service-col-cen">
              <Row
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  marginBottom: 16,
                }}
              >
                <div className="search-type-wrap">
                  <p>Trạng thái</p>
                  <Dropdown
                    selected={status}
                    setSelected={setStatus}
                    options={statusArray}
                    width={"160px"}
                    top={"15%"}
                  />
                </div>
                <div className="search-type-wrap">
                  <DatePicker width={130}                      dateStart={dateStart}
                    setDateStart={setDateStart}
                    dateEnd={dateEnd}
                    setDateEnd={setDateEnd}/>
                </div>
                <div className="search-type-wrap">
                  <Search
                    width={190}
                    inputSearch={inputSearch} setInputSearch={setInputSearch} 
                  />
                </div>
              </Row>
              <table className="content-table">
                <thead>
                  <tr>
                    <th style={{ width: "334px" }}>Số thứ tự</th>
                    <th style={{ width: "334px" }}>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {queuing.map((que: any) => {
                    return (
                      <tr>
                        <td style={{ paddingLeft: 17 }}>{que.queuingId}</td>
                        <td style={{ paddingLeft: 17 }}>
                          <div className="status-wrap-table">
                            <GoPrimitiveDot
                              className={
                                que.status === "Bỏ qua"
                                  ? `status-dot-absent`
                                  : que.status === "Đang chờ"
                                  ? `status-dot-incomplete`
                                  : `status-dot-complete`
                              }
                            />
                            {que.status === "Bỏ qua"
                              ? `Vắng`
                              : que.status === "Đang chờ"
                              ? `Đang thực hiện`
                              : `Đã hoàn thành`}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={<AiOutlineCaretLeft className="pre-icon" />}
                nextLabel={<AiOutlineCaretRight className="next-icon" />}
                breakLabel={"..."}
                pageCount={10}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                // onPageChange={}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                breakClassName={"page-break"}
                activeClassName={"active"}
                previousClassName={"previous"}
                nextClassName={"next"}
              />
            </Col>
            <Col span={1}>
              <Link
                to={`/services/${params.serviceID}/update`}
                className="service-button-upgrade"
              >
                <div>
                  <svg
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.443 2.5521C21.1213 2.44721 22.7762 3.02994 24.0233 4.17209C25.1655 5.41913 25.7482 7.07409 25.655 8.764V19.6494C25.7599 21.3393 25.1655 22.9943 24.035 24.2413C22.7879 25.3835 21.1213 25.9662 19.443 25.8613H8.55751C6.86758 25.9662 5.21261 25.3835 3.96556 24.2413C2.8234 22.9943 2.24066 21.3393 2.34555 19.6494V8.764C2.24066 7.07409 2.8234 5.41913 3.96556 4.17209C5.21261 3.02994 6.86758 2.44721 8.55751 2.5521H19.443ZM12.8115 19.8592L20.6551 11.9923C21.366 11.2697 21.366 10.1043 20.6551 9.39335L19.14 7.87825C18.4174 7.15567 17.2519 7.15567 16.5293 7.87825L15.7485 8.67077C15.6319 8.78731 15.6319 8.98544 15.7485 9.10199C15.7485 9.10199 17.6016 10.9434 17.6365 10.99C17.7647 11.1299 17.8463 11.3164 17.8463 11.5261C17.8463 11.9457 17.5083 12.2953 17.0771 12.2953C16.879 12.2953 16.6925 12.2138 16.5643 12.0856L14.618 10.1509C14.5247 10.0577 14.3616 10.0577 14.2683 10.1509L8.70902 15.7101C8.32442 16.0948 8.10298 16.6076 8.09132 17.1553L8.02139 19.9175C8.02139 20.069 8.06801 20.2088 8.17291 20.3137C8.2778 20.4186 8.41765 20.4769 8.56917 20.4769H11.308C11.8674 20.4769 12.4036 20.2554 12.8115 19.8592Z"
                      fill="#FF7506"
                    />
                  </svg>
                </div>
                <p className="service-button-upgrade-content">
                  Cập nhật danh sách
                </p>
              </Link>
              <Link to={"/services"} className="service-button-back">
                <div>
                  <svg
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.8885 2.54004H9.1235C4.86516 2.54004 2.3335 5.07171 2.3335 9.31837V19.0834C2.3335 23.33 4.86516 25.8617 9.11183 25.8617H18.8768C23.1235 25.8617 25.6552 23.33 25.6552 19.0834V9.31837C25.6668 5.07171 23.1352 2.54004 18.8885 2.54004Z"
                      fill="#FF7506"
                    />
                    <path
                      d="M16.2398 10.1H10.2315L10.6165 9.71503C10.9548 9.37669 10.9548 8.81669 10.6165 8.47836C10.2782 8.14003 9.71818 8.14003 9.37985 8.47836L7.54818 10.31C7.20985 10.6484 7.20985 11.2084 7.54818 11.5467L9.37985 13.3784C9.55485 13.5534 9.77652 13.635 9.99818 13.635C10.2198 13.635 10.4415 13.5534 10.6165 13.3784C10.9548 13.04 10.9548 12.48 10.6165 12.1417L10.3132 11.8384H16.2398C17.7332 11.8384 18.9582 13.0517 18.9582 14.5567C18.9582 16.0617 17.7448 17.275 16.2398 17.275H10.4998C10.0215 17.275 9.62485 17.6717 9.62485 18.15C9.62485 18.6284 10.0215 19.025 10.4998 19.025H16.2398C18.7015 19.025 20.7082 17.0184 20.7082 14.5567C20.7082 12.095 18.7015 10.1 16.2398 10.1Z"
                      fill="#FFF2E7"
                    />
                  </svg>
                </div>
                <p className="service-button-upgrade-content">Quay lại</p>
              </Link>
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default SingleService;
