import React, { useState, useEffect } from "react";

import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { storage } from "../../firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  listAll,
  list,
} from "firebase/storage";
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
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { Row, Col } from "antd";
import "antd/dist/antd.css";

import { FaChevronRight } from "react-icons/fa";

import UserBar from "../userbar/UserBar";
import "./userinfo.css";
const UserInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage]: any = useState(null);
  const [imageUrls, setImageUrls]: any = useState([]);
  const [url, setUrl]: any = useState(null);
  const [user]: any = useAuthState(auth);
  const accountDoc: any = collection(db, "users");
  let accountId: any = "";
  const [account, setAccount]: any = useState([""]);
  const userEmail: any = localStorage.getItem("user");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://jbi-global.atlassian.net/wiki/aa-avatar/6253d678a8727100691fb7dc"
  );

  useEffect(() => {
    const getAccountInfo = async () => {
      const q: any = query(accountDoc, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        accountId = doc.id;
        setAccount(doc.data());
      });
    };
    getAccountInfo();
  }, [account]);

  const handleImageChange = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  

  const handleUpload = async () => {
    // const imageRef = ref(storage, "image");
    // uploadBytes(imageRef, image)
    //   .then(() => {
    //     getDownloadURL(imageRef)
    //       .then((url) => {
    //         setUrl(url);
    //       })
    //       .catch((error) => {
    //         console.log(error.message, "error getting the image url");
    //       });
    //     const q: any = doc(db, "users", accountId);
    //     updateDoc(q, {
    //       avatar: String(url),
    //     });
    //     setImage(null);
    //     setIsOpen(false);
    //     alert("Tải lên thành công");
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
    const imagesListRef = ref(storage, "images/");
    const uploadFile = () => {
      if (image == null) return;
      const imageRef = ref(storage, `${account.email}.png`);
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setImageUrls((prev: any) => [...prev, url]);
            setUrl(url);
          })
          .then(() => {
            alert("Tải ảnh lên thành công");
          })
          .then(() => {
            if (url === null) {
              alert("Cập nhật ảnh đại diện thất bại");
            } else {
              const q: any = doc(db, "users", accountId);
              updateDoc(q, {
                avatar: String(url),
              }).then(() => {
                alert("Cập nhật thành công");
                setImage(null);
                setIsOpen(false);
              });
            }
          });
      });
    };
    uploadFile();
  };

  return (
    <div>
      <Col
        span={20}
        style={{ background: "#F6F6F6", minWidth: "1240px", minHeight: 810 }}
      >
        <div className="device-box">
          <Row style={{ width: "100%" }}>
            <Col span={18}>
              <div className="location-box">
                <h1 className="location-user">Thông tin cá nhân</h1>
              </div>
            </Col>
            <Col
              span={6}
              style={{
                width: "350px",
                maxWidth: "450px",
              }}
            >
              <UserBar pe="none" />
            </Col>
          </Row>
          <Row style={{ marginTop: "110px" }}>
            <div className="user-info-box">
              <Row>
                <Col span={6} className="col-avatar-user">
                  <div className="user-img-input-wrap">
                    <div
                      className="user-img-input"
                      style={
                        account.avatar === null
                          ? {
                              backgroundImage: `url(https://jbi-global.atlassian.net/wiki/aa-avatar/6253d678a8727100691fb7dc)`,
                            }
                          : account.avatar === ""
                          ? {
                              backgroundImage: `url(https://jbi-global.atlassian.net/wiki/aa-avatar/6253d678a8727100691fb7dc)`,
                            }
                          : { backgroundImage: `url(${account.avatar})` }
                      }
                    ></div>
                    <div
                      className="user-img-upload-wrap"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      <svg
                        width="26"
                        height="22"
                        viewBox="0 0 26 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M15.85 0.75C16.3747 0.750136 16.8861 0.915357 17.3116 1.22226C17.7372 1.52916 18.0554 1.96219 18.2213 2.46L18.9 4.5H21.75C22.7446 4.5 23.6984 4.89509 24.4017 5.59835C25.1049 6.30161 25.5 7.25544 25.5 8.25V18.25C25.5 19.2446 25.1049 20.1984 24.4017 20.9017C23.6984 21.6049 22.7446 22 21.75 22H4.25C3.25544 22 2.30161 21.6049 1.59835 20.9017C0.895088 20.1984 0.5 19.2446 0.5 18.25V8.25C0.5 7.25544 0.895088 6.30161 1.59835 5.59835C2.30161 4.89509 3.25544 4.5 4.25 4.5H7.1L7.77875 2.46C7.94462 1.96199 8.26304 1.52881 8.68887 1.22189C9.1147 0.914973 9.62634 0.749874 10.1512 0.75H15.8488H15.85ZM15.85 3.25H10.15L9.47125 5.29C9.30538 5.78801 8.98696 6.22118 8.56113 6.52811C8.1353 6.83503 7.62366 7.00013 7.09875 7H4.25C3.91848 7 3.60054 7.1317 3.36612 7.36612C3.1317 7.60054 3 7.91848 3 8.25V18.25C3 18.5815 3.1317 18.8995 3.36612 19.1339C3.60054 19.3683 3.91848 19.5 4.25 19.5H21.75C22.0815 19.5 22.3995 19.3683 22.6339 19.1339C22.8683 18.8995 23 18.5815 23 18.25V8.25C23 7.91848 22.8683 7.60054 22.6339 7.36612C22.3995 7.1317 22.0815 7 21.75 7H18.9C18.3753 6.99986 17.8639 6.83464 17.4384 6.52774C17.0128 6.22084 16.6946 5.78781 16.5287 5.29L15.85 3.25ZM9.875 12.625C9.875 11.7962 10.2042 11.0013 10.7903 10.4153C11.3763 9.82924 12.1712 9.5 13 9.5C13.8288 9.5 14.6237 9.82924 15.2097 10.4153C15.7958 11.0013 16.125 11.7962 16.125 12.625C16.125 13.4538 15.7958 14.2487 15.2097 14.8347C14.6237 15.4208 13.8288 15.75 13 15.75C12.1712 15.75 11.3763 15.4208 10.7903 14.8347C10.2042 14.2487 9.875 13.4538 9.875 12.625ZM13 7C11.5082 7 10.0774 7.59263 9.02252 8.64752C7.96763 9.70242 7.375 11.1332 7.375 12.625C7.375 14.1168 7.96763 15.5476 9.02252 16.6025C10.0774 17.6574 11.5082 18.25 13 18.25C14.4918 18.25 15.9226 17.6574 16.9775 16.6025C18.0324 15.5476 18.625 14.1168 18.625 12.625C18.625 11.1332 18.0324 9.70242 16.9775 8.64752C15.9226 7.59263 14.4918 7 13 7Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="avatar-user-content">{account.name}</p>
                </Col>
                <Col span={8} className="user-info-colleft">
                  <div className="user-label-box">
                    <label className="user-label-content">
                      Tên người dùng:
                    </label>
                    <input
                      type="text"
                      value={account.name}
                      className="input-box-user"
                    />
                  </div>
                  <div className="user-label-box">
                    <label className="user-label-content">Số điện thoại:</label>
                    <input
                      type="text"
                      value={account.phone}
                      className="input-box-user"
                    />
                  </div>
                  <div className="user-label-box" style={{ marginBottom: 0 }}>
                    <label className="user-label-content">Email:</label>
                    <input
                      type="text"
                      value={account.email}
                      className="input-box-user"
                    />
                  </div>
                </Col>
                <Col span={8} className="user-info-colright">
                  <div className="user-label-box">
                    <label className="user-label-content">Tên đăng nhập:</label>
                    <input
                      type="text"
                      value={account.username}
                      className="input-box-user"
                    />
                  </div>
                  <div className="user-label-box">
                    <label className="user-label-content">Mật khẩu:</label>
                    <input
                      type="text"
                      value={account.password}
                      className="input-box-user"
                    />
                  </div>
                  <div className="user-label-box" style={{ marginBottom: 0 }}>
                    <label className="user-label-content">Vai trò:</label>
                    <input
                      type="text"
                      value={account.role}
                      className="input-box-user"
                    />
                  </div>
                </Col>
              </Row>

              {isOpen ? (
                <div>
                  <input
                    className="input-picture"
                    type="file"
                    onChange={handleImageChange}
                  ></input>
                  <button onClick={handleUpload}>Upload</button>
                </div>
              ) : (
                ""
              )}
            </div>
          </Row>
        </div>
      </Col>
    </div>
  );
};

export default UserInfo;
