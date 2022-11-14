import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  loadQueuing,
  loadServices,
  loadStatusQueuing,
  loadSupplyQueuing,
  loadServiceQueuing,
  loadStaSupQueuing,
  loadSerStaQueuing,
  loadSerSupQueuing,
  loadTripleQueuing,
  searchQueuing,
  dateStartQueuing,
  dateEndQueuing
} from "../../redux/actions/action";

import { db } from "../../firebase";
import {
  collection,
  addDoc,
  orderBy,
  query,
  where,
  limit,startAfter,
  getDocs,
} from "firebase/firestore";

import ReactPaginate from "react-paginate";

import { Link, NavLink } from "react-router-dom";
import { Row, Col } from "antd";
import "antd/dist/antd.css";

import { FaChevronRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { IoCalendarClearOutline } from "react-icons/io5";

import UserBar from "../userbar/UserBar";
import Dropdown from "../dropdown/Dropdown";
import DatePicker from "../datepicker/DatePicker";
import Search from "../search/Search";
import "./queuing.css";
import "./tableQueuing.css";
import AddButon from "../addButton/AddButon";

const Queuing = () => {
  const [status, setStatus] = useState<string>("Tất cả");
  const [supply, setSupply] = useState<string>("Tất cả");
  const [service, setService] = useState<string>("Tất cả");
  const queuingDoc = collection(db, "queuing");
  const statusArray = ["Tất cả", "Đang chờ", "Đã sử dụng", "Bỏ qua"];
  const supplyAray = ["Tất cả", "Kiosk", "Hệ thống"];
  const [inputSearch, setInputSearch] = useState("")
  const [queuing, setQueuing] = useState([""]);

  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  let startArray: any = [];

  const [serDoc, setSerDoc] = useState([
    {
      serviceId: "",
      name: "",
      description: "",
      status: "",
      auto: {
        autoCheck: false,
        min: 0,
        max: 0,
      },
      prefix: {
        prefixCheck: false,
        prefix: 0,
      },
      surfix: {
        surfixCheck: false,
        surfix: 0,
      },
      reset: false,
    },
  ]);
  const serviceArray: any = ["Tất cả"];

  
  const diaryData: [] = useSelector((state: any) => state.posts.queuing1);
  const serviceData: [] = useSelector((state: any) => state.posts.services);

  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(loadServices());
    if (serviceData !== undefined) {
      setSerDoc(serviceData);
    }
  }, [serviceData]);

  serDoc.map((ser) => {
    serviceArray.push(ser.name);
  });

  useEffect(()=> {
    if(status === "Tất cả" && supply === "Tất cả" && service === "Tất cả") {
      dispatch(loadQueuing())
    } else if (status !== "Tất cả" && supply === "Tất cả" && service === "Tất cả") {
      dispatch(loadStatusQueuing(status))
    } else if (supply !== "Tất cả" && status === "Tất cả" && service === "Tất cả") {
      dispatch(loadSupplyQueuing(supply))
    }  else if (service !== "Tất cả" && supply === "Tất cả" && status === "Tất cả" ) {
      dispatch(loadServiceQueuing(service))
    } else if (status !== "Tất cả" && supply !== "Tất cả" && service === "Tất cả") {
      dispatch(loadStaSupQueuing(status, supply))
    } else if (status !== "Tất cả" && supply === "Tất cả" && service !== "Tất cả") {
      dispatch(loadSerStaQueuing(status, service))
    } else if (status === "Tất cả" && supply !== "Tất cả" && service !== "Tất cả") {
      dispatch(loadSerSupQueuing(supply,service))
    } else if (status !== "Tất cả" && supply !== "Tất cả" && service !== "Tất cả") {
      dispatch(loadTripleQueuing(supply, service, status))
    }
  }, [status, supply, service])

  useEffect(()=> {
    if (inputSearch === "") {
      dispatch(loadQueuing())
    } else {
      dispatch(searchQueuing(inputSearch))
    }
  }, [inputSearch])
  useEffect(()=> {
    if(dateStart === "") {
      dispatch(loadQueuing())
    } else if (dateStart !== "" ){
      dispatch(dateStartQueuing(dateStart))
    }
  }, [dateStart])
  useEffect(()=> {
    if(dateEnd === "") {
      dispatch(loadQueuing())
    } else if (dateEnd !== "" ){
      dispatch(dateEndQueuing(dateEnd))
    }
  }, [dateEnd])
  useEffect(() => {
    if(diaryData !== undefined) {
      setQueuing(diaryData)
    }
  }, [diaryData])

  const handlePageClick = async (data: any) => {
    if (data.selected !== 0) {
      const first = query(
        collection(db, "queuing"),
        orderBy("queuingId"),
        limit(data.selected * 8)
      );
      const documentSnapshots = await getDocs(first);
      console.log("----------", data.selected + 1);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // console.log("last", lastVisible);
      const next = query(
        collection(db, "queuing"),
        orderBy("queuingId"),
        startAfter(lastVisible),
        limit(8)
      );
      const dbGetDocs1: any = await getDocs(next);
      const dataRole = await dbGetDocs1.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (dataRole !== undefined) {
        setQueuing(dataRole);
      }
    } else if (data.selected === 0) {
      const first = query(collection(db, "queuing"), orderBy("queuingId"), limit(8));
      const documentSnapshots = await getDocs(first);
      const dataRole = await documentSnapshots.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (dataRole !== undefined) {
        setQueuing(dataRole);
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
                <p>Cấp số</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">Danh sách cấp số</p>
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
            <h1 className="device-content">Quản lý cấp số</h1>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ marginRight: "24px" }}>
                  <p className="filter-content">Tên dịch vụ</p>
                  <Dropdown
                    selected={service}
                    setSelected={setService}
                    options={serviceArray}
                    width={"154px"}
                  />
                </div>
                <div style={{ marginRight: "24px" }}>
                  <p className="filter-content">Tình trạng</p>
                  <Dropdown
                    selected={status}
                    setSelected={setStatus}
                    options={statusArray}
                    width={"154px"}
                  />
                </div>
                <div style={{ marginRight: "24px" }}>
                  <p className="filter-content">Nguồn cấp</p>
                  <Dropdown
                    selected={supply}
                    setSelected={setSupply}
                    options={supplyAray}
                    width={"154px"}
                  />
                </div>
                <DatePicker
                  dateStart={dateStart}
                  setDateStart={setDateStart}
                  dateEnd={dateEnd}
                  setDateEnd={setDateEnd}
                />
              </div>
              <Search inputSearch={inputSearch} setInputSearch={setInputSearch} />
            </Col>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col span={22}>
              <table className="content-table">
                <thead>
                  <tr>
                    <th style={{ width: "93px", paddingLeft: 17 }}>STT</th>
                    <th style={{ width: "162px", paddingLeft: 17 }}>
                      Tên khách hàng
                    </th>
                    <th style={{ width: "171px", paddingLeft: 17 }}>
                      Tên dịch vụ{" "}
                    </th>
                    <th style={{ width: "161px", paddingLeft: 17 }}>
                      Thời gian cấp
                    </th>
                    <th style={{ width: "174px", paddingLeft: 17 }}>
                      Hạn sử dụng
                    </th>
                    <th style={{ width: "147px", paddingLeft: 17 }}>
                      Trạng thái
                    </th>
                    <th style={{ width: "120px", paddingLeft: 17 }}>
                      Nguồn cấp
                    </th>
                    <th style={{ width: "78px", paddingLeft: 17 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {queuing.map((que: any) => {
                    return (
                      <tr key={que.id}>
                        <td style={{ paddingLeft: 17 }}>{que.queuingId}</td>
                        <td style={{ paddingLeft: 17 }}>{que.nameClient}</td>
                        <td style={{ paddingLeft: 17 }}>{que.service}</td>
                        <td style={{ paddingLeft: 17, textAlign: "left" }}>
                          {que.timeGiven}
                        </td>
                        <td style={{ paddingLeft: 17, textAlign: "left" }}>
                          {que.timeOut}
                        </td>
                        <td style={{ paddingLeft: 17 }}>
                          <div className="status-wrap-table">
                            <GoPrimitiveDot
                              className={
                                que.status === "Bỏ qua"
                                  ? `status-dot-passing`
                                  : que.status === "Đang chờ"
                                  ? `status-dot-waiting`
                                  : `status-dot-used`
                              }
                            />{" "}
                            {que.status}
                          </div>
                        </td>
                        <td style={{ paddingLeft: 17, textAlign: "left" }}>
                          {que.supply}
                        </td>
                        <td>
                          <NavLink
                            to={`/queuing/${que.id}`}
                            className="table-link"
                          >
                            Chi tiết
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
              <AddButon location={"AddQueuing"} name={"Cấp số mới"} />
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default Queuing;
