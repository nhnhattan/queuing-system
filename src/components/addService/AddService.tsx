import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loadServices } from "../../redux/actions/action";

import { Row, Col } from "antd";

import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import UserBar from "../userbar/UserBar";

import "./addService.css";

const AddService = () => {
  const serviceDoc = collection(db, "service");

  const [serviceId, setServiceId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [min, setMin]: any = useState(0);
  const [max, setMax]: any = useState(0);
  const [auto, setAuto] = useState(false);
  const [minmax, setMinMax] = useState({ min: 0, max: 0 });
  const [prefix, setPrefix]: any = useState(0);
  const [prefixCheck, setPrefixCheck]: any = useState(false);

  const [surfix, setSurfix]: any = useState(0);
  const [surfixCheck, setSurfixCheck]: any = useState(false);

  const serviceData = useSelector((state: any) => state.posts.services);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();

  const [reset, setReset] = useState(false);
  const [lastId, setlastId]: any = useState("");
  const [status, setStatus] = useState("");
  const [service, setService] = useState([
    {
      serviceId: "",
      name: "name",
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
  useEffect(() => {
    dispatch(loadServices());
    if (serviceData !== undefined) {
      setService(serviceData);
    }
    for (let i = 0; i < service.length; i++) {
      if (i === service.length - 1) {
        setlastId(Number(service[i].serviceId) + 1);
      }
    }
  }, [serviceData]);

  let elementAuto = document.getElementById(
    "up-auto-checkbox"
  ) as HTMLInputElement;
  let elementPrefix = document.getElementById(
    "prefix-checkbox"
  ) as HTMLInputElement;
  let elementSurfix = document.getElementById(
    "surfix-checkbox"
  ) as HTMLInputElement;
  let elementReset = document.getElementById(
    "reset-checkbox"
  ) as HTMLInputElement;

  let num1: number = 0;
  const getRndInteger = (min: number, max: number) => {
    num1 = Math.floor(Math.random() * (max - min)) + min;
    return num1;
  };

  useEffect(() => {
    getRndInteger(0, 2);
    if (num1 === 0) {
      setStatus("Ngưng hoạt động");
    } else {
      setStatus("Hoạt động");
    }
  }, []);

  const handleSubmit = async () => {
    getRndInteger(0, 2);
    if (num1 === 0) {
      setStatus("Ngưng hoạt động");
    } else {
      setStatus("Hoạt động");
    }
    await addDoc(serviceDoc, {
      serviceId: serviceId,
      name: name,
      description: description,
      status: status,
      autoCheck: auto,
      min: min,
      max: max,
      prefixCheck: prefixCheck,
      prefix: prefix,
      surfixCheck: surfixCheck,
      surfix: surfix,
      reset: reset,
    });
    alert("Thêm thành công");
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
                    className="input-role"
                    required
                    style={{ paddingBottom: 12 }}
                    placeholder={lastId}
                    onChange={(e) => {
                      setServiceId(e.target.value);
                    }}
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
                    className="input-role"
                    required
                    placeholder="Nhập tên dịch vụ:"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Col>
                <Col span={12} className="right-col" style={{ maxWidth: 520 }}>
                  <div className="label-wrap">
                    <label className="label-input">Mô tả: </label>
                  </div>
                  <input
                    type="text"
                    className="input-role"
                    required
                    style={{ height: "136px" }}
                    placeholder="Mô tả dịch vụ"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Col>
              </Row>
              <p className="content-header-role" style={{ marginTop: "16px" }}>
                Quy tắc cấp số
              </p>
              <div className="queuing-box-footer">
                <input
                  type="checkbox"
                  id="up-auto-checkbox"
                  onClick={() => {
                    if (elementAuto.checked) {
                      setAuto(true);
                    } else {
                      setAuto(false);
                    }
                  }}
                />
                <p className="content-first">Tăng tự động từ:</p>
                <input
                  type="number"
                  className="input-number"
                  style={{ height: "44px", maxWidth: "61px" }}
                  placeholder="0001"
                  onChange={(e) => {
                    setMin(e.target.value);
                  }}
                />
                <p className="content-second">đến</p>
                <input
                  type="number"
                  className="input-number"
                  placeholder="9999"
                  style={{ height: "44px", maxWidth: "61px" }}
                  onChange={(e) => {
                    setMax(e.target.value);
                  }}
                />
              </div>
              <div className="queuing-box-footer">
                <input
                  type="checkbox"
                  id="prefix-checkbox"
                  onClick={() => {
                    if (elementPrefix.checked) {
                      setPrefixCheck(true);
                    } else {
                      setPrefixCheck(false);
                    }
                  }}
                />
                <p className="content-first">Prefix:</p>
                <input
                  type="number"
                  className="input-number"
                  placeholder="0001"
                  style={{ height: "44px", maxWidth: "61px" }}
                  onChange={(e) => {
                    setPrefix(e.target.value);
                  }}
                />
              </div>
              <div className="queuing-box-footer">
                <input
                  type="checkbox"
                  id="surfix-checkbox"
                  onClick={() => {
                    if (elementSurfix.checked) {
                      setSurfixCheck(true);
                    } else {
                      setSurfixCheck(false);
                    }
                  }}
                />
                <p className="content-first">Surfix:</p>
                <input
                  type="number"
                  className="input-number"
                  placeholder="0001"
                  style={{ height: "44px", maxWidth: "61px" }}
                  onChange={(e) => {
                    setSurfix(e.target.value);
                  }}
                />
              </div>
              <div className="queuing-box-footer">
                <input
                  type="checkbox"
                  id="reset-checkbox"
                  onClick={() => {
                    if (elementReset.checked) {
                      setReset(true);
                    } else {
                      setReset(false);
                    }
                  }}
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

export default AddService;
