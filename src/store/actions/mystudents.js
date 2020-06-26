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
      .get("http://127.0.0.1:8000/verify/")
      .then((res) => {
        const mystudents = res.data;
        dispatch(getMyStuListSuccess(mystudents));
      })
      .catch((err) => {
        dispatch(getMyStuListFail());
      });
  };
};
