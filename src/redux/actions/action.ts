import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
} from "../constants/postConstans";
import {
  doc,
  getDocs,
  getDoc,
  collection,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase";
import { async } from "@firebase/util";

export const loginAccount = (email: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const dataAccount = {
      email: email,
    };
    dispatch({
      type: FETCH_POST_SUCCESS,
      user: dataAccount,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

// Accounts
export const loadAccount = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const userDoc = collection(db, "users");
    const q: any = query(userDoc, orderBy("name"), limit(8));

    const dbGetDocs: any = await getDocs(q);
    const dataAccount = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      account: dataAccount,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadAllAccount = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const userDoc = collection(db, "users");
    const q: any = query(userDoc, orderBy("name"), limit(8));

    const dbGetDocs: any = await getDocs(userDoc);
    const dataAccount = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      allAccount: dataAccount,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadSingleAccount = (role: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const userDoc = collection(db, "users");
    const q: any = query(userDoc, where("role", "==", role));

    const dbGetDocs: any = await getDocs(q);
    const dataAccount = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      account: dataAccount,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const searchAccount = (key: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const userDoc = collection(db, "users");
    const q: any = query(userDoc, where("name", ">=", key));
    const q2: any = query(userDoc, where("email", ">=", key));

    const dbGetDocs: any = await getDocs(q);
    const dataAccount = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      account: dataAccount,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const singleAccount = (key: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const q = await getDoc(doc(db, "users", key));

    let dataAccount;
    if (q.exists()) {
      dataAccount = q.data();
    } else {
      console.log("No such document");
    }
    dispatch({
      type: FETCH_POST_SUCCESS,
      singleAccount: dataAccount,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

// Roles
export const loadRoles = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const roleDoc = collection(db, "role");
    const q: any = query(roleDoc, orderBy("name"), limit(8));

    const dbGetDocs1: any = await getDocs(q);
    const dataRole = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      role: dataRole,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const searchRoles = (key: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const roleDoc = collection(db, "role");
    const q: any = query(roleDoc, where("name", "<=", key));
    const dbGetDocs: any = await getDocs(q);
    const dataRole = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      role: dataRole,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadSingleRole = (key: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const q = await getDoc(doc(db, "role", key));

    let dataRole;
    if (q.exists()) {
      dataRole = q.data();
    } else {
      console.log("No such document");
    }
    dispatch({
      type: FETCH_POST_SUCCESS,
      singleRole: dataRole,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

// Devices
export const loadDevices = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const roleDoc = collection(db, "devices");
    const q: any = query(roleDoc, orderBy("deviceId"), limit(8));

    const dbGetDocs1: any = await getDocs(q);
    const dataRole = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      devices: dataRole,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};


export const searchDevices = (key: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const roleDoc = collection(db, "devices");
    const q: any = query(roleDoc, where("deviceId", "==", key));
    const dbGetDocs: any = await getDocs(q);
    const dataRole = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      devices: dataRole,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadSingleStatusDevice = (key: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const userDoc = collection(db, "devices");
    const q: any = query(userDoc, where("status", "==", key));

    const dbGetDocs: any = await getDocs(q);
    const dataAccount = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      devices: dataAccount,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadSingleConnectDevice = (key: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const userDoc = collection(db, "devices");
    const q: any = query(userDoc, where("connect", "==", key));

    const dbGetDocs: any = await getDocs(q);
    const dataAccount = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      devices: dataAccount,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadDoubleTypeDevice =
  (status: any, connection: any) => async (dispatch: any) => {
    try {
      dispatch({ type: FETCH_POST_REQUEST });
      const userDoc = collection(db, "devices");
      const q: any = query(
        userDoc,
        where("status", "==", status),
        where("connect", "==", connection)
      );

      const dbGetDocs: any = await getDocs(q);
      const dataAccount = await dbGetDocs.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({
        type: FETCH_POST_SUCCESS,
        devices: dataAccount,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_POST_ERROR,
        message: error,
      });
    }
  };

// Services
export const loadServices = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const serviceDoc = collection(db, "service");
    const q: any = query(serviceDoc, orderBy("serviceId"), limit(8));

    const dbGetDocs1: any = await getDocs(q);
    const serviceData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      services: serviceData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadSingleService = (key: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const userDoc = collection(db, "service");
    const q: any = query(userDoc, where("status", "==", key));

    const dbGetDocs: any = await getDocs(q);
    const dataAccount = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      services: dataAccount,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const searchService = (key: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const roleDoc = collection(db, "service");
    const q: any = query(roleDoc, where("serviceId", "==", key));
    const dbGetDocs: any = await getDocs(q);
    const dataRole = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      services: dataRole,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

//Queuing
export const loadQueuing = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const queuingDoc = collection(db, "queuing");
    const q: any = query(queuingDoc, orderBy("queuingId"), limit(8));

    const dbGetDocs1: any = await getDocs(q);
    const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      queuing1: queuingData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadQueuingBar = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const queuingDoc = collection(db, "queuing");
    const q: any = query(queuingDoc, orderBy("queuingId"));

    const dbGetDocs1: any = await getDocs(q);
    const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      queuing2: queuingData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadStatusQueuing = (status: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const queuingDoc = collection(db, "queuing");
    const q: any = query(queuingDoc, where("status", "==", status));

    const dbGetDocs1: any = await getDocs(q);
    const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      queuing1: queuingData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadSupplyQueuing = (supply: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const queuingDoc = collection(db, "queuing");
    const q: any = query(queuingDoc, where("supply", "==", supply));

    const dbGetDocs1: any = await getDocs(q);
    const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      queuing1: queuingData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadServiceQueuing = (service: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const queuingDoc = collection(db, "queuing");
    const q: any = query(queuingDoc, where("service", "==", service));

    const dbGetDocs1: any = await getDocs(q);
    const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      queuing1: queuingData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadStaSupQueuing =
  (key1: any, key2: any) => async (dispatch: any) => {
    try {
      dispatch({ type: FETCH_POST_REQUEST });
      const queuingDoc = collection(db, "queuing");
      const q: any = query(
        queuingDoc,
        where("status", "==", key1),
        where("supply", "==", key2)
      );

      const dbGetDocs1: any = await getDocs(q);
      const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({
        type: FETCH_POST_SUCCESS,
        queuing1: queuingData,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_POST_ERROR,
        message: error,
      });
    }
  };

export const loadSerStaQueuing =
  (key1: any, key2: any) => async (dispatch: any) => {
    try {
      dispatch({ type: FETCH_POST_REQUEST });
      const queuingDoc = collection(db, "queuing");
      const q: any = query(
        queuingDoc,
        where("status", "==", key1),
        where("service", "==", key2)
      );

      const dbGetDocs1: any = await getDocs(q);
      const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({
        type: FETCH_POST_SUCCESS,
        queuing1: queuingData,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_POST_ERROR,
        message: error,
      });
    }
  };

export const loadSerSupQueuing =
  (key1: any, key2: any) => async (dispatch: any) => {
    try {
      dispatch({ type: FETCH_POST_REQUEST });
      const queuingDoc = collection(db, "queuing");
      const q: any = query(
        queuingDoc,
        where("supply", "==", key1),
        where("service", "==", key2)
      );

      const dbGetDocs1: any = await getDocs(q);
      const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({
        type: FETCH_POST_SUCCESS,
        queuing1: queuingData,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_POST_ERROR,
        message: error,
      });
    }
  };

export const loadTripleQueuing =
  (key1: any, key2: any, key3: any) => async (dispatch: any) => {
    try {
      dispatch({ type: FETCH_POST_REQUEST });
      const queuingDoc = collection(db, "queuing");
      const q: any = query(
        queuingDoc,
        where("supply", "==", key1),
        where("service", "==", key2),
        where("status", "==", key3)
      );

      const dbGetDocs1: any = await getDocs(q);
      const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({
        type: FETCH_POST_SUCCESS,
        queuing1: queuingData,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_POST_ERROR,
        message: error,
      });
    }
  };

export const searchQueuing = (key1: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const queuingDoc = collection(db, "queuing");
    const q: any = query(queuingDoc, where("nameClient", "==", key1));

    const dbGetDocs1: any = await getDocs(q);
    const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      queuing1: queuingData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const dateStartQueuing = (key1: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const queuingDoc = collection(db, "queuing");
    const q: any = query(queuingDoc, where("timeGiveSearch", ">=", key1));

    const dbGetDocs1: any = await getDocs(q);
    const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      queuing1: queuingData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const dateEndQueuing = (key1: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const queuingDoc = collection(db, "queuing");
    const q: any = query(queuingDoc, where("timeOutSearch", ">=", key1));

    const dbGetDocs1: any = await getDocs(q);
    const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      queuing1: queuingData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadQueSer = (key1: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const queuingDoc = collection(db, "queuing");
    const q: any = query(queuingDoc, where("service", "==", key1));

    const dbGetDocs1: any = await getDocs(q);
    const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      queuSer: queuingData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadQueSerStatus =
  (key1: any, key2: any) => async (dispatch: any) => {
    try {
      dispatch({ type: FETCH_POST_REQUEST });
      const queuingDoc = collection(db, "queuing");
      const q: any = query(
        queuingDoc,
        where("service", "==", key1),
        where("status", "==", key2)
      );

      const dbGetDocs1: any = await getDocs(q);
      const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({
        type: FETCH_POST_SUCCESS,
        queuSer: queuingData,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: FETCH_POST_ERROR,
        message: error,
      });
    }
  };

//Diary
export const loadDiary = (email: any) => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const reportDoc = collection(db, "reports");
    const q: any = query(reportDoc, where("email", "==", email), limit(8));

    const dbGetDocs: any = await getDocs(q);
    const dataAccount = await dbGetDocs.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      diary: dataAccount,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadServicesDash = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const serviceDoc = collection(db, "service");
    const q: any = query(serviceDoc, orderBy("serviceId"));

    const dbGetDocs1: any = await getDocs(q);
    const serviceData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      servicesdash: serviceData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadDevicesDash = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const roleDoc = collection(db, "devices");
    const q: any = query(roleDoc, orderBy("deviceId"));

    const dbGetDocs1: any = await getDocs(q);
    const dataRole = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      devicesdash: dataRole,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};

export const loadQueuingDash = () => async (dispatch: any) => {
  try {
    dispatch({ type: FETCH_POST_REQUEST });
    const queuingDoc = collection(db, "queuing");
    const q: any = query(queuingDoc, orderBy("queuingId"));

    const dbGetDocs1: any = await getDocs(q);
    const queuingData = await dbGetDocs1.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));
    dispatch({
      type: FETCH_POST_SUCCESS,
      queuingdash: queuingData,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_POST_ERROR,
      message: error,
    });
  }
};
