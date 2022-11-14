import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";

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

import { useDispatch, useSelector } from "react-redux";
import { loadServices, loadSingleService, searchService } from "../../redux/actions/action";

import { Row, Col } from "antd";
import "antd/dist/antd.css";

import { FaChevronRight, FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";

import UserBar from "../userbar/UserBar";
import Dropdown from "../dropdown/Dropdown";
import DatePicker from "../datepicker/DatePicker";
import AddButon from "../addButton/AddButon";
import Search from "../search/Search";
import "./service.css";
import "../search/search.css";
import "./tableService.css";

const Services = () => {
  const [status, setStatus] = useState("Tất cả");
  const statusArray = ["Tất cả", "Hoạt động", "Ngưng hoạt động"];
  const [services, setServices] = useState([""]);
  const [inputSearch, setInputSearch] = useState("")
  const serviceData: [] = useSelector((state: any) => state.posts.services);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (status === "Tất cả") {
      dispatch(loadServices());
      
    } else if (status !== "Tất cả") {
      dispatch(loadSingleService(status));
    }
  }, [status]);

  useEffect(() => {
    if (inputSearch === "") {
      dispatch(loadServices());
      
    } else {
      dispatch(searchService(inputSearch));
    }
  }, [inputSearch]);

  useEffect(() => {
    if (serviceData !== undefined) {
      setServices(serviceData);
    }
  }, [serviceData]);
  const handlePageClick = async (data: any) => {
    if (data.selected !== 0) {
      const first = query(
        collection(db, "service"),
        orderBy("serviceId"),
        limit(data.selected * 8)
      );
      const documentSnapshots = await getDocs(first);
      console.log("----------", data.selected + 1);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // console.log("last", lastVisible);
      const next = query(
        collection(db, "service"),
        orderBy("serviceId"),
        startAfter(lastVisible),
        limit(8)
      );
      const dbGetDocs1: any = await getDocs(next);
      const dataRole = await dbGetDocs1.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (dataRole !== undefined) {
        setServices(dataRole);
      }
    } else if (data.selected === 0) {
      const first = query(collection(db, "service"), orderBy("serviceId"), limit(8));
      const documentSnapshots = await getDocs(first);
      const dataRole = await documentSnapshots.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (dataRole !== undefined) {
        setServices(dataRole);
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
                <p>Dịch vụ</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">Danh sách dịch vụ</p>
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
            <h1 className="device-content">Quản lý dịch vụ</h1>
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
                <DatePicker />
              </div>
              <Search inputSearch={inputSearch} setInputSearch={setInputSearch} />
            </Col>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col span={22}>
              <table className="content-table">
                <thead>
                  <tr>
                    <th style={{ width: "150px" }}>Mã dịch vụ</th>
                    <th style={{ width: "224px", paddingLeft: 17 }}>
                      Tên dịch vụ{" "}
                    </th>
                    <th style={{ width: "230px", paddingLeft: 17 }}>Mô tả</th>
                    <th style={{ width: "253px", paddingLeft: 17 }}>
                      Trạng thái hoạt động
                    </th>
                    <th style={{ width: "125px" }}></th>
                    <th style={{ width: "125px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service: any) => {
                    return (
                      <tr>
                        <td>{service.serviceId}</td>
                        <td style={{ paddingLeft: 17 }}>{service.name}</td>
                        <td style={{ paddingLeft: 17 }}>
                          {service.description}
                        </td>
                        <td>
                          <div className="status-wrap-table">
                            <GoPrimitiveDot
                              className={
                                service.status === "Hoạt động"
                                  ? `status-dot-active`
                                  : `status-dot-notActive`
                              }
                            />{" "}
                            {service.status}
                          </div>
                        </td>
                        <td style={{ textAlign: "left", paddingLeft: 17 }}>
                          <NavLink
                            to={`/services/${service.id}`}
                            className="table-link"
                          >
                            Chi tiết
                          </NavLink>
                        </td>
                        <td style={{ textAlign: "left", paddingLeft: 17 }}>
                          <NavLink
                            to={`/services/${service.id}/update`}
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
              <AddButon location={"AddService"} name={"Thêm dịch vụ"} />
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default Services;
