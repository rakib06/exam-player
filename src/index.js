import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "bootstrap/dist/css/bootstrap.min.css";
import authReducer from "./store/reducers/auth";
import assignmentReducer from "./store/reducers/assignments";
import gradedAssignmentReducer from "./store/reducers/gradedAssignments";
import myStudentReducer from "./store/reducers/mystudents";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  assignments: assignmentReducer,
  gradedAssignments: gradedAssignmentReducer,
  mystudents: myStudentReducer,
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);


ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
