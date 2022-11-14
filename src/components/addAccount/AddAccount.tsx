import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loadRoles, loadAccount } from "../../redux/actions/action";

import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Row, Col } from "antd";
import "antd/dist/antd.css";

import { FaChevronRight } from "react-icons/fa";

import UserBar from "../userbar/UserBar";
import Dropdown from "../dropdown/Dropdown";

import "./addAccount.css";
import { NavLink, useNavigate } from "react-router-dom";

const AddAccount = () => {
  const userDoc = collection(db, "users");
  const roleDoc = collection(db, "role");
  const reportDoc = collection(db, "reports");
  const navigate = useNavigate()
  const userEmail: any = localStorage.getItem("user");

  const [status, setStatus] = useState<string>("Chọn");
  const statusArray = ["Hoạt động", "Ngưng hoạt động"];
  const [rolesArray, setRolesArray]: any = useState([""]);
  const [accountArray, setaccountArray]: any = useState([""]);

  const [role, setRole] = useState("Chọn");
  let roleArray: any = [];
  let emailArray: any = [];
  var d = new Date();

  // getUser
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");
  const [truepass, setTruepass] = useState(false);

  const rolesData: [] = useSelector((state: any) => state.posts.role);
  const accountData: [] = useSelector((state: any) => state.posts.account);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(loadRoles());
    if (rolesData !== undefined) {
      setRolesArray(rolesData);
    }
  }, [rolesData]);
  rolesArray.map((role: any) => {
    roleArray.push(role.name);
  });

  useEffect(() => {
    dispatch(loadAccount());
    if (accountData !== undefined) {
      setaccountArray(accountData);
    }
  }, [accountData]);

  accountArray.map((acc: any) => {
    emailArray.push(acc.email);
  });

  const handleAdd = async () => {
    try {
      if (repass === password) {
        setTruepass(true);
      } else {
        setTruepass(false);
      }
      if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự");
      } else {
        if (truepass) {
          if (emailArray.includes(email)) {
            alert("Email đã tồn tại, vui lòng tạo tài khoản với email khác");
          } else {
            const getRndInteger = (min: number, max: number) => {
              return Math.floor(Math.random() * (max - min)) + min;
            };
            addDoc(userDoc, {
              name: name,
              email: email,
              username: username,
              password: password,
              phone: phone,
              role: role,
              status: status,
              avatar: "",
            });
            
            createUserWithEmailAndPassword(auth, email, password).then(
              (userCredential) => {
                const user = userCredential.user;
              }
            );

            var numIp = getRndInteger(0, 200);

            addDoc(reportDoc, {
              email: userEmail,
              timeReport:
                d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
              timeReportSearch:
                d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(),
              hourReport:
                d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
              ipAddress: "128.172.308." + numIp,
              action: "Tạo tài khoản " + email ,
            });
            alert("Thêm thành công");
          }
        } else {
          alert("Mật khẩu nhập lại không đúng");
        }
      }
    } catch (err) {
      alert("Thêm thất bại");
    }
  };

  return (
    <>
      <Col
        span={20}
        style={{ background: "#F6F6F6", minWidth: "1240px", maxHeight: 1200 }}
      >
        <div className="device-box">
          <Row style={{ width: "100%" }}>
            <Col span={18}>
              <div className="location-box">
                <p className="location-path">Cài đặt hệ thống</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <NavLink to={"/accounts"} className="location-path">
                  Quản lý tài khoản
                </NavLink>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">Thêm tài khoản</p>
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
            <h1 className="device-content">Quản lý tài khoản</h1>
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <div className="form-box">
              <p className="content-header">Thông tin tài khoản</p>
              <Row style={{ width: "1192px" }}>
                <Col span={12} className="left-col">
                  <div className="label-wrap">
                    <label className="label-input">Họ tên</label>
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
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Nhập họ tên"
                    className="input-box"
                  />
                  <label className="error-label"></label>

                  <div className="label-wrap">
                    <label className="label-input">Số điện thoại</label>
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
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="input-box"
                    placeholder="Nhập số điện thoại"
                  />
                  <label className="error-label"></label>

                  <div className="label-wrap">
                    <label className="label-input">Email</label>
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
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-box"
                    placeholder="Nhập email"
                  />
                  <label className="error-label"></label>

                  <div className="label-wrap">
                    <label className="label-input">Vai trò</label>
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
                    selected={role}
                    setSelected={setRole}
                    options={roleArray}
                    width={"560px"}
                    top={"100%"}
                  />
                </Col>
                <Col span={12} className="right-col">
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
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="input-box"
                    placeholder="Nhập tên đăng nhập"
                  />
                  <label className="error-label"></label>

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
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-box"
                    placeholder="Mật khẩu ít nhất 6 ký tự"
                  />
                  <label className="error-label"></label>

                  <div className="label-wrap">
                    <label className="label-input">Nhập lại mật khẩu</label>
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
                    type="password"
                    onChange={(e) => {
                      setRepass(e.target.value);
                    }}
                    required
                    className="input-box"
                    placeholder="Nhập lại mật khẩu"
                  />
                  <label className="error-label">
                    {repass !== password && password !== null
                      ? "Mật khẩu nhập lại không đúng"
                      : ""}
                  </label>

                  <div className="label-wrap">
                    <label className="label-input">Tình trạng</label>
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
                    selected={status}
                    setSelected={setStatus}
                    options={statusArray}
                    width={"560px"}
                    top={"100%"}
                  />
                </Col>
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
              <Row
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></Row>
            </div>
          </Row>
          <div className="btn-wrap">
            <button className="cancel-btn">Hủy bỏ</button>
            <button onClick={handleAdd} className="add-btn">
              Thêm
            </button>
          </div>
        </div>
      </Col>
    </>
  );
};

export default AddAccount;
