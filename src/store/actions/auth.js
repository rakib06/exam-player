import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("https://exam-player.herokuapp.com/rest-auth/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        const user = {
          token: res.data.key,
          username,
          userId: res.data.user,
          is_student: res.data.user_type.is_student,
          is_teacher: res.data.user_type.is_teacher,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000),
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(36000000));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (
  username,
  mobile,
  password1,
  password2,
  is_student
) => {
  return (dispatch) => {
    dispatch(authStart());
    const user = {
      username,
      mobile,
      password1,
      password2,
      is_student,
      is_teacher: !is_student,
    };
    axios
<<<<<<< HEAD
      .post("https://exam-player.herokuapp.com/rest-auth/registration/", user)
=======
      //.post("https://exam-player.com/rest-auth/registration/", user)
      .post("https://exam-player.com/rest-auth/registration/", user)
>>>>>>> ae402b036b4f708f5c17fc3808f11de93a7da8e8
      .then((res) => {
        const user = {
          token: res.data.key,
          username,
          userId: res.data.user,
          is_student,
          is_teacher: !is_student,
<<<<<<< HEAD
          expirationDate: new Date(new Date().getTime() + 3600 * 1000),
=======
          expirationDate: new Date(new Date().getTime() + 360000 * 100000),
>>>>>>> ae402b036b4f708f5c17fc3808f11de93a7da8e8
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(36000000));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
