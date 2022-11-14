import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  loadQueuingDash,
  loadDevicesDash,
  loadServicesDash,
} from "../../redux/actions/action";

import { db } from "../../firebase";
import {
  collection,
  addDoc,
  orderBy,
  query,
  where,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";

import {
  CircularProgressbar,
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { BsCalendar, BsCalendarCheck, BsBookmarkStar } from "react-icons/bs";
import { AiOutlineArrowUp } from "react-icons/ai";
import { TbUser } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FaRegComments } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";

import { Area as Area1 } from "@ant-design/plots";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Row, Col } from "antd";
import "antd/dist/antd.css";

import UserBar from "../userbar/UserBar";
import Dropdown from "../dropdown/Dropdown";

import { Calendar } from "react-calendar";
import "moment/locale/en-gb";
import "../calendar/calendar.css";

import "./styles/dashboard.css";
const Dashboard = () => {
  const [dateSelect, setDateSelect] = useState("Ngày");
  const dateArray = ["Ngày", "Tháng", "Năm"];
  var d = new Date();

  // const config = {
  //   data,
  //   width: 200,
  //   height: 300,
  //   xField: "name",
  //   yField: "sl",
  //   xAxis: {
  //     range: [0, 1],
  //     tickCount: 5,
  //   },
  //   areaStyle: () => {
  //     return {
  //       fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
  //     };
  //   },
  //   smooth: true,
  // };

  const queuingData: [] = useSelector((state: any) => state.posts.queuingdash);
  const [queuing, setQueuing]: any = useState([
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
  const serviceData: [] = useSelector((state: any) => state.posts.servicedash);
  const [service, setService]: any = useState([
    {
      serviceId: "",
      name: "name",
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
  const deviceData: [] = useSelector((state: any) => state.posts.devicedash);
  const [device, setDevice] = useState([
    {
      deviceId: "",
      deviceName: "",
      ipAddress: "",
      device: "",
      username: "",
      password: "",
      connect: "",
      status: "",
      service: "",
    },
  ]);
  const requesting = useSelector((state: any) => state.posts.requesting);
  const dispatch: any = useDispatch();
  let usedLength: any = 0;
  let waitLength: any = 0;
  let passLength: any = 0;
  let quelength: any = 0;
  let deviceLength: any = 0;
  let activeDeviceLength: any = 0;
  let nativeDeviceLength: any = 0;
  let serviceLength: any = 0;
  let activeServiceLength: any = 0;
  let nativeServiceLength: any = 0;
  // useEffect(() => {
  //   dispatch(loadQueuingDash());
  //   if (queuingData !== undefined) {
  //     setQueuing(queuingData);
  //   }
  // }, [queuingData]);
  // useEffect(() => {
  //   dispatch(loadServicesDash());
  //   if (serviceData !== undefined) {
  //     setService(serviceData);
  //   }
  //   dispatch(loadDevicesDash());
  //   if (deviceData !== undefined) {
  //     setDevice(deviceData);
  //   }
  // }, [serviceData, deviceData]);

  const getDataDevice = async () => {
    const first = query(collection(db, "devices"));
    const documentSnapshots = await getDocs(first);
    const dataRole = await documentSnapshots.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    if (dataRole !== undefined) {
      setDevice(dataRole);
    }
  };

  const getDataService = async () => {
    const first = query(collection(db, "service"));
    const documentSnapshots = await getDocs(first);
    const dataRole = await documentSnapshots.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    if (dataRole !== undefined) {
      setService(dataRole);
    }
  };

  const getDataQueuing = async () => {
    const first = query(collection(db, "queuing"));
    const documentSnapshots = await getDocs(first);
    const dataRole = await documentSnapshots.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    if (dataRole !== undefined) {
      setQueuing(dataRole);
    }
  };

  useEffect(() => {
    getDataDevice();
    getDataService();
    getDataQueuing();
  }, []);
  if (queuing !== undefined) {
    quelength = queuing.length;
    queuing.map((que: any) => {
      switch (que.status) {
        case "Đang chờ":
          return waitLength++;
        case "Đã sử dụng":
          return usedLength++;
        case "Bỏ qua":
          return passLength++;
      }
    });
  }

  if (service !== undefined) {
    serviceLength = service.length;
    service.map((ser: any) => {
      switch (ser.status) {
        case "Hoạt động":
          return activeServiceLength++;
        case "Ngưng hoạt động":
          return nativeServiceLength++;
      }
    });
  }

  if (device !== undefined) {
    deviceLength = device.length;
    service.map((dev: any) => {
      switch (dev.status) {
        case "Hoạt động":
          return activeDeviceLength++;
        case "Ngưng hoạt động":
          return nativeDeviceLength++;
      }
    });
  }

  let array: any = [];
  const loopmonth = (day: number) => {
    if ((array = null)) {
      for (let i = 1; i <= day; i++) {
        array.push({ day: i, sl: 0 });
      }
    } else {
      array = [];
      for (let i = 1; i <= day; i++) {
        array.push({ day: i, sl: 0 });
      }
    }
  };
  const getMonth = (month: number) => {
    switch (month) {
      case 1:
        return loopmonth(31);
      case 3:
        return loopmonth(31);
      case 4:
        return loopmonth(30);
      case 5:
        return loopmonth(31);
      case 6:
        return loopmonth(30);
      case 7:
        return loopmonth(31);
      case 8:
        return loopmonth(31);
      case 9:
        return loopmonth(30);
      case 10:
        return loopmonth(31);
      case 11:
        return loopmonth(30);
      case 12:
        return loopmonth(31);
    }
  };
  let array2: any = [
    {
      day: "1",
      sl: 0,
    },
    {
      day: "2",
      sl: 0,
    },
    {
      day: "3",
      sl: 0,
    },
    {
      day: "4",
      sl: 0,
    },
  ];

  let array3: any = [
    {
      day: "1",
      sl: 0,
    },
    {
      day: "2",
      sl: 0,
    },
    {
      day: "3",
      sl: 0,
    },
    {
      day: "4",
      sl: 0,
    },
    {
      day: "5",
      sl: 0,
    },
    {
      day: "6",
      sl: 0,
    },
    {
      day: "7",
      sl: 0,
    },
    {
      day: "8",
      sl: 0,
    },
    {
      day: "9",
      sl: 0,
    },
    {
      day: "10",
      sl: 0,
    },
    {
      day: "11",
      sl: 0,
    },
    {
      day: "12",
      sl: 0,
    },
  ];
  const [dateClick, setDateClick] = useState("");
  const [data, setData]: any = useState([""]);
  useEffect(() => {
    getMonth(3);
    queuing.map((que: any) => {
      array.map((day: any) => {
        if (
          3 === Number(que.timeGiven.slice(3, 5)) &&
          2021 === Number(que.timeGiven.slice(6, 10))
        ) {
          if (day.day === Number(que.timeGiven.slice(0, 2))) {
            day.sl++;
          }
        }
      });
    });
    setData(array);
  }, []);
  const handleMonth = (month: any) => {
    switch (month) {
      case "Jan":
        return (month = 1);
      case "Feb":
        return (month = 2);
      case "Mar":
        return (month = 3);
      case "Apr":
        return (month = 4);
      case "May":
        return (month = 5);
      case "Jun":
        return (month = 6);
      case "Jul":
        return (month = 7);
      case "Aug":
        return (month = 8);
      case "Sep":
        return (month = 9);
      case "Oct":
        return (month = 10);
      case "Nov":
        return (month = 11);
      case "Feb":
        return (month = 12);
      default:
        return month;
    }
  };
  
  useEffect(() => {
    if (dateSelect === "Ngày") {
      let month = handleMonth(String(dateClick).slice(4, 7));
      getMonth(month);
      queuing.map((que: any) => {
        array.map((day: any) => {
          if (
            month === Number(que.timeGiven.slice(3, 5)) &&
            2021 === Number(que.timeGiven.slice(6, 10))
          ) {
            if (day.day === Number(que.timeGiven.slice(0, 2))) {
              day.sl++;
            }
          }
        });
      });
      setData(array);
     
    } else if (dateSelect === "Tháng") {
      queuing.map((que: any) => {
      let month = handleMonth(String(dateClick).slice(4, 7));

        if (
          month === Number(que.timeGiven.slice(3, 5)) &&
          Number(String(dateClick).slice(11, 15)) ===
            Number(que.timeGiven.slice(6, 10))
        ) {
          if (Number(que.timeGiven.slice(0, 2)) <= 7) {
            array2[0].sl++;
          } else if (
            Number(que.timeGiven.slice(0, 2)) > 7 &&
            Number(que.timeGiven.slice(0, 2)) <= 14
          ) {
            array2[1].sl++;
          } else if (
            Number(que.timeGiven.slice(0, 2)) > 14 &&
            Number(que.timeGiven.slice(0, 2)) <= 21
          ) {
            array2[2].sl++;
          } else if (Number(que.timeGiven.slice(0, 2)) > 21) {
            array2[3].sl++;
          }
        }
      });

      setData(array2);
    } else if (dateSelect === "Năm") {
      queuing.map((que: any) => {
        array3.map((arr: any) => {
          if (
            Number(String(dateClick).slice(11, 15)) ===
            Number(que.timeGiven.slice(6, 10))
          ) {
            if (Number(que.timeGiven.slice(3, 5)) === Number(arr.day)) {
              arr.sl++;
            }
          }
        });
      });
      setData(array3);
    }
  }, [dateSelect, dateClick]);

  function percentage(partialValue: number, totalValue: number) {
    return ((100 * partialValue) / totalValue).toFixed(2);
  }
  let percentActiveDevice: any = percentage(activeDeviceLength, deviceLength);
  let percentNativeDevice: any = percentage(nativeDeviceLength, deviceLength);
  let percentActiveService: any = percentage(
    activeServiceLength,
    serviceLength
  );
  let percentNativeService: any = percentage(
    nativeServiceLength,
    serviceLength
  );
  let percentWaiting: any = percentage(waitLength, quelength);
  let percentUsed: any = percentage(usedLength, quelength);
  let percentPass: any = percentage(passLength, quelength);

  return (
    <>
      <Col
        span={24}
        style={{
          background: "#F6F6F6",
          paddingLeft: "24px",
          minWidth: "1240px",
        }}
      >
        <Row style={{ width: "1240px" }}>
          <Col span={16} style={{ paddingTop: 30 }}>
            <p className="location">Dashboard</p>
            <Row>
              <h1 className="chart-content">Biểu đồ cấp số</h1>
            </Row>
            <Row>
              <Col
                span={6}
                style={{
                  background: "#FFFFFF",
                  marginRight: "12px",
                  maxWidth: "186px",
                  width: "173px",
                  height: "125px",
                  borderRadius: "10px",
                }}
              >
                <div style={{ padding: "12px" }}>
                  <div className="assigned-number">
                    <div className="assigned-icons-wrap">
                      <BsCalendar className="assigned-icons" />
                    </div>
                    <div>
                      <p className="assigned-text">Số thứ tự</p>
                      <p className="assigned-text"> đã cấp</p>
                    </div>
                  </div>
                  <div className="quantity-box">
                    <p>{quelength}</p>
                    <div className="percent-wrap">
                      <AiOutlineArrowUp className="arrow-icon" />
                      <p>32,41%</p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col
                span={6}
                style={{
                  background: "#FFFFFF",
                  marginRight: "12px",
                  maxWidth: "186px",
                  width: "173px",
                  height: "125px",
                  borderRadius: "10px",
                }}
              >
                <div style={{ padding: "12px" }}>
                  <div className="assigned-number">
                    <div className="used-icons-wrap">
                      <BsCalendarCheck className="used-icons" />
                    </div>
                    <div>
                      <p className="assigned-text">Số thứ tự</p>
                      <p className="assigned-text"> đã sử dụng</p>
                    </div>
                  </div>
                  <div className="quantity-box">
                    <p>{usedLength}</p>
                    <div
                      className="percent-wrap"
                      style={{
                        color: "#E73F3F",
                        background: "rgba(231, 63, 63, 0.15)",
                      }}
                    >
                      <AiOutlineArrowUp className="arrow-icon" />
                      <p>32,41%</p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col
                span={6}
                style={{
                  background: "#FFFFFF",
                  marginRight: "12px",
                  maxWidth: "186px",
                  width: "173px",
                  height: "125px",
                  borderRadius: "10px",
                }}
              >
                <div style={{ padding: "12px" }}>
                  <div className="assigned-number">
                    <div className="wait-icons-wrap">
                      <div>
                        <TbUser className="wait-icons-user" />
                        <IoCall className="wait-icons-call" />
                      </div>
                    </div>
                    <div>
                      <p className="assigned-text">Số thứ tự</p>
                      <p className="assigned-text"> đang chờ</p>
                    </div>
                  </div>
                  <div className="quantity-box">
                    <p>{waitLength}</p>
                    <div className="percent-wrap">
                      <AiOutlineArrowUp className="arrow-icon" />
                      <p>32,41%</p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col
                span={6}
                style={{
                  background: "#FFFFFF",
                  maxWidth: "186px",
                  width: "173px",
                  height: "125px",
                  borderRadius: "10px",
                }}
              >
                <div style={{ padding: "12px" }}>
                  <div className="assigned-number">
                    <div className="skip-icons-wrap">
                      <BsBookmarkStar className="skip-icons" />
                    </div>
                    <div>
                      <p className="assigned-text">Số thứ tự</p>
                      <p className="assigned-text"> đã bỏ qua </p>
                    </div>
                  </div>
                  <div className="quantity-box">
                    <p>{passLength}</p>
                    <div
                      className="percent-wrap"
                      style={{
                        color: "#E73F3F",
                        background: "rgba(231, 63, 63, 0.15)",
                      }}
                    >
                      <AiOutlineArrowUp className="arrow-icon" />
                      <p>32,41%</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <div
                style={{
                  background: "#FFFFFF",
                  width: "780px",
                  marginTop: "16px",
                  borderRadius: "12px",
                }}
              >
                <div className="report-chart-box">
                  <div className="report-chart-content">
                    <p>Bảng thống kê theo ngày</p>
                    <p>
                      Tháng {d.getMonth()}/{d.getFullYear()}
                    </p>
                  </div>
                  <div className="date-pick">
                    <p>Xem theo</p>
                    <Dropdown
                      selected={dateSelect}
                      setSelected={setDateSelect}
                      options={dateArray}
                      width="106px"
                      top="unset"
                    />
                  </div>
                </div>
                {/* <Area1
                  {...config}
                  style={{
                    width: "730px",
                    height: "380px",
                    marginTop: "10px",
                    marginLeft: "24px",
                  }}
                /> */}
                <AreaChart
                  width={760}
                  height={400}
                  data={data}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 6,
                    bottom: 0,
                  }}
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "18px",
                    color: "#535261",
                  }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5185F7" stopOpacity={1} />
                      <stop offset="95%" stopColor="#5185F7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="day"
                    tickCount={6}
                    label={{
                      position: "insideBottomLeft",
                      textAnchor: "middle",
                    }}
                  />
                  <YAxis tickCount={6} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sl"
                    stroke="#5185F7"
                    strokeWidth={2}
                    fill="url(#colorUv)"
                    activeDot={{ stroke: "#F6F6F6", strokeWidth: 3, r: 6 }}
                  />
                </AreaChart>
              </div>
            </Row>
          </Col>

          <Col
            span={8}
            style={{ maxWidth: 400 }}
            className="overview-container"
          >
            <Row>
              <div className="all-page-wrap">
                <UserBar left={20} />
                <h3 className="all-page">Tổng quan</h3>
                <div className="report-component">
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      position: "relative",
                      fontFamily: "Nunito",
                      lineHeight: "24px",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    <CircularProgressbar
                      value={Number(percentActiveDevice)}
                      text={String(percentActiveDevice)}
                      strokeWidth={5}
                      styles={buildStyles({
                        textColor: "#535261",
                        pathColor: "#FF7506",
                      })}
                    />
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                      }}
                    >
                      <CircularProgressbar
                        value={Number(percentNativeDevice)}
                        strokeWidth={5}
                        styles={buildStyles({ pathColor: "#7E7D88" })}
                      />
                    </div>
                  </div>
                  <div className="component-wrap">
                    <div className="content-wrap">
                      <p className="total">{deviceLength}</p>
                      <div className="device-content-process">
                        <HiOutlineDesktopComputer />
                        <p>Thiết bị</p>
                      </div>
                    </div>
                    <div className="status-wrap">
                      <div className="status-wrap-online">
                        <p>•</p>
                        <p>Đang hoạt động</p>
                        <p>{activeDeviceLength}</p>
                      </div>
                      <div className="status-wrap-offline">
                        <p>•</p>
                        <p>Ngưng hoạt động</p>
                        <p>{nativeDeviceLength}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="report-component">
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      position: "relative",
                      fontFamily: "Nunito",
                      lineHeight: "24px",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    <CircularProgressbar
                      value={Number(percentActiveService)}
                      text={String(percentActiveService)}
                      strokeWidth={5}
                      styles={buildStyles({
                        textColor: "#535261",
                        pathColor: "#4277FF",
                      })}
                    />
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                      }}
                    >
                      <CircularProgressbar
                        value={Number(percentNativeService)}
                        strokeWidth={5}
                        styles={buildStyles({ pathColor: "#7E7D88" })}
                      />
                    </div>
                  </div>
                  <div className="component-wrap">
                    <div className="content-wrap">
                      <p className="total">{serviceLength}</p>
                      <div
                        className="device-content-process"
                        style={{ color: "#4277FF" }}
                      >
                        <FaRegComments />
                        <p>Dịch vụ</p>
                      </div>
                    </div>
                    <div className="status-wrap">
                      <div className="status-wrap-online">
                        <p style={{ color: "#4277FF" }}>•</p>
                        <p>Đang hoạt động</p>
                        <p style={{ color: "#4277FF" }}>
                          {activeServiceLength}
                        </p>
                      </div>
                      <div className="status-wrap-offline">
                        <p>•</p>
                        <p>Ngưng hoạt động</p>
                        <p style={{ color: "#4277FF" }}>
                          {nativeServiceLength}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="report-component">
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      position: "relative",
                      fontFamily: "Nunito",
                      lineHeight: "24px",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    <CircularProgressbar
                      value={Number(percentWaiting)}
                      text={String(percentWaiting)}
                      strokeWidth={5}
                      styles={buildStyles({
                        textColor: "#535261",
                        pathColor: "#35C75A",
                      })}
                    />
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        position: "absolute",
                        top: "5px",
                        left: "5px",
                      }}
                    >
                      <CircularProgressbar
                        value={Number(percentUsed)}
                        strokeWidth={5}
                        styles={buildStyles({ pathColor: "#7E7D88" })}
                      />
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                        }}
                      >
                        <CircularProgressbar
                          value={Number(percentPass)}
                          strokeWidth={5}
                          styles={buildStyles({ pathColor: "#F178B6" })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="component-wrap">
                    <div className="content-wrap">
                      <p className="total">{quelength}</p>
                      <div
                        className="device-content-process"
                        style={{ color: "#35C75A" }}
                      >
                        <SiDatabricks />
                        <p>Cấp số</p>
                      </div>
                    </div>
                    <div className="status-wrap">
                      <div className="status-wrap-online">
                        <p style={{ color: "#35C75A" }}>•</p>
                        <p>Đang chờ</p>
                        <p style={{ color: "#35C75A" }}>{waitLength}</p>
                      </div>
                      <div
                        className="status-wrap-offline"
                        style={{ paddingBottom: "5px" }}
                      >
                        <p>•</p>
                        <p>Đã sử dụng</p>
                        <p style={{ color: "#35C75A" }}>{usedLength}</p>
                      </div>
                      <div className="status-wrap-offline">
                        <p style={{ color: " #F178B6" }}>•</p>
                        <p>Bỏ qua</p>
                        <p style={{ color: "#35C75A" }}>{passLength}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Calendar
                  locale="en"
                  onClickDay={(value: any, event: any) => {
                    setDateClick(value);
                    console.log(dateClick);
                    console.log(String(dateClick).slice(8, 10));
                  }}
                />
              </div>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Dashboard;
