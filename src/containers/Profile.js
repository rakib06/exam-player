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
                      <div>
                        <hr></hr>
                        <p>
                          <h3>
                            <Link to={`/assignments/${a.assignment}`}>
                              <strong>  Exam : {a.assignment_title}</strong>

                            </Link></h3>
                          <br></br>
                          {a.exam_start_at}
                        </p>

                        <Result key={a.id} grade={a.grade} />

                        <div>
                          <p>
                            <h1><strong style={{ color: ' crimson' }} > {a.obtained_marks === a.highest ? "Congratulations!!!! Rank. 1  " : ""}</strong></h1>

                            <h2> {" Your Score: "}  <strong style={{ color: 'green' }}> {a.obtained_marks}</strong> <small>{"out of "}</small>
                              <strong style={{ color: 'purple' }}> {a.total_marks}</strong> ( <q style={{ color: 'firebrick' }}> Highest : {a.highest} </q> ) </h2>
                          </p>
                          <p>
                            <h2> Your Position:  <strong style={{ color: ' crimson' }}> {a.rank}  </strong> Total Participant :  <strong style={{ color: 'green' }}> {a.total_participant}</strong></h2>
                          </p>


                        </div>

                        <Card>

                          <p>
                            <strong> Right Answer: <b style={{ color: 'green' }} >{a.right_answer} </b></strong> </p>
                          <strong > Wrong Answer: <b style={{ color: 'red' }}> {-(a.right_answer - a.obtained_marks)}</b></strong>

                        </Card>

                        <hr></hr>

                      </div>
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
