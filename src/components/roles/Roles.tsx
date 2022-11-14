import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { loadRoles, searchRoles } from "../../redux/actions/action";

import { db } from "../../firebase";
import {
  doc,
  getDocs,
  collection,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

import { Row, Col } from "antd";
import "antd/dist/antd.css";

import { FaChevronRight } from "react-icons/fa";
import { AiOutlineCaretRight, AiOutlineCaretLeft } from "react-icons/ai";

import UserBar from "../userbar/UserBar";
import Search from "../search/Search";
import AddButon from "../addButton/AddButon";

import "./role.css";
import "./tableRole.css";
import { Link } from "react-router-dom";

type roleProps = string[];
const Roles = () => {
  const roleDoc = collection(db, "role");
  const [roles, setRoles] = useState([""]);
  let count: number = 0;

  const rolesData = useSelector((state: any) => state.posts.role);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();
  const [inputSearch, setInputSearch] = useState("");
  useEffect(() => {
    if (inputSearch === "") {
      dispatch(loadRoles());
    } else {
      dispatch(searchRoles(inputSearch));
    }
  }, [inputSearch]);

  useEffect(() => {
    if (rolesData !== undefined) {
      setRoles(rolesData);
    }
  }, [rolesData]);

  const handlePageClick = async (data: any) => {
    if (data.selected !== 0) {
      const first = query(
        collection(db, "role"),
        orderBy("name"),
        limit(data.selected * 8)
      );
      const documentSnapshots = await getDocs(first);
      console.log("----------", data.selected + 1);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // console.log("last", lastVisible);
      const next = query(
        collection(db, "role"),
        orderBy("name"),
        startAfter(lastVisible),
        limit(8)
      );
      const dbGetDocs1: any = await getDocs(next);
      const dataRole = await dbGetDocs1.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (dataRole !== undefined) {
        setRoles(dataRole);
      }
    } else if (data.selected === 0) {
      const first = query(collection(db, "role"), orderBy("name"), limit(8));
      const documentSnapshots = await getDocs(first);
      const dataRole = await documentSnapshots.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (dataRole !== undefined) {
        setRoles(dataRole);
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
                <p className="location">Quản lý vai trò</p>
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
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className="device-content">Danh sách vai trò</h1>
            <Search inputSearch={inputSearch} setInputSearch={setInputSearch} />
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col span={22}>
              <table className="content-table">
                <thead>
                  <tr>
                    <th style={{ width: "224px" }}>Tên vai trò</th>
                    <th style={{ width: "224px" }}>Số người dùng</th>
                    <th style={{ width: "537px" }}>Mô tả</th>
                    <th style={{ width: "125px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role: any) => {
                    return (
                      <tr key={role.id} id={role.id}>
                        <td>{role.name}</td>
                        <td>6</td>
                        <td>{role.description}</td>
                        <td style={{ textAlign: "center", padding: 0 }}>
                          <Link to={`/roles/${role.id}`} className="table-link">
                            Cập nhật
                          </Link>
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
              <AddButon location={"AddRole"} name={"Thêm vai trò"} />
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default Roles;
