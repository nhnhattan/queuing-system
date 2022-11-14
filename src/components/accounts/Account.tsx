import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";
import { Link, NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  loadAccount,
  loadSingleAccount,
  searchAccount,
  loadAllAccount,
} from "../../redux/actions/action";

import { db } from "../../firebase";
import {
  doc,
  getDocs,
  collection,
  getDoc,
  query,
  where,
  limit,
  startAfter,
  orderBy,
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

import "./account.css";
import "./tableAccount.css";

const Accounts = () => {
  const roleDoc = collection(db, "role");

  const [role, setRole] = useState("Tất cả");
  const roleArray: any = ["Tất cả"];
  const [rolesArray, setRolesArray]: any = useState([]);

  useEffect(() => {
    const getRoles = async () => {
      const orderDoc: any = query(roleDoc, orderBy("name"));
      const data: any = await getDocs(orderDoc);
      setRolesArray(
        data.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getRoles();
  }, []);

  rolesArray.map((role: any) => {
    roleArray.push(role.name);
  });

  const accountAllData = useSelector((state: any) => state.posts.account);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();
  const [inputSearch, setInputSearch] = useState("");
  const [allAcc, setAllAcc]: any = useState([
    {
      id: "",
      email: "",
      password: "",
      username: "",
      name: "",
      phone: "",
      status: "",
      avatar: "",
    },
  ]);

  useEffect(() => {
    if (role === "Tất cả") {
      dispatch(loadAccount());
    } else {
      dispatch(loadSingleAccount(role));
    }
  }, [role]);

  useEffect(() => {
    if (inputSearch === "") {
      dispatch(loadAccount());
    } else {
      dispatch(searchAccount(inputSearch));
    }
  }, [inputSearch]);

  useEffect(() => {
    if (accountAllData !== undefined) {
      setAllAcc(accountAllData);
    }
  }, [accountAllData]);

  const handlePageClick = async (data: any) => {
    if (data.selected !== 0) {
      const first = query(
        collection(db, "users"),
        orderBy("name"),
        limit(data.selected * 8)
      );
      const documentSnapshots = await getDocs(first);
      console.log("----------", data.selected + 1);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // console.log("last", lastVisible);
      const next = query(
        collection(db, "users"),
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
        setAllAcc(dataRole);
      }
    } else if (data.selected === 0) {
      const first = query(collection(db, "users"), orderBy("name"), limit(8));
      const documentSnapshots = await getDocs(first);
      const dataRole = await documentSnapshots.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (dataRole !== undefined) {
        setAllAcc(dataRole);
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
                <p className="location">Quản lý tài khoản</p>
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
            <h1 className="device-content">Danh sách tài khoản</h1>
          </Row>
          <Row style={{ marginTop: "16px" }}>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ marginRight: "24px" }}>
                  <p className="filter-content">Tên vai trò</p>
                  <Dropdown
                    selected={role}
                    setSelected={setRole}
                    options={roleArray}
                    width={"300px"}
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
                    <th style={{ width: "150px" }}>Tên đăng nhập</th>
                    <th style={{ width: "166px" }}>Họ tên</th>
                    <th style={{ width: "130px" }}>Số điện thoại</th>
                    <th style={{ width: "255px" }}>Email</th>
                    <th style={{ width: "114px" }}>Vai trò</th>
                    <th style={{ width: "193px" }}>Trạng thái hoạt động</th>
                    <th style={{ width: "99px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {allAcc.map((account: any) => {
                    return (
                      <tr key={account.id}>
                        <td>{account.username}</td>
                        <td>{account.name}</td>
                        <td>{account.phone}</td>
                        <td>{account.email}</td>
                        <td style={{ textAlign: "left" }}>{account.role}</td>
                        <td>
                          <div className="status-wrap-table">
                            <GoPrimitiveDot
                              className={
                                account.status === "Hoạt động"
                                  ? "status-dot-active"
                                  : "status-dot-notActive"
                              }
                            />{" "}
                            {account.status}
                          </div>
                        </td>
                        <td style={{ padding: 0 }}>
                          <NavLink
                            to={`/accounts/${account.id}`}
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
              <AddButon location={"AddAccount"} name={"Thêm tài khoản"} />
            </Col>
          </Row>
        </div>
      </Col>
    </>
  );
};

export default Accounts;
