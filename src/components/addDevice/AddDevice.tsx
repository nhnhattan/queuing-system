import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  orderBy,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { Row, Col } from "antd";
import { FaChevronRight } from "react-icons/fa";
import UserBar from "../userbar/UserBar";
import Dropdown from "../dropdown/Dropdown";
import { NavLink } from "react-router-dom";

const AddDevice = () => {
  const userEmail: any = localStorage.getItem("user");

  const deviceDoc = collection(db, "devices");
  const reportDoc = collection(db, "reports");

  const [device, setDevice] = useState<string>("Chọn loại thiết bị");
  const deviceArray = ["Kiosk", "Display counter"];

  const [deviceId, setDeviceId] = useState("");
  const [name, setName] = useState("");
  const [ipAddress, setIPAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("");
  const [connect, setConnect] = useState("");

  const [devDoc, setDevDoc] = useState([]);
  const idArray: any = [];
  let lastId: any = "";
  var d = new Date();

  let count: number = 0;
  useEffect(() => {
    const getRoles = async () => {
      const orderDoc: any = query(deviceDoc, orderBy("deviceId"));
      const data: any = await getDocs(orderDoc);
      setDevDoc(
        data.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };
    getRoles();
  }, [devDoc]);

  devDoc.map((dev: any) => {
    count++;
    idArray.push(dev.deviceId);
  });

  const handleAdd = async () => {
    try {
      const getRndInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min)) + min;
      };
      const getStatus = () => {
        let num1: number = getRndInteger(0, 2);
        if (num1 === 1) {
          setStatus("Hoạt động");
        } else if (num1 === 0) {
          setStatus("Ngưng hoạt động");
        }
      };
      const getConnect = () => {
        let num2: number = getRndInteger(0, 2);
        if (num2 === 1) {
          setConnect("Kết nối");
        } else if (num2 === 0) {
          setConnect("Mất kết nối");
        }
      };
      await getStatus();
      await getConnect();
      var numIp = getRndInteger(0, 200);

      await addDoc(deviceDoc, {
        deviceId: deviceId,
        deviceName: name,
        device: device,
        ipAddress: ipAddress,
        username: username,
        password: password,
        service: service,
        status: status,
        connect: connect,
      });
      await addDoc(reportDoc, {
        email: userEmail,
        timeReport: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
        timeReportSearch: d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(),
        hourReport: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        ipAddress: "128.172.308." + numIp,
        action: "Thêm thiết bị " + name,
      });
      alert("Thêm thành công");
    } catch (error) {
      console.log(error);
      alert("Thêm thất bại");
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <Col
        span={20}
        style={{ background: "#F6F6F6", minWidth: "1240px", height: "100%" }}
      >
        <div>
          <div className="device-box" style={{ minHeight: "600px" }}>
            <Row style={{ width: "100%" }}>
              <Col span={18}>
                <div className="location-box">
                  <p className="location-path">Thiết bị</p>
                  <p>
                    <FaChevronRight className="location-icon" />
                  </p>
                  <NavLink to={"/devices"} className="location-path">
                    Danh sách thiết bị
                  </NavLink>
                  <p>
                    <FaChevronRight className="location-icon" />
                  </p>
                  <p className="location">Thêm thiết bị</p>
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
              <h1 className="device-content">Quản lý thiết bị</h1>
            </Row>
            <Row style={{ marginTop: 32 }}>
              <div className="form-box" style={{ maxWidth: 1152 }}>
                <p className="content-header-role">Thông tin thiết bị</p>
                <form onSubmit={handleAdd}>
                  <Row>
                    <Col span={12} className="role-col-left">
                      <div className="label-wrap">
                        <label className="label-input">Mã thiết bị:</label>
                        <svg
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="required-icons"
                        >
                          <path
                            d="M5.8999 3.9191L4.20076 3L5.8999 2.0809C5.99565 2.0291 6.0284 1.91449 5.97315 1.82473L5.5729 1.17516C5.51765 1.08551 5.39527 1.05469 5.29952 1.10648L3.60038 2.02559V0.1875C3.60038 0.0839062 3.51075 0 3.40025 0H2.59975C2.48925 0 2.39962 0.0839062 2.39962 0.1875V2.0257L0.700478 1.1066C0.604727 1.0548 0.482351 1.08563 0.4271 1.17527L0.0268467 1.82473C-0.0284038 1.91438 0.00434648 2.0291 0.100097 2.0809L1.79924 3L0.100097 3.9191C0.00434648 3.9709 -0.0284038 4.08563 0.0268467 4.17527L0.4271 4.82484C0.482351 4.91449 0.604727 4.9452 0.700478 4.89352L2.39962 3.97441V5.8125C2.39962 5.91609 2.48925 6 2.59975 6H3.40025C3.51075 6 3.60038 5.91609 3.60038 5.8125V3.9743L5.29952 4.8934C5.39527 4.9452 5.51765 4.91449 5.5729 4.82473L5.97315 4.17516C6.0284 4.08551 5.99565 3.9709 5.8999 3.9191Z"
                            fill="#FF4747"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder={`Mã thiết bị cuối: ${
                          idArray[count - 1]
                        } + 1`}
                        className="input-role"
                        onChange={(e) => {
                          setDeviceId(e.target.value);
                        }}
                        required
                      />

                      <div className="label-wrap">
                        <label className="label-input">Tên thiết bị:</label>
                        <svg
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="required-icons"
                        >
                          <path
                            d="M5.8999 3.9191L4.20076 3L5.8999 2.0809C5.99565 2.0291 6.0284 1.91449 5.97315 1.82473L5.5729 1.17516C5.51765 1.08551 5.39527 1.05469 5.29952 1.10648L3.60038 2.02559V0.1875C3.60038 0.0839062 3.51075 0 3.40025 0H2.59975C2.48925 0 2.39962 0.0839062 2.39962 0.1875V2.0257L0.700478 1.1066C0.604727 1.0548 0.482351 1.08563 0.4271 1.17527L0.0268467 1.82473C-0.0284038 1.91438 0.00434648 2.0291 0.100097 2.0809L1.79924 3L0.100097 3.9191C0.00434648 3.9709 -0.0284038 4.08563 0.0268467 4.17527L0.4271 4.82484C0.482351 4.91449 0.604727 4.9452 0.700478 4.89352L2.39962 3.97441V5.8125C2.39962 5.91609 2.48925 6 2.59975 6H3.40025C3.51075 6 3.60038 5.91609 3.60038 5.8125V3.9743L5.29952 4.8934C5.39527 4.9452 5.51765 4.91449 5.5729 4.82473L5.97315 4.17516C6.0284 4.08551 5.99565 3.9709 5.8999 3.9191Z"
                            fill="#FF4747"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập tên thiết bị"
                        className="input-role"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />

                      <div className="label-wrap">
                        <label className="label-input">Địa chỉ IP:</label>
                        <svg
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="required-icons"
                        >
                          <path
                            d="M5.8999 3.9191L4.20076 3L5.8999 2.0809C5.99565 2.0291 6.0284 1.91449 5.97315 1.82473L5.5729 1.17516C5.51765 1.08551 5.39527 1.05469 5.29952 1.10648L3.60038 2.02559V0.1875C3.60038 0.0839062 3.51075 0 3.40025 0H2.59975C2.48925 0 2.39962 0.0839062 2.39962 0.1875V2.0257L0.700478 1.1066C0.604727 1.0548 0.482351 1.08563 0.4271 1.17527L0.0268467 1.82473C-0.0284038 1.91438 0.00434648 2.0291 0.100097 2.0809L1.79924 3L0.100097 3.9191C0.00434648 3.9709 -0.0284038 4.08563 0.0268467 4.17527L0.4271 4.82484C0.482351 4.91449 0.604727 4.9452 0.700478 4.89352L2.39962 3.97441V5.8125C2.39962 5.91609 2.48925 6 2.59975 6H3.40025C3.51075 6 3.60038 5.91609 3.60038 5.8125V3.9743L5.29952 4.8934C5.39527 4.9452 5.51765 4.91449 5.5729 4.82473L5.97315 4.17516C6.0284 4.08551 5.99565 3.9709 5.8999 3.9191Z"
                            fill="#FF4747"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập địa chỉ IP"
                        className="input-role"
                        onChange={(e) => {
                          setIPAddress(e.target.value);
                        }}
                      />
                    </Col>
                    <Col
                      span={12}
                      className="right-col"
                      style={{ maxWidth: 520 }}
                    >
                      <div className="label-wrap">
                        <label className="label-input">Loại thiết bị:</label>
                        <svg
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="required-icons"
                        >
                          <path
                            d="M5.8999 3.9191L4.20076 3L5.8999 2.0809C5.99565 2.0291 6.0284 1.91449 5.97315 1.82473L5.5729 1.17516C5.51765 1.08551 5.39527 1.05469 5.29952 1.10648L3.60038 2.02559V0.1875C3.60038 0.0839062 3.51075 0 3.40025 0H2.59975C2.48925 0 2.39962 0.0839062 2.39962 0.1875V2.0257L0.700478 1.1066C0.604727 1.0548 0.482351 1.08563 0.4271 1.17527L0.0268467 1.82473C-0.0284038 1.91438 0.00434648 2.0291 0.100097 2.0809L1.79924 3L0.100097 3.9191C0.00434648 3.9709 -0.0284038 4.08563 0.0268467 4.17527L0.4271 4.82484C0.482351 4.91449 0.604727 4.9452 0.700478 4.89352L2.39962 3.97441V5.8125C2.39962 5.91609 2.48925 6 2.59975 6H3.40025C3.51075 6 3.60038 5.91609 3.60038 5.8125V3.9743L5.29952 4.8934C5.39527 4.9452 5.51765 4.91449 5.5729 4.82473L5.97315 4.17516C6.0284 4.08551 5.99565 3.9709 5.8999 3.9191Z"
                            fill="#FF4747"
                          />
                        </svg>
                      </div>
                      <Dropdown
                        selected={device}
                        setSelected={setDevice}
                        options={deviceArray}
                        width={"520px"}
                        top={"35%"}
                      />

                      <div className="label-wrap">
                        <label className="label-input">Tên đăng nhập:</label>
                        <svg
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="required-icons"
                        >
                          <path
                            d="M5.8999 3.9191L4.20076 3L5.8999 2.0809C5.99565 2.0291 6.0284 1.91449 5.97315 1.82473L5.5729 1.17516C5.51765 1.08551 5.39527 1.05469 5.29952 1.10648L3.60038 2.02559V0.1875C3.60038 0.0839062 3.51075 0 3.40025 0H2.59975C2.48925 0 2.39962 0.0839062 2.39962 0.1875V2.0257L0.700478 1.1066C0.604727 1.0548 0.482351 1.08563 0.4271 1.17527L0.0268467 1.82473C-0.0284038 1.91438 0.00434648 2.0291 0.100097 2.0809L1.79924 3L0.100097 3.9191C0.00434648 3.9709 -0.0284038 4.08563 0.0268467 4.17527L0.4271 4.82484C0.482351 4.91449 0.604727 4.9452 0.700478 4.89352L2.39962 3.97441V5.8125C2.39962 5.91609 2.48925 6 2.59975 6H3.40025C3.51075 6 3.60038 5.91609 3.60038 5.8125V3.9743L5.29952 4.8934C5.39527 4.9452 5.51765 4.91449 5.5729 4.82473L5.97315 4.17516C6.0284 4.08551 5.99565 3.9709 5.8999 3.9191Z"
                            fill="#FF4747"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập tài khoản"
                        className="input-role"
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                      <div className="label-wrap">
                        <label className="label-input">Mật khẩu:</label>
                        <svg
                          width="6"
                          height="6"
                          viewBox="0 0 6 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="required-icons"
                        >
                          <path
                            d="M5.8999 3.9191L4.20076 3L5.8999 2.0809C5.99565 2.0291 6.0284 1.91449 5.97315 1.82473L5.5729 1.17516C5.51765 1.08551 5.39527 1.05469 5.29952 1.10648L3.60038 2.02559V0.1875C3.60038 0.0839062 3.51075 0 3.40025 0H2.59975C2.48925 0 2.39962 0.0839062 2.39962 0.1875V2.0257L0.700478 1.1066C0.604727 1.0548 0.482351 1.08563 0.4271 1.17527L0.0268467 1.82473C-0.0284038 1.91438 0.00434648 2.0291 0.100097 2.0809L1.79924 3L0.100097 3.9191C0.00434648 3.9709 -0.0284038 4.08563 0.0268467 4.17527L0.4271 4.82484C0.482351 4.91449 0.604727 4.9452 0.700478 4.89352L2.39962 3.97441V5.8125C2.39962 5.91609 2.48925 6 2.59975 6H3.40025C3.51075 6 3.60038 5.91609 3.60038 5.8125V3.9743L5.29952 4.8934C5.39527 4.9452 5.51765 4.91449 5.5729 4.82473L5.97315 4.17516C6.0284 4.08551 5.99565 3.9709 5.8999 3.9191Z"
                            fill="#FF4747"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Nhập mật khẩu"
                        className="input-role"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Col>

                    <div className="label-wrap" style={{ width: "100%" }}>
                      <label className="label-input">Dịch vụ sử dụng:</label>
                      <svg
                        width="6"
                        height="6"
                        viewBox="0 0 6 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="required-icons"
                      >
                        <path
                          d="M5.8999 3.9191L4.20076 3L5.8999 2.0809C5.99565 2.0291 6.0284 1.91449 5.97315 1.82473L5.5729 1.17516C5.51765 1.08551 5.39527 1.05469 5.29952 1.10648L3.60038 2.02559V0.1875C3.60038 0.0839062 3.51075 0 3.40025 0H2.59975C2.48925 0 2.39962 0.0839062 2.39962 0.1875V2.0257L0.700478 1.1066C0.604727 1.0548 0.482351 1.08563 0.4271 1.17527L0.0268467 1.82473C-0.0284038 1.91438 0.00434648 2.0291 0.100097 2.0809L1.79924 3L0.100097 3.9191C0.00434648 3.9709 -0.0284038 4.08563 0.0268467 4.17527L0.4271 4.82484C0.482351 4.91449 0.604727 4.9452 0.700478 4.89352L2.39962 3.97441V5.8125C2.39962 5.91609 2.48925 6 2.59975 6H3.40025C3.51075 6 3.60038 5.91609 3.60038 5.8125V3.9743L5.29952 4.8934C5.39527 4.9452 5.51765 4.91449 5.5729 4.82473L5.97315 4.17516C6.0284 4.08551 5.99565 3.9709 5.8999 3.9191Z"
                          fill="#FF4747"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Nhập dịch vụ sử dụng"
                      className="input-role"
                      style={{ maxWidth: 1099, width: "100%" }}
                      onChange={(e) => {
                        setService(e.target.value);
                      }}
                    />
                  </Row>
                </form>

                <Row>
                  <div className="label-wrap-bottom">
                    <svg
                      width="6"
                      height="6"
                      viewBox="0 0 6 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="required-icons-bottom"
                    >
                      <path
                        d="M5.8999 3.9191L4.20076 3L5.8999 2.0809C5.99565 2.0291 6.0284 1.91449 5.97315 1.82473L5.5729 1.17516C5.51765 1.08551 5.39527 1.05469 5.29952 1.10648L3.60038 2.02559V0.1875C3.60038 0.0839062 3.51075 0 3.40025 0H2.59975C2.48925 0 2.39962 0.0839062 2.39962 0.1875V2.0257L0.700478 1.1066C0.604727 1.0548 0.482351 1.08563 0.4271 1.17527L0.0268467 1.82473C-0.0284038 1.91438 0.00434648 2.0291 0.100097 2.0809L1.79924 3L0.100097 3.9191C0.00434648 3.9709 -0.0284038 4.08563 0.0268467 4.17527L0.4271 4.82484C0.482351 4.91449 0.604727 4.9452 0.700478 4.89352L2.39962 3.97441V5.8125C2.39962 5.91609 2.48925 6 2.59975 6H3.40025C3.51075 6 3.60038 5.91609 3.60038 5.8125V3.9743L5.29952 4.8934C5.39527 4.9452 5.51765 4.91449 5.5729 4.82473L5.97315 4.17516C6.0284 4.08551 5.99565 3.9709 5.8999 3.9191Z"
                        fill="#FF4747"
                      />
                    </svg>
                    <label className="label-note">
                      Là trường thông tin bắt buộc
                    </label>
                  </div>
                </Row>
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  <p className="noti-add">{}</p>
                </Row>
              </div>
            </Row>
          </div>
          <div className="btn-wrap-role">
            <button className="cancel-btn">Hủy bỏ</button>
            <button className="add-btn" type="submit" onClick={handleAdd}>
              Thêm
            </button>
          </div>
        </div>
      </Col>
    </>
  );
};

export default AddDevice;
