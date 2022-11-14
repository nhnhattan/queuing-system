import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loadServices } from "../../redux/actions/action";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  orderBy,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import Dropdown from "../dropdown/Dropdown";
import UserBar from "../userbar/UserBar";
import { FaChevronRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import "./addQueuing.css";
const AddQueuing = () => {
  const [service, setService] = useState<string>("Chọn dịch vụ");
  const serviceArray: any = [];
  const queuingDoc = collection(db, "queuing");
  const serviceDoc = collection(db, "service");
  const userDoc = collection(db, "users");
  const reportDoc = collection(db, "reports");
  const [serDoc, setSerDoc] = useState([
    {
      serviceId: "",
      name: "",
      description: "",
      status: "",
      auto: {
        autoCheck: false,
        min: 0,
        max: 0,
      },
      prefix: {
        prefixCheck: false,
        prefix: 0,
      },
      surfix: {
        surfixCheck: false,
        surfix: 0,
      },
      reset: false,
    },
  ]);

  const serviceData: [] = useSelector((state: any) => state.posts.services);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(loadServices());
    if (serviceData !== undefined) {
      setSerDoc(serviceData);
    }
  }, [serviceData]);
  serDoc.map((ser) => {
    serviceArray.push(ser.name);
  });
  const userEmail: any = localStorage.getItem("user");
  const [accountUser, setAccountUser]: any = useState({
    id: "",
    email: "",
    password: "",
    username: "",
    name: "",
    phone: "",
    status: "",
    avatar: "",
  });
  let accountId: any;
  let queuingArray: any = [];
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  useEffect(() => {
    const getAccountInfo = async () => {
      const q: any = query(userDoc, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        accountId = doc.id;
        setAccountUser(doc.data());
      });
    };
    getAccountInfo();
  }, []);

  const [getSer, setGetSer]: any = useState([""]);
  const [getQue, setGetQue]: any = useState([
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
  let serId: any;
  useEffect(() => {
    const getAccountInfo = async () => {
      if (service !== "Chọn dịch vụ") {
        const q: any = query(serviceDoc, where("name", "==", service));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: any) => {
          serId = doc.id;
          setGetSer(doc.data());
        });
      }
    };
    getAccountInfo();
  }, [service]);

  const [idQue, setIdQue] = useState("");
  let idArray: any = [];
  useEffect(() => {
    const getQueId = async () => {
      const q: any = query(queuingDoc, where("service", "==", service));
      const querySnapshot = await getDocs(q);
      const dataAccount = await querySnapshot.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (dataAccount !== undefined) {
        setGetQue(dataAccount);
      }
    };
    if (service !== "Chọn dịch vụ") {
      getQueId();
    }
  }, [service]);
  useEffect(() => {
    getQue.map((que: any) => {
      idArray.push(que.queuingId);
    });
  }, [idArray]);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const [status, setStatus] = useState("Đang chờ");
  const [supply, setSupply] = useState("Kiosk");

  let monthStart: any;
  let dayStart: any;
  let yearStart: any;
  let hourGive: any;
  let hourOut: any;
  let timeGive: any;
  let timeGiveSearch: any;
  let timeOut: any;
  let timeOutSearch: any;
  let hourReport: any;
  let timeReport: any;
  let timeReportSearch: any;
  let idQue1: any
  const getId = async () => {
    if (idArray.length === 0) {
      setIdQue(getSer.serviceId + "0001");
      idQue1 = getSer.serviceId + "0001"
    } else {
      setIdQue(String(Number(getSer.serviceId + "0000") + idArray.length + 1));
      idQue1 = String(Number(getSer.serviceId + "0000") + idArray.length + 1)
    }
  };

  const getTimegive = () => {
    let DateGenerator = require("random-date-generator");
    DateGenerator.getRandomDate(); // random date
    let startDate = new Date(2021, 1, 1);
    let endDate = new Date(2021, 5, 10);
    let date = DateGenerator.getRandomDateInRange(startDate, endDate);
    const arraydate = String(date).split(" ");
    let month: string = "";
    const getDate = () => {
      switch (arraydate[1]) {
        case "Jan":
          return (month = "01");
        case "Feb":
          return (month = "02");
        case "Mar":
          return (month = "03");
        case "Apr":
          return (month = "04");
        case "May":
          return (month = "05");
        case "Jun":
          return (month = "06");
        case "Jul":
          return (month = "07");
        case "Aug":
          return (month = "08");
        case "Sep":
          return (month = "09");
        case "Oct":
          return (month = "10");
        case "Nov":
          return (month = "11");
        case "Feb":
          return (month = "12");
        default:
          return (month = "");
      }
    };
    getDate();
    hourGive = arraydate[4].slice(0, 5);
    hourReport = arraydate[4].slice(0, 8);
    timeGive = arraydate[2] + "/" + month + "/" + arraydate[3];
    timeReport = arraydate[2] + "/" + month + "/" + arraydate[3];
    timeGiveSearch = arraydate[3] + "-" + month + "-" + arraydate[2];
    timeReportSearch = arraydate[3] + "-" + month + "-" + arraydate[2];
    monthStart = month;
    dayStart = arraydate[2];
    yearStart = arraydate[3];
  };
  const getTimeOut = () => {
    let DateGenerator = require("random-date-generator");
    DateGenerator.getRandomDate(); // random date
    let startDate = new Date(yearStart, monthStart, dayStart);
    let endDate = new Date(2022, 12, 31);
    let date = DateGenerator.getRandomDateInRange(startDate, endDate);
    const arraydate = String(date).split(" ");
    let month: string = "";
    const getDate = () => {
      switch (arraydate[1]) {
        case "Jan":
          return (month = "01");
        case "Feb":
          return (month = "02");
        case "Mar":
          return (month = "03");
        case "Apr":
          return (month = "04");
        case "May":
          return (month = "05");
        case "Jun":
          return (month = "06");
        case "Jul":
          return (month = "07");
        case "Aug":
          return (month = "08");
        case "Sep":
          return (month = "09");
        case "Oct":
          return (month = "10");
        case "Nov":
          return (month = "11");
        case "Feb":
          return (month = "12");
        default:
          return (month = "");
      }
    };
    getDate();
    hourOut = arraydate[4].slice(0, 5);
    timeOut = arraydate[2] + "/" + month + "/" + arraydate[3];
    timeOutSearch = arraydate[3] + "-" + month + "-" + arraydate[2];
  };
  getTimegive();
  getTimeOut();

  const handleSubmit = async () => {
    await setIsLoad(true);
    // await addDoc(queuingDoc)
    const getRndInteger = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };
    const getConnect = () => {
      let num1: number = getRndInteger(0, 3);
      if (num1 === 1) {
        setStatus("Đang chờ");
      } else if (num1 === 0) {
        setStatus("Đã sử dụng");
      } else if (num1 === 2) {
        setStatus("Bỏ qua");
      }
    };

    const getSupply = () => {
      let num2: number = getRndInteger(0, 2);
      if (num2 === 1) {
        setSupply("Kiosk");
      } else if (num2 === 0) {
        setSupply("Hệ thống");
      }
    };

    await getConnect();
    await getSupply();
    var numIp = getRndInteger(0, 200);

    await getId().then(() => {
      if (idQue === "" || idQue === "NaN") {
        getId();
      }
    });
    setIdQue(idQue1)
    await addDoc(queuingDoc, {
      queuingId: idQue1,
      nameClient: accountUser.name,
      service: service,
      hourGive: hourGive,
      timeGiven: timeGive,
      timeGiveSearch: timeGiveSearch,
      hourOut: hourOut,
      timeOut: timeOut,
      timeOutSearch: timeOutSearch,
      status: status,
      supply: supply,
    });
    await addDoc(reportDoc, {
      email: userEmail,
      timeReport: timeReport,
      timeReportSearch: timeReportSearch,
      hourReport: hourReport,
      ipAddress: "128.172.308." + numIp,
      action: "Tạo cấp số dịch vụ " + service,
    });
    
    setTimeStart(hourGive + " " + timeGive);
    setTimeEnd(hourOut + " " + timeOut);
    setTimeout(() => {
      setIsOpen(true);
      setIsLoad(false);
    }, 1000);
  };
  return (
    <>
      <Col
        span={20}
        style={{
          background: "#F6F6F6",
          minWidth: "1240px",
          minHeight: 810,
          position: "relative",
        }}
      >
        <div className="device-box" style={{ minHeight: 810 }}>
          <Row style={{ width: "100%" }}>
            <Col span={18}>
              <div className="location-box">
                <p className="location-path">Cấp số</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <Link to={"/queuing"} className="location-path">
                  Danh sách cấp số
                </Link>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">Cấp số mới</p>
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
            <h1 className="device-content">Quản lý cấp số</h1>
          </Row>
          <div
            className="form-box"
            style={{
              marginTop: 32,
              minHeight: 550,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 24,
            }}
          >
            <h1 className="queuing-add-header">CẤP SỐ MỚI</h1>
            <h4 className="queuing-add-tips">Dịch vụ khách hàng lựa chọn</h4>
            <Dropdown
              selected={service}
              setSelected={setService}
              options={serviceArray}
              z
              width={"400px"}
              top={"44%"}
            />
            <p className="wait-load-content">
              {isLoad ? "Đang cấp số..." : ""}
            </p>
            <div className="btn-wrap-role" style={{ marginTop: 80 }}>
              <button className="cancel-btn">Hủy bỏ</button>
              <input
                type="submit"
                value={"In số"}
                className="add-btn"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </Col>
      {isOpen ? (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Số thứ tự được cấp</h3>
              <h1>{idQue}</h1>
              <span className="modal-box-queuing-content">
                DV: {service}{" "}
                <span className="location-queuing-content">
                  (tại quầy số 1)
                </span>{" "}
              </span>
            </div>
            <div className="modal-footer">
              <div className="modal-footer-content">
                <p>Thời gian cấp:</p>
                <p>{timeStart}</p>
              </div>
              <div className="modal-footer-content">
                <p>Hạn sử dụng:</p>
                <p>{timeEnd}</p>
              </div>
            </div>
            <div className="close-button">
              <IoClose
                className="close-icon"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddQueuing;
