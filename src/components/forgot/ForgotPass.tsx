import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../firebase";
import {
  collection,
  updateDoc,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

import { Row, Col, Form, Input, Button } from "antd";
import LogoForgot from "../../asset/img/LogoForgot";
import AltaLogo from "../../asset/img/AltaLogo";

import "./forgotpass.css";
const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [account, setAccount]: any = useState("");
  const [noti, setNoti] = useState("");
  const getEmail = async () => {
    const userDoc = collection(db, "users");
    const q: any = query(userDoc, where("email", "==", email));

    const dbGetDocs1: any = await getDocs(q);
    const userData = await dbGetDocs1.forEach((doc: any) => {
      if (doc.exists()) {
        localStorage.setItem("email", email);
      }
    });
  };

  const handlePass = async () => {
    try {
      await getEmail().then(() => {
        if (localStorage.getItem("email") === null) {
          setNoti("Email không tồn tại");
        } else {
          navigate("/reset-pass");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="forgot-pass-page">
      <Row style={{ minHeight: 810 }}>
        <Col span={9} className="forgot-col-left">
          <AltaLogo />
          <div className="repass-box">
            <p>Đặt lại mật khẩu</p>
            <p>Vui lòng nhập email để đặt lại mật khẩu của bạn *</p>
            <input
              type="email"
              className="input-repass"
              onChange={(e: any) => {
                setEmail(e.target.value);
                localStorage.removeItem("email");
              }}
              onFocus={() => {
                setNoti("");
              }}
            />
            <p className="noti-error">{noti === "" ? "" : noti}</p>
            <div className="btn-wrap-role" style={{marginTop: 48}}>
              <button
                className="back-btn"
                onClick={() => {
                  navigate("/login");
                  localStorage.removeItem("email");
                }}
              >
                Hủy
              </button>
              <button
                className="continue-btn"
                type="submit"
                onClick={handlePass}
              >
                Thêm
              </button>
            </div>
          </div>
        </Col>

        <Col span={15} className="repass-col-right">
          <LogoForgot />
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPass;
