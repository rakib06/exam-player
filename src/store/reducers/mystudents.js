import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  mystudents: [],
  error: null,
  loading: false,
};

const getMyStuListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const getMyStuListSuccess = (state, action) => {
  return updateObject(state, {
    mystudents: action.mystudents,

    error: null,
    loading: false,
  });
};

const getMyStuListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const createVRFStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const createVRFSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
  });
};

const createVRFFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MyStudent_LIST_START:
      return getMyStuListStart(state, action);
    case actionTypes.GET_MyStudent_LIST_SUCCESS:
      return getMyStuListSuccess(state, action);
    case actionTypes.GET_MyStudentLIST_FAIL:
      return getMyStuListFail(state, action);
    case actionTypes.CREATE_VRF_START:
      return createVRFStart(state, action);
    case actionTypes.CREATE_VRF_SUCCESS:
      return createVRFSuccess(state, action);
    case actionTypes.CREATE_VRF_FAIL:
      return createVRFFail(state, action);
    default:
      return state;
  }
};

export default reducer;
