import React, { useState, useEffect } from "react";

import { useParams, NavLink, Link } from "react-router-dom";
import { loadAccount, singleAccount } from "../../../redux/actions/action";

import { useDispatch, useSelector } from "react-redux";

import { db } from "../../../firebase";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  orderBy,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { Row, Col } from "antd";
import "antd/dist/antd.css";

import { FaChevronRight } from "react-icons/fa";

import UserBar from "../../userbar/UserBar";
import Dropdown from "../../dropdown/Dropdown";

const SingleAccount = () => {
  const params = useParams();
  const id: any = params.accountID;
  const roleDoc = collection(db, "role");
  const accountDoc = doc(db, "users", id);
  const reportDoc = collection(db, "reports");
  const userEmail: any = localStorage.getItem("user");
  var d = new Date();

  // getUser
  let textRole: string = "wait";
  let textStatus: string = "wait";

  const accountData = useSelector((state: any) => state.posts.account);
  const accountDataSingle = useSelector(
    (state: any) => state.posts.singleAccount
  );
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();
  const [account, setAccount]: any = useState("");

  useEffect(() => {
    const getData = async () => {
      const q = await getDoc(doc(db, "users", id));

      let dataAccount;
      if (q.exists()) {
        dataAccount = q.data();
      } else {
        console.log("No such document");
      }
      if (dataAccount !== undefined) {
        setAccount(dataAccount);
      }
    };
    getData();
  }, [id]);
  const handleSubmit = async () => {};

  useEffect(() => {
    const getRoles = async () => {
      const orderDoc: any = query(roleDoc, orderBy("name"));
      const data: any = await getDocs(orderDoc);
      const dbgetDoc = await data.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (dbgetDoc !== undefined) {
        setRolesArray(dbgetDoc);
      }
    };
    getRoles();
  }, []);

  const [rolesArray, setRolesArray]: any = useState([]);
  const roleArray: any = [];

  rolesArray.map((role: any) => {
    roleArray.push(role.name);
  });
  const [name, setName] = useState(account.name);
  const [phone, setPhone] = useState(account.phone);
  const [email, setEmail] = useState(account.email);
  const [username, setUsername] = useState(account.username);
  const [password, setPassword] = useState();
  const [newPass, setNewPass] = useState("");
  const [repass, setRepass] = useState("");
  const [status, setStatus] = useState(account.status);
  const statusArray = ["Ho???t ?????ng", "Ng??ng ho???t ?????ng"];
  const [role, setRole] = useState("");
  useEffect(() => {
    if (account.role !== undefined) {
      textRole = String(account.role);
      setRole(textRole);
    }
    if (account.status !== undefined) {
      textStatus = String(account.status);
      setStatus(textStatus);
    }
  }, [account]);

  let elemenName = document.getElementById("input-name") as HTMLInputElement;
  let elemenPhone = document.getElementById("input-name") as HTMLInputElement;
  let elemenEmail = document.getElementById("input-name") as HTMLInputElement;
  let elemenUserName = document.getElementById(
    "input-name"
  ) as HTMLInputElement;

  const handleUpdate = async () => {
    try {
      const getRndInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min)) + min;
      };
      if (newPass !== "") {
        if (newPass.length < 6) {
          alert("M???t kh???u ph???i tr??n 6 k?? t???");
        } else {
          if (newPass === repass) {
            await updateDoc(doc(db, "users", id), {
              email: elemenEmail.value,
              password: newPass,
              username: elemenUserName.value,
              name: elemenName.value,
              phone: elemenPhone.value,
              status: status,
              role: role,
              avatar: "",
            });
            alert("Th??m th??nh c??ng");
          } else {
            alert("Th??m th???t b???i");
          }
        }
      } else {
        alert("M???t kh???u kh??ng ???????c ????? tr???ng");
      }
      // await updateDoc(accountDoc, {
      //   email: email,
      //   password: newPass,
      //   username: username,
      //   name: name,
      //   phone: phone,
      //   status: status,
      //   role: role,
      //   avatar: "",
      // });
      var numIp = getRndInteger(0, 200);

      // await addDoc(reportDoc, {
      //   email: userEmail,
      //   timeReport: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
      //   timeReportSearch:
      //     d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(),
      //   hourReport: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
      //   ipAddress: "128.172.308." + numIp,
      //   action: "C???p nh???t t??i kho???n " + account.email,
      // });
    } catch (error) {
      alert("Th??m th???t b???i");
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
                <p className="location-path">C??i ?????t h??? th???ng</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <Link to={"/accounts"} className="location-path">
                  Qu???n l?? t??i kho???n
                </Link>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">C???p nh???t t??i kho???n</p>
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
            <h1 className="device-content">Qu???n l?? t??i kho???n</h1>
          </Row>
          {/* <form
            className="form-box"
            style={{ marginTop: 32, minHeight: 550 }}
          > */}
          <Row style={{ marginTop: 32 }}>
            <div className="form-box">
              <p className="content-header-role">Th??ng tin t??i kho???n</p>

              <Row>
                <Col span={12} className="role-col-left">
                  <div className="label-wrap">
                    <label className="label-input">H??? t??n: </label>
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
                    defaultValue={account.name}
                    onChange={(e: any) => {
                      setName(e.target.value);
                    }}
                  />
                  <div className="label-wrap">
                    <label className="label-input">S??? ??i???n tho???i: </label>
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
                    id="input-phone"
                    className="input-role"
                    required
                    style={{ paddingBottom: 12 }}
                    defaultValue={account.phone}
                    onChange={(e: any) => {
                      setPhone(e.target.value);
                    }}
                  />
                  <div className="label-wrap">
                    <label className="label-input">Email: </label>
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
                    id="input-email"
                    className="input-role"
                    required
                    style={{ paddingBottom: 12 }}
                    defaultValue={account.email}
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <div className="label-wrap">
                    <label className="label-input">Vai tr??: </label>
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
                    width={548}
                  />
                </Col>
                <Col span={12} className="right-col" style={{ maxWidth: 520 }}>
                  <div className="label-wrap">
                    <label className="label-input">T??n ????ng nh???p:: </label>
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
                    defaultValue={account.username}
                    onChange={(e: any) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <div className="label-wrap">
                    <label className="label-input">M???t kh???u: </label>
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
                    id="input-password"
                    className="input-role"
                    required
                    style={{ paddingBottom: 12 }}
                    onChange={(e: any) => {
                      setNewPass(e.target.value);
                    }}
                  />
                  <div className="label-wrap">
                    <label className="label-input">Nh???p l???i m???t kh???u: </label>
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
                    className="input-role"
                    required
                    style={{ paddingBottom: 12 }}
                    onChange={(e: any) => {
                      setRepass(e.target.value);
                    }}
                  />
                  <label className="error-label">
                    {repass !== newPass && newPass !== null && repass !== null
                      ? "M???t kh???u nh???p l???i kh??ng ????ng"
                      : ""}
                  </label>
                  <div className="label-wrap">
                    <label className="label-input">T??nh tr???ng: </label>
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
                    width={520}
                  />
                </Col>
              </Row>
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
              <label className="label-note">L?? tr?????ng th??ng tin b???t bu???c</label>
            </div>
          </Row>
          <div className="btn-wrap-role">
            <button className="cancel-btn">H???y b???</button>
            <input
              type="submit"
              value={"Th??m d???ch v???"}
              className="add-btn"
              onClick={handleUpdate}
            />
          </div>
          {/* </form> */}
        </div>
      </Col>
    </>
  );
};

export default SingleAccount;
