import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { Row, Col } from "antd";
import { db } from "../../../firebase";
import { collection, getDoc, doc, updateDoc, setDoc, addDoc } from "firebase/firestore";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import UserBar from "../../userbar/UserBar";

const ServiceUpdate = () => {
  const params = useParams();
  let id: any = params.serviceID;
  const serviceDoc: any = collection(db, "service");
  const reportDoc = collection(db, "reports");
  const userEmail: any = localStorage.getItem("user");
  var d = new Date();

  const [service, setService]: any = useState([""]);
  const [serviceId, setServiceId]: any = useState("");
  let elemenServiceId = document.getElementById(
    "service-id"
  ) as HTMLInputElement;
  let elemenServiceName = document.getElementById(
    "service-name"
  ) as HTMLInputElement;
  let elemenServiceDescription = document.getElementById(
    "service-description"
  ) as HTMLInputElement;
  let elemenServiceAuto = document.getElementById(
    "service-auto"
  ) as HTMLInputElement;
  let elemenServiceMin = document.getElementById(
    "service-min"
  ) as HTMLInputElement;
  let elemenServiceMax = document.getElementById(
    "service-max"
  ) as HTMLInputElement;
  let elemenServicePrefixCheck = document.getElementById(
    "service-prefixCheck"
  ) as HTMLInputElement;
  let elemenServicePrefix = document.getElementById(
    "service-prefix"
  ) as HTMLInputElement;
  let elemenServiceSurfixCheck = document.getElementById(
    "service-surfixCheck"
  ) as HTMLInputElement;
  let elemenServiceSurfix = document.getElementById(
    "service-surfix"
  ) as HTMLInputElement;
  let elemenServiceReset = document.getElementById(
    "service-reset"
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
  }, []);

  const handleChecked = () => {
    if(service.autoCheck === true) {
      elemenServiceAuto.checked = true
    }
    if(service.prefixCheck === true) {
      elemenServicePrefixCheck.checked = true
    }
    if(service.surfixCheck === true) {
      elemenServiceSurfixCheck.checked = true
    }
    if(service.reset === true) {
      elemenServiceReset.checked = true
    }
  }
  useEffect(()=> {
    handleChecked()
  }, [service])

  const handleSubmit = async () => {
    try {
      const getRndInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min)) + min;
      };
      await updateDoc(doc(db, "service", id), {
        serviceId: elemenServiceId.value,
        name: elemenServiceName.value,
        description: elemenServiceDescription.value,
        autoCheck: elemenServiceAuto.checked,
        min: elemenServiceMin.value,
        max: elemenServiceMax.value,
        prefixCheck: elemenServicePrefixCheck.checked,
        prefix: elemenServicePrefix.value,
        surfixCheck: elemenServiceSurfixCheck.checked,
        surfix: elemenServiceSurfix.value,
        reset: elemenServiceReset.checked,
      })
      var numIp = getRndInteger(0, 200);

      await addDoc(reportDoc, {
        email: userEmail,
        timeReport:
          d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
        timeReportSearch:
          d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(),
        hourReport:
          d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        ipAddress: "128.172.308." + numIp,
        action: "Cập nhật dịch vụ " ,
      })
      .then(() => {
        alert("Cập nhật thành công");
      });
    } catch (error) {
      console.log(error);
      alert("That bai");
    }
  };
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
                <p className="location-path">Dịch vụ</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <Link to={"/services"} className="location-path">
                  Danh sách dịch vụ
                </Link>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <Link
                  to={`/services/${params.serviceID}`}
                  className="location-path"
                >
                  Chi tiết
                </Link>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">Cập nhật</p>
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
          <div className="form-box" style={{ marginTop: 32, minHeight: 550 }}>
            <div>
              <p className="content-header-role">Thông tin dịch vụ</p>
              <Row>
                <Col span={12} className="role-col-left">
                  <div className="label-wrap">
                    <label className="label-input">Mã dịch vụ: </label>
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
                    id="service-id"
                    className="input-role"
                    required
                    style={{ paddingBottom: 12 }}
                    defaultValue={service.serviceId}
                  />
                  <div className="label-wrap">
                    <label className="label-input">Tên dịch vụ : </label>
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
                    id="service-name"
                    className="input-role"
                    required
                    defaultValue={service.name}
                  />
                </Col>
                <Col span={12} className="right-col" style={{ maxWidth: 520 }}>
                  <div className="label-wrap">
                    <label className="label-input">Mô tả: </label>
                  </div>
                  <input
                    type="text"
                    id="service-description"
                    className="input-role"
                    required
                    style={{ height: "136px" }}
                    defaultValue={service.description}
                  />
                </Col>
              </Row>
              <p className="content-header-role" style={{ marginTop: "16px" }}>
                Quy tắc cấp số
              </p>
              <div className="queuing-box-footer">
                <input
                  type="checkbox"
                  id="service-auto"
                />
                <p className="content-first">Tăng tự động từ:</p>
                <input
                  type="number"
                  id="service-min"
                  className="input-number"
                  style={{ height: "44px", maxWidth: "61px" }}
                  defaultValue={service.min}
                />
                <p className="content-second">đến</p>
                <input
                  type="number"
                  id="service-max"
                  className="input-number"
                  style={{ height: "44px", maxWidth: "61px" }}
                  defaultValue={service.max}
                />
              </div>
              <div className="queuing-box-footer">
                <input
                  type="checkbox"
                  id="service-prefixCheck"
                />
                <p className="content-first">Prefix:</p>
                <input
                  type="number"
                  id="service-prefix"
                  className="input-number"
                  style={{ height: "44px", maxWidth: "61px" }}
                  defaultValue={service.prefix}
                />
              </div>
              <div className="queuing-box-footer">
                <input
                  type="checkbox"
                  id="service-surfixCheck"
                />
                <p className="content-first">Surfix:</p>
                <input
                  type="number"
                  id="service-surfix"
                  className="input-number"
                  style={{ height: "44px", maxWidth: "61px" }}
                  defaultValue={service.surfix}
                />
              </div>
              <div className="queuing-box-footer">
                <input
                  type="checkbox"
                  id="service-reset"
                />
                <p>Reset mỗi ngày</p>
              </div>
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
            </div>
            <div className="btn-wrap-role">
              <button className="cancel-btn">Hủy bỏ</button>
              <input
                type="submit"
                value={"Thêm dịch vụ"}
                className="add-btn"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default ServiceUpdate;
