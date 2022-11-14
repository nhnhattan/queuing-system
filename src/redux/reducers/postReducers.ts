import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
} from "../constants/postConstans";

const initState = {
  request: false,
  success: false,
  message: null,
  account: [
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
  ],
  allAccount: [
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
  ],
  singleAccount: [
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
  ],
  role: [
    {
      name: "",
      description: "",
      roleA: [""],
      roleB: [""],
    },
  ],
  singleRole: [
    {
      name: "",
      description: "",
      roleA: [""],
      roleB: [""],
    },
  ],
  devices: [
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
  ],
  services: [
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
  ],
  queuing: [
    {
      queuingId: "",
      nameClient: "",
      service: "",
      timeGiven: "",
      timeOut: "",
      status: "",
      supply: "",
    },
  ],
  queuing1: [
    {
      queuingId: "",
      nameClient: "",
      service: "",
      timeGiven: "",
      timeOut: "",
      status: "",
      supply: "",
    },
  ],
  queuing2: [
    {
      queuingId: "",
      nameClient: "",
      service: "",
      timeGiven: "",
      timeOut: "",
      status: "",
      supply: "",
    },
  ],
  queuSer: [
    {
      queuingId: "",
      nameClient: "",
      service: "",
      timeGiven: "",
      timeOut: "",
      status: "",
      supply: "",
    },
  ],
  user: [{ email: "" }],
  diary: [
    {
      email: "",
      timeReport: "",
      ipAddress: "",
      hourReport: "",
      action: "",
      timeReportSearch: "",
    },
  ],
  devicesdash: [
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
  ],
  servicesdash: [
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
  ],
  queuingdash: [
    {
      queuingId: "",
      nameClient: "",
      service: "",
      timeGiven: "",
      timeOut: "",
      status: "",
      supply: "",
    },
  ],
};

const postReducers = (state = initState, action: any) => {
  switch (action.type) {
    case FETCH_POST_REQUEST:
      return {
        ...state,
        requesting: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        account: action.account,
        allAccount: action.allAccount,
        role: action.role,
        singleAccount: action.singleAccount,
        singleRole: action.singleRole,
        devices: action.devices,
        services: action.services,
        queuing: action.queuing,
        user: action.user,
        userInfo: action.userInfo,
        diary: action.diary,
        queuing1: action.queuing1,
        queuing2: action.queuing2,
        queuSer: action.queuSer,
        devicedash: action.devicesdash,
        servicedash: action.servicesdash,
        queuingdash: action.queuingdash,
      };
    case FETCH_POST_ERROR:
      return {
        ...state,
        requesting: false,
        message: action.message,
      };
    default:
      return state;
  }
};

export default postReducers;
