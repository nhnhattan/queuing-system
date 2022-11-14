import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  orderBy,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { Row, Col, SelectProps } from "antd";
import { FaChevronRight } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import UserBar from "../../userbar/UserBar";
import Dropdown from "../../dropdown/Dropdown";
import { NavLink, Link } from "react-router-dom";
import "./deviceupdate.css";
const DeviceUpdate = () => {
  const params = useParams();
  const animatedComponents = makeAnimated();
  var id: any = params.deviceID;
  const reportDoc = collection(db, "reports");
  const userEmail: any = localStorage.getItem("user");
  var d = new Date();

  const [device, setDevice]: any = useState([]);

  const [deviceId, setDeviceId] = useState();
  const [deviceName, setDeviceName] = useState();
  const [ipAddress, setIpAddress] = useState();
  const [deviceType, setDeviceType] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [service, setService] = useState();
  const [serDoc, setSerDoc]: any = useState([
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
  // let array: any = ;
  const [arrayService, setArrayService]: any = useState([]);
  var arrayService1: any = "";
  var arrayService2;

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
  useEffect(() => {
    const getData = async () => {
      const serviceDoc = collection(db, "service");
      const q: any = query(serviceDoc, orderBy("serviceId"));

      const dbGetDocs1: any = await getDocs(q);
      const serviceData = await dbGetDocs1.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (serviceData !== undefined) {
        setSerDoc(serviceData);
      }
    };
    getData();
  }, []);
  arrayService1 = String(device.service);
  let text: string = "wait";

  useEffect(() => {
    arrayService2 = arrayService1.split(",");
    setArrayService(arrayService2);
    setDeviceId(device.deviceId);
    setDeviceName(device.deviceName);
    setDeviceType(device.device);
    setIpAddress(device.ipAddress);
    setUsername(device.username);
    setPassword(device.password);
    text = String(device.device);
  }, [arrayService1]);
  const [dvtype, setDvtype] = useState("");
  useEffect(() => {
    setDvtype(text);
  }, [device]);
  const dvtypeArray = ["Kiosk", "Display counter"];

  const handleRemove = (key: any) => {
    const new_arr = arrayService.filter((item: any) => item !== key);
    setArrayService(new_arr);
  };
  const deviceDocsingle: any = doc(db, "devices", `${id}`);
  let elemenId = document.getElementById("input-deviceid") as HTMLInputElement;
  let elemenName = document.getElementById("input-name") as HTMLInputElement;
  let elemenUsername = document.getElementById(
    "input-username"
  ) as HTMLInputElement;
  let elemenPassword = document.getElementById(
    "input-password"
  ) as HTMLInputElement;
  let elemenIp = document.getElementById("input-ip") as HTMLInputElement;

  let options: SelectProps["options"] = [];
  serDoc?.map((ser: any) => {
    options?.push({
      value: ser.name,
      label: ser.name,
    });
  });
  let newArr: any = []

  const [selectedOption, setSelectedOption] = useState([]);
  const [serviceOption, setServiceOption] = useState([]);
  const handleSubmit = async () => {
    try {
      const getRndInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min)) + min;
      };
      const handleChecked = async () => {
        newArr = []
        selectedOption.map((op: any)=> {
          newArr.push(op.label)
        })
        console.log(String(newArr))
      };
      await handleChecked();
      await updateDoc(deviceDocsingle, {
        deviceId: elemenId.value,
        deviceName: elemenName.value,
        device: dvtype,
        ipAddress: elemenIp.value,
        username: elemenUsername.value,
        password: elemenPassword.value,
        service: String(newArr),
      });
      // await updateDoc(deviceDocsingle, {
      //   deviceId: deviceId,
      //   deviceName: deviceName,
      //   device: deviceType,
      //   ipAddress: ipAddress,
      //   username: username,
      //   password: password,
      //   service: String(arrayService),
      // });
      var numIp = getRndInteger(0, 200);

      await addDoc(reportDoc, {
        email: userEmail,
        timeReport: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
        timeReportSearch:
          d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(),
        hourReport: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        ipAddress: "128.172.308." + numIp,
        action: "Cập nhật thiết bị " + device.deviceId,
      });
      alert("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      alert("Cập nhật thất bại");
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
                <p className="location">Cập nhật thiết bị</p>
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
          <div className="form-box" style={{ marginTop: 32, minHeight: 550 }}>
            <div>
              <p className="content-header-role">Thông tin thiết bị</p>
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
                    id="input-deviceid"
                    className="input-role"
                    required
                    defaultValue={device.deviceId}
                    onChange={(e: any) => setDeviceId(e.target.value)}
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
                    id="input-name"
                    className="input-role"
                    required
                    style={{ paddingBottom: 12 }}
                    defaultValue={device.deviceName}
                    onChange={(e: any) => {
                      if (
                        e.target.value !== undefined ||
                        e.target.value !== null
                      ) {
                        setDeviceName(e.target.value);
                      }
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
                    id="input-ip"
                    className="input-role"
                    required
                    style={{ paddingBottom: 12 }}
                    defaultValue={device.ipAddress}
                    onChange={(e: any) => {
                      if (
                        e.target.value !== undefined ||
                        e.target.value !== null
                      ) {
                        setIpAddress(e.target.value);
                      }
                    }}
                  />
                </Col>
                <Col span={12} className="right-col" style={{ maxWidth: 520 }}>
                  <div className="label-wrap">
                    <label className="label-input">Loại thiết bị: </label>
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
                    selected={dvtype}
                    setSelected={setDvtype}
                    options={dvtypeArray}
                    top={"34%"}
                    width={520}
                  />
                  <div className="label-wrap">
                    <label className="label-input">Tên đăng nhập: </label>
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
                    id="input-username"
                    className="input-role"
                    required
                    style={{ paddingBottom: 12 }}
                    defaultValue={device.username}
                    onChange={(e: any) => {
                      if (
                        e.target.value !== undefined ||
                        e.target.value !== null
                      ) {
                        setUsername(e.target.value);
                      }
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
                    id="input-password"
                    className="input-role"
                    required
                    style={{ paddingBottom: 12 }}
                    defaultValue={device.password}
                    onChange={(e: any) => {
                      if (
                        e.target.value !== undefined ||
                        e.target.value !== null
                      ) {
                        setPassword(e.target.value);
                      }
                    }}
                  />
                </Col>
              </Row>
              <div className="label-wrap" style={{ width: "1104px" }}>
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
              <div className="box-choose">
                <ul style={{ zIndex: 10 }}>
                  {arrayService.map((service: any) => {
                    return (
                      <li key={service}>
                        <div className="box-choose-item">
                          <p>{String(service)}</p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                            // onClick={() => {
                            //   handleRemove(service);
                            // }}
                          >
                            <IoCloseSharp className="box-choose-item-icon" />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  // defaultValue={}
                  placeholder="Cập nhật lại tất cả..."
                  isMulti
                  options={options}
                  onChange={(item: any) => {
                    setSelectedOption(item);
                  }}
                />
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
                value={"Cập nhật"}
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

export default DeviceUpdate;
