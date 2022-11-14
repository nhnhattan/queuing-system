import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

import { Row, Col } from "antd";
import { FaChevronRight } from "react-icons/fa";
import UserBar from "../userbar/UserBar";
import { Link } from "react-router-dom";

import "./addRole.css";
type arrayProps = string[];

const AddRole = () => {
  const userEmail: any = localStorage.getItem("user");

  const roleDoc = collection(db, "role");
  const reportDoc = collection(db, "reports");

  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [success, setSuccess] = useState("");

  let arrayA: arrayProps = [];
  let arrayB: arrayProps = [];
  var d = new Date();

  const handleAdd = async () => {
    try {
      const getRndInteger = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min)) + min;
      };
      var numIp = getRndInteger(0, 200);

      await addDoc(roleDoc, {
        name: name,
        description: des,
        roleA: arrayA,
        roleB: arrayB,
      });
      await addDoc(reportDoc, {
        email: userEmail,
        timeReport:
          d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear(),
        timeReportSearch:
          d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate(),
        hourReport:
          d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        ipAddress: "128.172.308." + numIp,
        action: "Tạo vai trò " + name,
      });
      alert("Thêm thành công")
    } catch (error) {
      console.log(error);
      alert("Thêm thất bại");
    }
  };

  setTimeout(() => setSuccess(""), 3000);

  function titleCase(str: any) {
    return str.toLowerCase().replace(/(^|\s)\S/g, function(l: any) {
      return l.toUpperCase();
    });
  }

  return (
    <>
      <Col span={20} style={{ background: "#F6F6F6", minWidth: "1240px" }}>
        <div className="device-box">
          <Row style={{ width: "100%" }}>
            <Col span={18}>
              <div className="location-box">
                <p className="location-path">Cài đặt hệ thống</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <Link to={"/roles"} className="location-path">
                  Quản lý vai trò
                </Link>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">Thêm vai trò</p>
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
            <h1 className="device-content">Danh sách vai trò</h1>
          </Row>
          <Row style={{ marginTop: 32 }}>
            <div className="form-box">
              <p className="content-header-role">Thông tin vai trò</p>
              <Row>
                <Col span={12} className="role-col-left">
                  <div className="label-wrap">
                    <label className="label-input">Tên vai trò</label>
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
                    placeholder="Nhập tên vai trò"
                    onChange={(e) => {
                      setName(titleCase(e.target.value));
                      console.log(name)
                    }}
                    className="input-role"
                  />
                  <label className="label-input">Mô tả:</label>
                  <input
                    type="text"
                    placeholder="Nhập mô tả"
                    onChange={(e) => {
                      setDes(e.target.value);
                    }}
                    className="input-role-des"
                  />
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
                </Col>
                <Col span={12}>
                  <div className="label-wrap">
                    <label className="label-input">Phân quyền chức năng</label>
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
                  <div className="check-form">
                    <p className="label-checked-content-A">Nhóm chức năng A</p>
                    <div className="input-check">
                      <input
                        type="checkbox"
                        value={"all"}
                        id="check-all-A"
                        onClick={() => {
                          let elementAll = document.getElementById(
                            "check-all-A"
                          ) as HTMLInputElement;
                          let elementX = document.getElementById(
                            "check_A_X"
                          ) as HTMLInputElement;
                          let elementY = document.getElementById(
                            "check_A_Y"
                          ) as HTMLInputElement;
                          let elementZ = document.getElementById(
                            "check_A_Z"
                          ) as HTMLInputElement;
                          if (elementAll.checked) {
                            arrayA.splice(0, arrayA.length);
                            arrayA.push("X");
                            arrayA.push("Y");
                            arrayA.push("Z");
                            elementX.checked = true;
                            elementY.checked = true;
                            elementZ.checked = true;
                          } else {
                            elementX.checked = false;
                            elementY.checked = false;
                            elementZ.checked = false;
                            arrayA.splice(0, arrayA.length);
                          }
                          console.log("ket qua", arrayA);
                        }}
                      />
                      <label>Tất cả</label>
                    </div>

                    <div className="input-check">
                      <input
                        type="checkbox"
                        value={"X"}
                        id="check_A_X"
                        onClick={() => {
                          let element = document.getElementById(
                            "check_A_X"
                          ) as HTMLInputElement;
                          if (element.checked) {
                            arrayA.push("X");
                          } else {
                            for (let i = 0; i < arrayA.length; i++) {
                              if (arrayA[i] === "X") {
                                arrayA.splice(i, 1);
                              }
                            }
                          }
                          console.log(arrayA);
                        }}
                      />
                      <label>Chức năng x</label>
                    </div>

                    <div className="input-check">
                      <input
                        type="checkbox"
                        value={"Y"}
                        id="check_A_Y"
                        onClick={() => {
                          let element = document.getElementById(
                            "check_A_Y"
                          ) as HTMLInputElement;
                          if (element.checked) {
                            arrayA.push("Y");
                          } else {
                            for (let i = 0; i < arrayA.length; i++) {
                              if (arrayA[i] === "Y") {
                                arrayA.splice(i, 1);
                              }
                            }
                          }
                          console.log(arrayA);
                        }}
                      />
                      <label>Chức năng y</label>
                    </div>

                    <div className="input-check">
                      <input
                        type="checkbox"
                        value={"Z"}
                        id="check_A_Z"
                        onClick={() => {
                          let element = document.getElementById(
                            "check_A_Z"
                          ) as HTMLInputElement;
                          if (element.checked) {
                            arrayA.push("Z");
                          } else {
                            for (let i = 0; i < arrayA.length; i++) {
                              if (arrayA[i] === "Z") {
                                arrayA.splice(i, 1);
                              }
                            }
                          }
                          console.log(arrayA);
                        }}
                      />
                      <label>Chức năng z</label>
                    </div>

                    <p className="label-checked-content-B">Nhóm chức năng B</p>

                    <div className="input-check">
                      <input
                        type="checkbox"
                        value={"all"}
                        id="check-all-B"
                        onClick={() => {
                          let elementAll = document.getElementById(
                            "check-all-B"
                          ) as HTMLInputElement;
                          let elementX = document.getElementById(
                            "check_B_X"
                          ) as HTMLInputElement;
                          let elementY = document.getElementById(
                            "check_B_Y"
                          ) as HTMLInputElement;
                          let elementZ = document.getElementById(
                            "check_B_Z"
                          ) as HTMLInputElement;
                          if (elementAll.checked) {
                            arrayB.splice(0, arrayB.length);
                            arrayB.push("X");
                            arrayB.push("Y");
                            arrayB.push("Z");
                            elementX.checked = true;
                            elementY.checked = true;
                            elementZ.checked = true;
                          } else {
                            elementX.checked = false;
                            elementY.checked = false;
                            elementZ.checked = false;
                            arrayB.splice(0, arrayB.length);
                          }
                          console.log("ket qua", arrayB);
                        }}
                      />
                      <label>Tất cả</label>
                    </div>

                    <div className="input-check">
                      <input
                        type="checkbox"
                        value={"X"}
                        id="check_B_X"
                        onClick={() => {
                          let element = document.getElementById(
                            "check_B_X"
                          ) as HTMLInputElement;
                          if (element.checked) {
                            arrayB.push("X");
                          } else {
                            for (let i = 0; i < arrayB.length; i++) {
                              if (arrayB[i] === "X") {
                                arrayB.splice(i, 1);
                              }
                            }
                          }
                          console.log(arrayB);
                        }}
                      />
                      <label>Chức năng x</label>
                    </div>

                    <div className="input-check">
                      <input
                        type="checkbox"
                        value={"Y"}
                        id="check_B_Y"
                        onClick={() => {
                          let element = document.getElementById(
                            "check_B_Y"
                          ) as HTMLInputElement;
                          if (element.checked) {
                            arrayB.push("Y");
                          } else {
                            for (let i = 0; i < arrayB.length; i++) {
                              if (arrayB[i] === "Y") {
                                arrayB.splice(i, 1);
                              }
                            }
                          }
                          console.log(arrayB);
                        }}
                      />
                      <label>Chức năng y</label>
                    </div>

                    <div className="input-check">
                      <input
                        type="checkbox"
                        value={"Z"}
                        id="check_B_Z"
                        onClick={() => {
                          let element = document.getElementById(
                            "check_B_Z"
                          ) as HTMLInputElement;
                          if (element.checked) {
                            arrayB.push("Z");
                          } else {
                            for (let i = 0; i < arrayB.length; i++) {
                              if (arrayB[i] === "Z") {
                                arrayB.splice(i, 1);
                              }
                            }
                          }
                          console.log(arrayB);
                        }}
                      />
                      <label>Chức năng z</label>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row style={{display: "flex", justifyContent: "center"}}>
                <p className="noti-add">{success}</p>
              </Row>
            </div>
          </Row>
        </div>
        <Row>
          <div className="btn-wrap-role">
            <button className="cancel-btn">Hủy bỏ</button>
            <button onClick={handleAdd} className="add-btn">
              Thêm
            </button>
          </div>
        </Row>
      </Col>
    </>
  );
};

export default AddRole;
