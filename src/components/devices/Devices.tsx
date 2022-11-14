import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { useDispatch, useSelector } from "react-redux";
import {
  loadDevices,
  searchDevices,
  loadSingleStatusDevice,
  loadSingleConnectDevice,
  loadDoubleTypeDevice,
  loadServices,
} from "../../redux/actions/action";

import { db } from "../../firebase";
import {
  collection,
  addDoc,
  orderBy,
  query,
  where,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore";

import { Row, Col } from "antd";
import "antd/dist/antd.css";

import { FaChevronRight, FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";

import UserBar from "../userbar/UserBar";
import Dropdown from "../dropdown/Dropdown";
import Search from "../search/Search";
import AddButon from "../addButton/AddButon";

import "./device.css";
import "../search/search.css";
import "./tableDevice.css";
import "../addButton/addButton.css";
import "../pagination/pagination.css";

const Devices = () => {
  const [status, setStatus] = useState<string>("Tất cả");
  const [connection, setConnection] = useState<string>("Tất cả");
  const statusArray = ["Tất cả", "Hoạt động", "Ngưng hoạt động"];
  const connectionArray = ["Tất cả", "Kết nối", "Mất kết nối"];

  const deviceDoc = collection(db, "devices");
  const [devices, setDevices]: any = useState([""]);

  const devicesData: [] = useSelector((state: any) => state.posts.devices);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();

  const [inputSearch, setInputSearch] = useState("");
  useEffect(() => {
    if (inputSearch === "") {
      dispatch(loadDevices());
    } else {
      dispatch(searchDevices(inputSearch));
    }
  }, [inputSearch]);

  useEffect(() => {
    if (status === "Tất cả" && connection === "Tất cả") {
      dispatch(loadDevices());
    } else if (status !== "Tất cả" && connection !== "Tất cả") {
      dispatch(loadDoubleTypeDevice(status, connection));
    } else if (connection !== "Tất cả" && status === "Tất cả") {
      dispatch(loadSingleConnectDevice(connection));
    } else if (connection === "Tất cả" && status !== "Tất cả") {
      dispatch(loadSingleStatusDevice(status));
    }
  }, [status, connection]);
  const [pag, setPag]: any = useState([""]);

  useEffect(() => {
    if (devicesData !== undefined) {
      setDevices(devicesData);
    }
  }, [devicesData]);
  // useEffect(() => {
  //   if (connection === "Tất cả") {
  //     dispatch(loadDevices());
  //   } else {
  //     dispatch(loadSingleConnectDevice(connection));
  //   }
  // }, [connection]);
  const handlePageClick = async (data: any) => {
    if(data.selected !== 0) {
      const first = query(
        collection(db, "devices"),
        orderBy("deviceId"),
        limit((data.selected)*8)
      );
      const documentSnapshots = await getDocs(first);
      console.log("----------", data.selected + 1);
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      // console.log("last", lastVisible);
      const next = query(
        collection(db, "devices"),
        orderBy("deviceId"),
        startAfter(lastVisible),
        limit(8)
      );
      const dbGetDocs1: any = await getDocs(next);
      const dataRole = await dbGetDocs1.docs.map((doc: any) =>
        ({
          ...doc.data(),
          id: doc.id,
        })
      );
      if(dataRole !== undefined) {
        setDevices(dataRole)
      }
    } else if (data.selected === 0) { 
      const first = query(
        collection(db, "devices"),
        orderBy("deviceId"),
        limit(8)
      );
      const documentSnapshots = await getDocs(first);
      const dataRole = await documentSnapshots.docs.map((doc: any) =>
        ({
          ...doc.data(),
          id: doc.id,
        })
      );
      if(dataRole !== undefined) {
        setDevices(dataRole)
      }
    }
    
  };
  return (
    <>
      <Col span={20} style={{ background: "#F6F6F6", minWidth: "1240px" }}>
        <div className="device-box">
          <Row style={{ width: "100%" }}>
            <Col span={18}>
              <div className="location-box">
                <p>Thiết bị</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">Danh sách thiết bị</p>
              </div>
            </Col>
            <Col
              span={6}
              style={{
                width: "350px",
                maxWidth: "450px",
              }}
            >
              <UserBar left={-65} />
            </Col>
          </Row>
          <Row>
            <h1 className="device-content">Danh sách thiết bị</h1>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ marginRight: "24px" }}>
                  <p className="filter-content">Trạng thái hoạt động</p>
                  <Dropdown
                    selected={status}
                    setSelected={setStatus}
                    options={statusArray}
                    width={"300px"}
                  />
                </div>
                <div>
                  <p className="filter-content">Trạng thái kết nối</p>
                  <Dropdown
                    selected={connection}
                    setSelected={setConnection}
                    options={connectionArray}
                    width="300px"
                  />
                </div>
              </div>
              <Search
                inputSearch={inputSearch}
                setInputSearch={setInputSearch}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col span={22}>
              <table className="content-table">
                <thead>
                  <tr>
                    <th style={{ width: "103px" }}>Mã thiết bị</th>
                    <th style={{ width: "99px", padding: "12px 0 12px 8px" }}>
                      Tên thiết bị
                    </th>
                    <th style={{ width: "138px", padding: "12px 0 12px 8px" }}>
                      Địa chỉ IP
                    </th>
                    <th style={{ width: "171px", padding: "12px 0 12px 8px" }}>
                      Trạng thái hoạt động
                    </th>
                    <th style={{ width: "145px", padding: "12px 0 12px 8px" }}>
                      Trạng thái kết nối
                    </th>
                    <th style={{ width: "268px" }}>Dịch vụ sử dụng</th>
                    <th style={{ width: "82px" }}></th>
                    <th style={{ width: "106px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((device: any) => {
                    return (
                      <tr key={device.id}>
                        <td
                          style={{
                            padding: "14px 0 14px 16px",
                            textAlign: "left",
                          }}
                        >
                          {device.deviceId}
                        </td>
                        <td
                          style={{
                            padding: "14px 0 14px 8px",
                            textAlign: "left",
                          }}
                        >
                          {device.deviceName}
                        </td>
                        <td
                          style={{
                            padding: "14px 0 14px 8px",
                            textAlign: "left",
                          }}
                        >
                          {device.ipAddress}
                        </td>
                        <td
                          style={{
                            padding: "14px 0 14px 8px",
                            textAlign: "left",
                          }}
                        >
                          <div className="status-wrap-table">
                            <GoPrimitiveDot
                              className={
                                device.status === "Hoạt động"
                                  ? `status-dot-active`
                                  : `status-dot-notActive`
                              }
                            />{" "}
                            {device.status}
                          </div>
                        </td>
                        <td
                          style={{
                            padding: "14px 0 14px 8px",
                            textAlign: "left",
                          }}
                        >
                          <div className="status-wrap-table">
                            <GoPrimitiveDot
                              className={
                                device.connect === "Kết nối"
                                  ? `status-dot-connect`
                                  : `"status-dot-notconnect"`
                              }
                            />
                            {device.connect}
                          </div>
                        </td>
                        <td>
                          <p className="text-long">{device.service}</p>
                          <div className="table-link-wrap">
                            <a className="table-link">Xem thêm</a>
                            <div className="table-link-hover">
                              <p>{device.service}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <NavLink
                            to={`/devices/${device.id}`}
                            className="table-link"
                          >
                            Chi tiết
                          </NavLink>
                        </td>
                        <td>
                          <NavLink
                            to={`/devices/${device.id}/update`}
                            className="table-link"
                          >
                            Cập nhật
                          </NavLink>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={<AiOutlineCaretLeft className="pre-icon" />}
                nextLabel={<AiOutlineCaretRight className="next-icon" />}
                breakLabel={"..."}
                pageCount={10}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                breakClassName={"page-break"}
                activeClassName={"active"}
                previousClassName={"previous"}
                nextClassName={"next"}
              />
            </Col>
            <Col span={2}>
              <AddButon location={"AddDevice"} name={"Thêm thiết bị"} />
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default Devices;
