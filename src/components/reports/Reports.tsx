import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";

import { useDispatch, useSelector } from "react-redux";
import {
  loadQueuing,
  dateStartQueuing,
  dateEndQueuing,
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

import { FaChevronRight, FaSort } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";
import { HiDocumentArrowDown } from "react-icons/hi2";

import UserBar from "../userbar/UserBar";
import DatePicker from "../datepicker/DatePicker";

import "./report.css";
import "./tableReport.css";

const Reports = () => {
  const queuingDoc = collection(db, "queuing");
  const [queuing, setQueuing] = useState([""]);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const queuingData: [] = useSelector((state: any) => state.posts.queuing1);
  const serviceData: [] = useSelector((state: any) => state.posts.services);

  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (dateStart === "") {
      dispatch(loadQueuing());
    } else if (dateStart !== "") {
      dispatch(dateStartQueuing(dateStart));
    }
  }, [dateStart]);
  useEffect(() => {
    if (dateEnd === "") {
      dispatch(loadQueuing());
    } else if (dateEnd !== "") {
      dispatch(dateEndQueuing(dateEnd));
    }
  }, [dateEnd]);

  useEffect(() => {
    if (queuingData !== undefined) {
      setQueuing(queuingData);
    }
  }, [queuingData]);

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
      const first = query(
        collection(db, "queuing"),
        orderBy("queuingId"),
        limit(8)
      );
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
                <p>Báo cáo</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">Lập báo cáo</p>
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
          <Row style={{ marginTop: "45px" }}></Row>
          <Row style={{ marginTop: "16px" }}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <DatePicker
                  dateStart={dateStart}
                  setDateStart={setDateStart}
                  dateEnd={dateEnd}
                  setDateEnd={setDateEnd}
                />
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col span={22}>
              <table className="content-table">
                <thead>
                  <tr>
                    <th
                      style={{
                        width: "226px",
                        paddingLeft: 16,
                        paddingRight: 18,
                      }}
                    >
                      <div className="table-row-sort">
                        Số thứ tự <FaSort />
                      </div>
                    </th>
                    <th
                      style={{
                        width: "232px",
                        paddingLeft: 16,
                        paddingRight: 18,
                      }}
                    >
                      <div className="table-row-sort">
                        Tên dịch vụ <FaSort />
                      </div>
                    </th>
                    <th
                      style={{
                        width: "238px",
                        paddingLeft: 16,
                        paddingRight: 18,
                      }}
                    >
                      <div className="table-row-sort">
                        Thời gian cấp <FaSort />
                      </div>
                    </th>
                    <th
                      style={{
                        width: "216px",
                        paddingLeft: 16,
                        paddingRight: 18,
                      }}
                    >
                      <div className="table-row-sort">
                        Tình trạng <FaSort />
                      </div>
                    </th>
                    <th
                      style={{
                        width: "196px",
                        paddingLeft: 16,
                        paddingRight: 18,
                      }}
                    >
                      <div className="table-row-sort">
                        Nguồn cấp <FaSort />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {queuing.map((que: any) => {
                    return (
                      <tr>
                        <td style={{ paddingLeft: 17 }}>{que.queuingId}</td>
                        <td style={{ paddingLeft: 17 }}>{que.service}</td>
                        <td style={{ paddingLeft: 17 }}>
                          {que.hourGive} - {que.timeGiven}
                        </td>
                        <td style={{ paddingLeft: 17, textAlign: "left" }}>
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
              <div className="add-btn-wrap">
                <div className="add-btn-icon-wrap">
                  <HiDocumentArrowDown className="add-btn-icon" />
                </div>
                <p>Tải về</p>
              </div>
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default Reports;
