import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";

import { useDispatch, useSelector } from "react-redux";
import { loadDiary } from "../../redux/actions/action";

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

import { FaChevronRight } from "react-icons/fa";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";

import UserBar from "../userbar/UserBar";
import Search from "../search/Search";
import DatePicker from "../datepicker/DatePicker";

import "./tableDiary.css";
import "./diary.css";

const Diary = () => {
  const userEmail: any = localStorage.getItem("user");

  const diaryData: [] = useSelector((state: any) => state.posts.diary);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();
  const [diary, setDiary] = useState([
    {
      email: "",
      timeReport: "",
      ipAddress: "",
      hourReport: "",
      action: "",
      timeReportSearch: "",
    },
  ]);
  useEffect(() => {
    dispatch(loadDiary(userEmail));
    if (diaryData !== undefined) {
      setDiary(diaryData);
    }
  }, [diaryData]);

  const handlePageClick = async (data: any) => {
    if (data.selected !== 0) {
      const first = query(
        collection(db, "reports"),
        limit(data.selected * 8)
      );
      const documentSnapshots = await getDocs(first);
      console.log("----------", data.selected + 1);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // console.log("last", lastVisible);
      const next = query(
        collection(db, "reports"),
        startAfter(lastVisible),
        limit(8)
      );
      const dbGetDocs1: any = await getDocs(next);
      const dataRole = await dbGetDocs1.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (dataRole !== undefined) {
        setDiary(dataRole);
      }
    } else if (data.selected === 0) {
      const first = query(
        collection(db, "reports"),
        limit(8)
      );
      const documentSnapshots = await getDocs(first);
      const dataRole = await documentSnapshots.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (dataRole !== undefined) {
        setDiary(dataRole);
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
                <p>Cài đặt hệ thống</p>
                <p>
                  <FaChevronRight className="location-icon" />
                </p>
                <p className="location">Nhật ký hoạt động</p>
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
          <Row style={{ marginTop: "45px" }}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <DatePicker />
              <Search />
            </Col>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col span={22}>
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Tên đăng nhập</th>
                    <th>Thời gian tác động</th>
                    <th>IP thực hiện</th>
                    <th>Thao tác thực hiện</th>
                  </tr>
                </thead>
                <tbody>
                  {diary.map((dia: any) => {
                    return (
                      <tr>
                        <td>{dia.email}</td>
                        <td>{dia.timeReport} {dia.hourReport}</td>
                        <td>{dia.ipAddress}</td>
                        <td>{dia.action}</td>
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
          </Row>
        </div>
      </Col>
    </>
  );
};

export default Diary;
