import React from "react";
import { List, Skeleton, Card } from "antd";
import { connect } from "react-redux";
import Result from "../components/Result";
import { getGradedASNTS } from "../store/actions/gradedAssignments";
import Hoc from "../hoc/hoc";
import { Link } from "react-router-dom";

class Profile extends React.PureComponent {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getGradedASNTS(this.props.username, this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getGradedASNTS(newProps.username, newProps.token);
      }
    }
  }

  render() {
    return (
      <Hoc>
        {this.props.loading ? (
          <Skeleton active />
        ) : (

            <Hoc>
              <h1>Progress Report: {this.props.username}</h1>
              <div class="row">

                <List
                  size="small"
                  dataSource={this.props.gradedAssignments}
                  renderItem={a =>
                    <div class="col-4">
                      <Card bordered="5" type="inner">
                        <p>
                          <Link to={`/assignments/${a.assignment}`}>
                            <strong>  Exam : {a.assignment_title}</strong>

                          </Link>
                          {"    "}
                          Date : {a.exam_start_at}</p>

                        <Result key={a.id} grade={a.grade} />
                        <p >
                          <h3> <strong> {a.obtained_marks}</strong> {"out of "}
                            <strong> {a.total_marks}</strong></h3>

                          <strong>   {a.position}</strong>
                        </p>
                        <Card>
                          <p>
                            <strong> Right Answer: {a.right_answer}</strong> </p>
                          <strong > Wrong Answer: {-(a.right_answer - a.obtained_marks)}</strong>

                        </Card>



                      </Card>
                    </div>




                  }

                />


              </div>

            </Hoc>

          )}
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    gradedAssignments: state.gradedAssignments.assignments,
    loading: state.gradedAssignments.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGradedASNTS: (username, token) =>
      dispatch(getGradedASNTS(username, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
