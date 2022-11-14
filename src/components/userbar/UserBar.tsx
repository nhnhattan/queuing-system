import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loadQueuingBar } from "../../redux/actions/action";

import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../firebase";
import {
  collection,
  updateDoc,
  getDocs,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

import { Row } from "antd";
import "antd/dist/antd.css";

import { IoMdNotifications } from "react-icons/io";
import "./userbar.css";

const UserBar = ({ pe, left }: any) => {
  const [user]: any = useAuthState(auth);
  const userEmail: any = localStorage.getItem("user");
  const userDoc = collection(db, "users");
  const [accountUser, setAccountUser]: any = useState({
    id: "",
    email: "",
    password: "",
    username: "",
    name: "",
    phone: "",
    status: "",
    avatar: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const queuingNoti: [] = useSelector((state: any) => state.posts.queuing2);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();
  const [noti, setNoti]: any = useState([
    {
      queuingId: "",
      nameClient: "",
      service: "",
      timeGiven: "",
      timeOut: "",
      status: "",
      supply: "",
    },
  ]);

  useEffect(() => {
    dispatch(loadQueuingBar());
  }, [queuingNoti]);
  useEffect(()=> {
    if (queuingNoti !== undefined) {
      setNoti(queuingNoti);
    }
  }, [])

  let accountId: any;
  useEffect(() => {
    const getAccountInfo = async () => {
      const q: any = query(userDoc, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        accountId = doc.id;
        setAccountUser(doc.data());
      });
    };
    getAccountInfo();
  }, []);

  const handleNoti = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Row style={{ background: "none" }}>
        <div className="user-wrap">
          <div>
            <div className="noti-icon" onClick={handleNoti}>
              <IoMdNotifications />
            </div>
            {isOpen ? (
              <div
                className="noti-user-box"
                id="scroll-noti"
                style={{ left: left }}
              >
                <div className="noti-user-box-header"></div>
                <div className="noti-user-box-body">
                  <ul className="noti-user-box-list">
                    {noti?.map((notifi: any) => {
                      return (
                        <div className="noti-user-box-item">
                          <li>
                            <p>Người dùng: {notifi.nameClient}</p>
                            <p>Thời gian nhận số: {notifi.timeGiven}</p>
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <Link
            to={"/userInfo"}
            className="user-box"
            style={{ pointerEvents: pe }}
          >
            <img
              src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
              alt=""
              className="avatar-user"
            />
            <div className="user-welcome">
              <p>Xin chào</p>
              <h4>{accountUser.name}</h4>
            </div>
          </Link>
        </div>
      </Row>
    </div>
  );
};

export default UserBar;
