import React from "react";
import { List, Skeleton, Card } from "antd";
import { connect } from "react-redux";
import Result from "../components/Result";
import { getGradedASNTS } from "../store/actions/gradedAssignments";
import Hoc from "../hoc/hoc";
//import { Link } from "react-router-dom";
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
            <h5 style={{ textAlign: "center" }}>
              Progress Report: {this.props.username}
            </h5>

            <div class="row" style={{}}>
              <List
                size="small"
                dataSource={this.props.gradedAssignments}
                renderItem={(a) => (
                  <Card>
                    <h6>
                      <strong> Exam : {a.assignment_title} </strong>(
                      {a.exam_start_at})
                      <small style={{ color: "red" }}> </small>
                      <Result key={a.id} grade={a.grade} />
                      <strong style={{ color: " crimson" }}>
                        {" "}
                        {a.obtained_marks === a.highest ? (
                          <h6>
                            {" "}
                            Congratulations!!!!{" "}
                            <span role="img">&#127942;</span>{" "}
                          </h6>
                        ) : (
                          ""
                        )}
                      </strong>
                    </h6>

                    <h6>
                      {" "}
                      {" Your Score: "}{" "}
                      <strong style={{ color: "green" }}>
                        {" "}
                        {a.obtained_marks}
                      </strong>{" "}
                      <small>{"out of "}</small>
                      <strong style={{ color: "purple" }}>
                        {" "}
                        {a.total_marks}
                      </strong>{" "}
                      ({" "}
                      <q style={{ color: "firebrick" }}>
                        {" "}
                        Highest : {a.highest}{" "}
                      </q>{" "}
                      ){" "}
                    </h6>

                    <p>
                      <h6>
                        {" "}
                        <span role="img">&#127941;</span> <small>Rank: </small>{" "}
                        <strong style={{ color: " crimson" }}>
                          {" "}
                          {a.rank}{" "}
                        </strong>{" "}
                        <span role="img"> &#9621; &#127943; </span> Contestant :{" "}
                        <strong style={{ color: "green" }}>
                          {" "}
                          {a.total_participant}
                        </strong>
                      </h6>
                    </p>

                    <p>
                      <strong>
                        {" "}
                        <span role="img">&#9996; </span> Right Answer:{" "}
                        <b style={{ color: "green" }}>{a.right_answer} </b>
                      </strong>{" "}
                    </p>
                    <strong>
                      {" "}
                      <span role="img"> &#9940;</span> Wrong Answer:{" "}
                      <b style={{ color: "red" }}>
                        {" "}
                        {-(a.right_answer - a.obtained_marks)}{" "}
                      </b>
                    </strong>
                  </Card>
                )}
              />
            </div>
          </Hoc>
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    gradedAssignments: state.gradedAssignments.assignments,
    loading: state.gradedAssignments.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGradedASNTS: (username, token) =>
      dispatch(getGradedASNTS(username, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
