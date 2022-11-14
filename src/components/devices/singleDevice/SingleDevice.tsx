import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import {
  collection,
  getDoc,
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";

import { useParams, Link } from "react-router-dom";
import { Row, Col } from "antd";
import { FaChevronRight } from "react-icons/fa";
import UserBar from "../../userbar/UserBar";

import "./singleDevice.css";

const SingleDevice = () => {

  const params = useParams();
  const id: any = params.deviceID;

  const deviceDoc = collection(db, "devices");

  const [device, setDevice]: any = useState([]);

  useEffect(() => {
    const getRoles = async () => {
      const snap = await getDoc(doc(db, "devices", id));

      if (snap.exists()) {
        setDevice(snap.data());
      } else {
        console.log("No such document");
      }
    };
    getRoles();
  }, []);


  return (
    <>
      <Col span={20} style={{ background: "#F6F6F6", minWidth: "1240px" }}>
        <div className="device-box">
          <Row style={{ width: "100%" }}>
            <Col span={18}>
              <div className="location-box">
                <p className="location-path">Thiết bị</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <Link to={"/devices"} className="location-path">
                Danh sách thiết bị
                </Link>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">Chi tiết thiết bị</p>
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
            <div className="form-box">
              <p className="content-header-role" style={{ marginBottom: 12 }}>
              Thông tin thiết bị
              </p>
              <Row>
                <Col span={12} className="role-col-left"> 
                  <div className="head-content-box">
                    <p className="label-property">Mã thiết bị:</p>
                    <p className="label-value">{device.deviceId}</p>
                  </div>
                  <div className="head-content-box">
                    <p className="label-property">Tên thiết bị:</p>
                    <p className="label-value">{device.name}</p>
                  </div>
                  <div className="head-content-box">
                    <p className="label-property">Địa chỉ IP:</p>
                    <p className="label-value">{device.ipAddress}</p>
                  </div>
                </Col>
                <Col span={12} className="col-right" style={{ maxWidth: 520 }}>
                  <div className="head-content-box">
                    <p className="label-property">Loại thiết bị:</p>
                    <p className="label-value">{device.device}</p>
                  </div>
                  <div className="head-content-box">
                    <p className="label-property">Tên đăng nhập:</p>
                    <p className="label-value">{device.username}</p>
                  </div>
                  <div className="head-content-box">
                    <p className="label-property">Mật khẩu:</p>
                    <p className="label-value">{device.password}</p>
                  </div>
                </Col>
              </Row>
              <div className="footer-content-box">
                <p>Dịch vụ sử dụng:</p>
                <p>
                 {device.service}
                </p>
              </div>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default SingleDevice;
