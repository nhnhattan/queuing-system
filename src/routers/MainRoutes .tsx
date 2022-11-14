import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Row, Col, MenuProps } from "antd";
import "antd/dist/antd.css";

import Dashboard from "../components/dashboard/Dashboard";
import Login from "../components/login/Login";
import ProtechRouter from "../config/ProtechRouter";
import Services from "../components/services/Services";
import Reports from "../components/reports/Reports";
import Devices from "../components/devices/Devices";
import Queuing from "../components/queuing/Queuing";
import Roles from "../components/roles/Roles";
import Account from "../components/accounts/Account";
import Diary from "../components/diary/Diary";
import AddDevice from "../components/addDevice/AddDevice";
import AddService from "../components/addService/AddService";
import AddQueuing from "../components/addQueuing/AddQueuing";
import AddRole from "../components/addRole/AddRole";
import AddAccount from "../components/addAccount/AddAccount";
import SingleRole from "../components/roles/singleRole/SingleRole";
import SingleAccount from "../components/accounts/singleAccount/SingleAccount";
import SingleDevice from "../components/devices/singleDevice/SingleDevice";
import SingleService from "../components/services/singleService/SingleService";
import DeviceUpdate from "../components/devices/deviceUpdate/DeviceUpdate";
import ServiceUpdate from "../components/services/singleUpdate/ServiceUpdate";
import SingleQueuing from "../components/queuing/singleQueuing/SingleQueuing";
import UserInfo from "../components/UserInfo/UserInfo";
import Menubar from "../components/menu/Menubar";
import NotFound from "../components/notFound/NotFound";
import ForgotPass from "../components/forgot/ForgotPass";
import ResetPass from "../components/forgot/ResetPass";
import ProtectedRoute from "../ProtechRouter/ProtechRouter";
import { AuthContextProvider } from "../context/AuthContext";

const MainRoutes = () => {
  return (
    <AuthContextProvider>
      <Routes>
        {/* <Route path="/" element={<Navigate replace to="dashboard" />} /> */}
        {/* <Menubar /> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-pass" element={<ForgotPass />}></Route>
        <Route path="/reset-pass" element={<ResetPass />}></Route>

        <Route path="/" element={<Dashboard />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/AddService"
          element={
            <ProtectedRoute>
              <AddService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/:serviceID"
          element={
            <ProtectedRoute>
              <SingleService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services/:serviceID/update"
          element={
            <ProtectedRoute>
              <ServiceUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/devices"
          element={
            <ProtectedRoute>
              <Devices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/devices/AddDevice"
          element={
            <ProtectedRoute>
              <AddDevice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/devices/:deviceID"
          element={
            <ProtectedRoute>
              <SingleDevice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/devices/:deviceID/update"
          element={
            <ProtectedRoute>
              <DeviceUpdate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/queuing"
          element={
            <ProtectedRoute>
              <Queuing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/queuing/AddQueuing"
          element={
            <ProtectedRoute>
              <AddQueuing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/queuing/:queuingID"
          element={
            <ProtectedRoute>
              <SingleQueuing />
            </ProtectedRoute>
          }
        />

        <Route
          path="/roles"
          element={
            <ProtectedRoute>
              <Roles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles/AddRole"
          element={
            <ProtectedRoute>
              <AddRole />
            </ProtectedRoute>
          }
        />
        <Route
          path="/roles/:roleID"
          element={
            <ProtectedRoute>
              <SingleRole />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts/AddAccount"
          element={
            <ProtectedRoute>
              <AddAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts/:accountID"
          element={
            <ProtectedRoute>
              <SingleAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diarys"
          element={
            <ProtectedRoute>
              <Diary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userInfo"
          element={
            <ProtectedRoute>
              <UserInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
};

export default MainRoutes;
