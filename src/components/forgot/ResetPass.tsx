import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebase";
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
import { sendPasswordResetEmail } from "firebase/auth";

import { Row, Col, Form, Input, Button } from "antd";
import LogoForgot from "../../asset/img/LogoForgot";
import AltaLogo from "../../asset/img/AltaLogo";

import { FiEyeOff, FiEye } from "react-icons/fi";
import "./forgotpass.css";
const ForgotPass = () => {
  const navigate = useNavigate();
  const email: any = localStorage.getItem("email");
  const [noti, setNoti] = useState("");
  const [isSeePass, setIsSeePass] = useState(false);
  const [isSeeRePass, setIsSeeRePass] = useState(false);

  let elementNewPass = document.getElementById("new-pass") as HTMLInputElement;
  let elementRePass = document.getElementById("renew-pass") as HTMLInputElement;

  const [repass, setRepass] = useState("");
  const [password, setPassword] = useState("");
  const [account, setAccount]: any = useState("");
  useEffect(() => {
    if (repass !== "" && repass !== password) {
      setNoti("Mật khẩu nhập lại không đúng");
    } else {
      setNoti("");
    }
  }, [repass]);
  const user = auth.currentUser;
  let id: any = "";
  const handleRePass = async () => {
    if (repass === password) {
      try {
        const getAccountInfo = async () => {
          const userDoc = collection(db, "users");
          const q: any = query(userDoc, where("email", "==", email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            id = doc.id;
            setAccount(doc.data());
          });
        };
        await getAccountInfo();
        await updateDoc(doc(db, "users", id), {
          password: password,
        });
        await sendPasswordResetEmail(auth, email).then(() => {
          alert("Truy cập email để đổi mật khẩu");
          navigate("/login")
        });
      } catch (error) {
        console.log(error);
        alert("That bai");
        console.log(user);
      }
    } else {
      alert("Mật khẩu nhập lại không đúng");
    }
  };
  return (
    <div className="forgot-pass-page">
      <Row style={{ minHeight: 810 }}>
        <Col span={9} className="forgot-col-left">
          <Link to={"/login"}>
            <AltaLogo />
          </Link>

          <div className="repass-box">
            <p>Đặt lại mật khẩu mới</p>
            <div className="repass-input-wrap">
              <label>Mật khẩu </label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  className="input-repass"
                  id="new-pass"
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                  }}
                />
                {isSeePass ? (
                  <FiEye
                    className="input-pass-icon"
                    onClick={() => {
                      setIsSeePass(!isSeePass);
                      elementNewPass.type = "password";
                    }}
                  />
                ) : (
                  <FiEyeOff
                    className="input-pass-icon"
                    onClick={() => {
                      setIsSeePass(!isSeePass);
                      elementNewPass.type = "text";
                    }}
                  />
                )}
              </div>
            </div>
            <div className="repass-input-wrap">
              <label>Nhập lại mật khẩu </label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  className="input-repass"
                  id="renew-pass"
                  onChange={(e: any) => {
                    setRepass(e.target.value);
                  }}
                />
                {isSeeRePass ? (
                  <FiEye
                    className="input-pass-icon"
                    onClick={() => {
                      setIsSeeRePass(!isSeeRePass);
                      elementRePass.type = "password";
                    }}
                  />
                ) : (
                  <FiEyeOff
                    className="input-pass-icon"
                    onClick={() => {
                      setIsSeeRePass(!isSeeRePass);
                      elementRePass.type = "text";
                    }}
                  />
                )}
              </div>
            </div>
            <p className="noti-error">{noti === "" ? "" : noti}</p>
            <div className="btn-wrap-role" style={{ marginTop: 32 }}>
              <button
                className="continue-btn"
                type="submit"
                onClick={handleRePass}
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
