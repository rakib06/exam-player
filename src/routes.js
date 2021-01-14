import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import AssignmentList from "./containers/AssignmentList";
import AssignmentDetail from "./containers/AssignmentDetail";
import AssignmentCreate from "./containers/AssignmentCreate";
import Answer from "./containers/Answer";
import MyStudentList from "./containers/MyStudent";
import VerifyCreate from "./containers/MyStudentCreate";
const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={AssignmentList} />
    <Route exact path="/code" component={MyStudentList} />
    <Route exact path="/verify" component={VerifyCreate} />
    <Route exact path="/answerdfghjkdfhjkghfd/:id" component={Answer} />
    <Route exact path="/exam" component={AssignmentList} />
    <Route exact path="/create/" component={AssignmentCreate} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/assignments/:id" component={AssignmentDetail} />
    <Route exact path="/profile/:id" component={Profile} />
  </Hoc>
);

export default BaseRouter;
