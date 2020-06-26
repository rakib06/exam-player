import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getMyStuListStart = () => {
  return {
    type: actionTypes.GET_MyStudent_LIST_START,
  };
};

export const getMyStuListSuccess = (mystudents) => {
  return {
    type: actionTypes.GET_MyStudent_LIST_SUCCESS,
    mystudents,
  };
};

export const getMyStuListFail = (error) => {
  return {
    type: actionTypes.GET_MyStudentLIST_FAIL,
    error: error,
  };
};

export const getMyStu = (token) => {
  return (dispatch) => {
    dispatch(getMyStuListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get("https://rk-mcq.herokuapp.com0/verify/")
      .then((res) => {
        const mystudents = res.data;
        dispatch(getMyStuListSuccess(mystudents));
      })
      .catch((err) => {
        dispatch(getMyStuListFail());
      });
  };
};

const createVRFStart = () => {
  return {
    type: actionTypes.CREATE_VRF_START,
  };
};

const createVRFSuccess = (vrf) => {
  return {
    type: actionTypes.CREATE_VRF_SUCCESS,
    vrf,
  };
};

const createVRFFail = (error) => {
  return {
    type: actionTypes.CREATE_VRF_FAIL,
    error: error,
  };
};

export const createVRF = (token, vrf) => {
  return (dispatch) => {
    dispatch(createVRFStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      //.post(`https://rk-mcq.herokuapp.com/assignments/`, asnt)
      .post("https://rk-mcq.herokuapp.com0/verify/", vrf)
      .then((res) => {
        dispatch(createVRFSuccess());
      })
      .catch((err) => {
        dispatch(createVRFFail());
      });
  };
};
