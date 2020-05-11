import axios from "axios";
import * as actionTypes from "./actionTypes";

const getASNTListStart = () => {
    return {
        type: actionTypes.GET__ASSIGNMENT_LIST_START
    };
};

const getASNTListSuccess = assignments => {
    return {
        type: actionTypes.GET__ASSIGNMENTS_LIST_SUCCESS,
        assignments
    };
};

const getASNTListFail = error => {
    return {
        type: actionTypes.GET__ASSIGNMENTS_LIST_FAIL,
        error: error
    };
};

export const getASNTS = (assignment_id, token) => {
    return dispatch => {
        dispatch(getASNTListStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .get(`http://127.0.0.1:8000/graded-assignments/?assignment_id=${assignment_id}`)
            .then(res => {
                const assignments = res.data;
                dispatch(getANSWERASNTListSuccess(assignments));
            })
            .catch(err => {
                dispatch(getANSWERASNTListFail(err));
            });
    };
};

export const createANSWERASNT = (token, asnt) => {
    return dispatch => {
        //   dispatch(createASNTStart());
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .post(`http://127.0.0.1:8000/graded-assignments/create/`, asnt)
            .then(res => {
                console.log("success");
                console.log(asnt)
                //   dispatch(createASNTSuccess());
            })
            .catch(err => {
                //   dispatch(createASNTFail());
            });
    };
};
