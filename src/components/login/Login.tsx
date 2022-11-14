import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Row, Col, Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { signInWithEmailAndPassword } from "firebase/auth";

import "./styles/login.css";

import Logo from "../../asset/img/logo";
import AltaLogo from "../../asset/img/AltaLogo";
import { auth } from "../../firebase";

import { useDispatch, useSelector } from "react-redux";
import { loginAccount } from "../../redux/actions/action";

import { UserAuth } from "../../context/AuthContext";

type text = HTMLElement | null;
export let user = "";
const Login = () => {
  const userData: [] = useSelector((state: any) => state.posts.user);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormess, setErrormess] = useState("");
  // console.log("email: ",email, "password: ",password)
  const { signIn }: any = UserAuth();
  const login = async () => {
    await signIn(email, password)
      .then(() => {
        navigate("/dashboard");
        user = email;
        localStorage.setItem("user", user);
      })
      .catch((error: any) => {
        console.log(error);
        setErrormess(`Sai mật khẩu hoặc tên đăng nhập`);
      });
  };

  return (
    <div className="register">
      <Row className="register-page">
        <Col span={9} className="form-register">
          <div className="Altalogo">
            <AltaLogo />
          </div>
          <div className="form_register">
            <Form layout={"vertical"} className="form-des">
              <Form.Item
                label={<label className="label-input">Tên đăng nhập *</label>}
                name="username"
                style={{ height: "50px" }}
              >
                <Input
                  className="input-form"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => {
                    setErrormess("");
                  }}
                />
              </Form.Item>
              <Form.Item
                label={<label className="label-input">Mật khẩu *</label>}
                name="password"
                style={{ height: "50px" }}
              >
                <Input.Password
                  className="input-form"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <p className="error-mess">
                {errormess ? <ExclamationCircleOutlined /> : ""} {errormess}
              </p>
              <Link to={"/forgot-pass"} className="forgot-pass">
                Quên mật khẩu?
              </Link>
              <Form.Item style={{ height: "50px" }}>
                <Button className="signin-btn" onClick={login}>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col span={15} className="content">
          <div className="logo">
            <Logo />
          </div>
          <div className="wrap-title">
            <p>Hệ thống</p>
            <h1>Quản lý xếp hàng</h1>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
