import React, { useEffect } from "react";

import { Row, Col, MenuProps } from "antd";
import "antd/dist/antd.css";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Menubar from "./components/menu/Menubar";
import MainRoutes from "./routers/MainRoutes ";
import Login from "./components/login/Login";

import ProtectedRoute from "./ProtechRouter/ProtechRouter";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider, UserAuth } from "../src/context/AuthContext";

function App() {
  // const user: any = localStorage.getItem("user");
  const { user }: any = UserAuth();
  const navigate = useNavigate();
  const [user1]: any = useAuthState(auth);
  return (
    <div className="App">
      <Row>
        {!user1 ? (
          <MainRoutes />
        ) : (
          <Row>
            <Col span={4} style={{ maxWidth: 200, maxHeight: 810 }}>
              <Menubar />
            </Col>
            <Col span={20} style={{ maxHeight: 810, width: "1440px" }}>
              <MainRoutes />
            </Col>
          </Row>
        )}
      </Row>
    </div>
  );
}

export default App;
