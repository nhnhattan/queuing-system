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
import { GoPrimitiveDot } from "react-icons/go";


import { useParams, Link } from "react-router-dom";
import { Row, Col } from "antd";
import { FaChevronRight } from "react-icons/fa";
import UserBar from "../../userbar/UserBar";

const SingleQueuing = () => {
  const params = useParams();
  const id: any = params.queuingID;
  const [queuing, setQueuing]: any = useState([""]);
  const queuingDoc = collection(db, "queuing");

  useEffect(() => {
    const getQueuing = async () => {
      const snap = await getDoc(doc(db, "queuing", id));

      if (snap.exists()) {
        setQueuing(snap.data());
      } else {
        console.log("No such document");
      }
    };
    getQueuing();
  }, []);

  return (
    <>
      <Col span={20} style={{ background: "#F6F6F6", minWidth: "1240px" }}>
        <div className="device-box">
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
                <p className="location">Chi tiết</p>
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
          <Row style={{ marginTop: 32 }}>
            <div className="form-box">
              <p className="content-header-role" style={{ marginBottom: 20 }}>
                Thông tin thiết bị
              </p>
              <Row>
                <Col span={12} className="role-col-left">
                  <div className="head-content-box">
                    <p className="label-property">Họ tên:</p>
                    <p className="label-value">{queuing.nameClient}</p>
                  </div>
                  <div className="head-content-box">
                    <p className="label-property">Tên dịch vụ:</p>
                    <p className="label-value">{queuing.service}</p>
                  </div>
                  <div className="head-content-box">
                    <p className="label-property">Số thứ tự:</p>
                    <p className="label-value">{queuing.queuingId}</p>
                  </div>
                  <div className="head-content-box">
                    <p className="label-property">Thời gian cấp:</p>
                    <p className="label-value">{queuing.timeGiven}</p>
                  </div>
                  <div className="head-content-box">
                    <p className="label-property">Hạn sử dụng:</p>
                    <p className="label-value">{queuing.timeOut}</p>
                  </div>
                </Col>
                <Col span={12} className="col-right" style={{ maxWidth: 520 }}>
                  <div className="head-content-box">
                    <p className="label-property">Nguồn cấp:</p>
                    <p className="label-value">{queuing.supply}</p>
                  </div>
                  <div className="head-content-box">
                    <p className="label-property">Trạng thái:</p>
                    <p className="label-value">
                      <div className="status-wrap-table">
                        <GoPrimitiveDot
                          className={
                            queuing.status === "Bỏ qua"
                              ? `status-dot-passing`
                              : queuing.status === "Đang chờ"
                              ? `status-dot-waiting`
                              : `status-dot-used`
                          }
                        />{" "}
                        {queuing.status}
                      </div>
                    </p>
                  </div>
                  <div className="head-content-box">
                    <p className="label-property">Số điện thoại:</p>
                    <p className="label-value"></p>
                  </div>
                  <div className="head-content-box">
                    <p className="label-property">Địa chỉ Email:</p>
                    <p className="label-value"></p>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default SingleQueuing;
