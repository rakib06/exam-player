import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    assignments: [],
    error: null,
    loading: false
};

const getANSWERASNTListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getANSWERASNTListSuccess = (state, action) => {
    return updateObject(state, {
        assignments: action.assignments,
        error: null,
        loading: false
    });
};

const getANSWERASNTListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ANSWER_ASSIGNMENT_LIST_START:
            return getANSWERASNTListStart(state, action);
        case actionTypes.GET_ANSWER_ASSIGNMENTS_LIST_SUCCESS:
            return getANSWERASNTListSuccess(state, action);
        case actionTypes.GET_ANSWER_ASSIGNMENTS_LIST_FAIL:
            return getANSWERASNTListFail(state, action);
        default:
            return state;
    }
};

export default reducer;
