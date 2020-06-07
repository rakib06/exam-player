import React from "react";
import { connect, batch } from "react-redux";
import { Card, Skeleton, message } from "antd";
// import Questions from "./Questions";
import Choices from "../components/Choices";
import { getASNTSDetail } from "../store/actions/assignments";
import { createGradedASNT } from "../store/actions/gradedAssignments";
import Hoc from "../hoc/hoc";
import Timer from './Timer';
import ReactToPdf from "react-to-pdf";
//import { Button } from "antd";
//import { Redirect } from "react-router-dom";
//import { Message } from "../components/test/Message";
//mport { Counter } from '../components/test/Counter'
const ref = React.createRef();
const options = {
  orientation: 'landscape',
  unit: 'in',
  format: [4, 2]
};
class AssignmentDetail extends React.Component {
  state = {
    usersAnswers: {},
    //isSubmit: "No"

  };

  constructor() {
    super()
    this.state = {
      usersAnswers: {},
      isSubmit: "No"
    }
  }

  changeSubmit = () => {
    // const { isSubmit } = this.state;
    // this.isSubmit = "Yes"
    this.setState({ isSubmit: "Yes" });
  };



  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getASNTSDetail(this.props.token, this.props.match.params.id);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getASNTSDetail(newProps.token, this.props.match.params.id);
      }
    }
  }

  onChange = (e, qId) => {
    const { usersAnswers } = this.state;
    usersAnswers[qId] = e.target.value;
    this.setState({ usersAnswers });
  };

  handleSubmit() {
    message.success("Thank you ! Check your result!");
    const { usersAnswers } = this.state;
    const asnt = {
      username: this.props.username,
      asntId: this.props.currentAssignment.id,
      answers: usersAnswers
    };
    this.props.createGradedASNT(this.props.token, asnt);
    //this.refs.btn.setAttribute("disabled", "disabled");
    this.btn.setAttribute("disabled", "disabled");
    this.changeSubmit()

    //this.btn.removeAttribute("disabled");
    // this.props.history.push("/");
  }

  render() {
    const { currentAssignment } = this.props;

    const { title } = currentAssignment;
    const { time_in_min } = currentAssignment;
    const { batch } = currentAssignment;
    const { total_marks } = currentAssignment;
    const { usersAnswers } = this.state;
    //const { isSubmit } = this.isSubmit;

    return (
      <Hoc>
        {Object.keys(currentAssignment).length > 0 ? (
          <Hoc>

            {this.props.loading ? (
              <Skeleton active />
            ) : (



                <div className="App" style={{ margin: "auto" }}>
                  {this.state.isSubmit === "Yes" ?
                    <ReactToPdf targetRef={ref} filename="exam-player.pdf" >
                      {({ toPdf }) => (
                        <button onClick={toPdf}></button>
                      )}
                    </ReactToPdf>
                    : ""}
                  <div ref={ref}>
                    <center>

                      <h1 style={{ color: "black" }}>{batch}</h1>
                      <h2  >
                        {title}<br></br>

                        <small> Total marks : {total_marks} </small>
                      </h2>

                      <Timer startCount={time_in_min * 60} />

                    </center>

                    {currentAssignment.questions.map(q => {
                      return (

                        <Card


                          key={q.id}

                        >
                          <strong> {`${q.order}. ${q.question}`}</strong>
                          <br></br>
                          <div>
                            <Choices
                              isSubmit={this.state.isSubmit}
                              questionId={q.order}
                              choices={q.choices}
                              change={this.onChange}
                              answer={q.answer}
                              usersAnswers={usersAnswers}
                            />
                          </div>

                        </Card>

                      );


                    })}
                    <br>
                    </br>
                    <center>
                      <button ref={btn => { this.btn = btn; }}
                        style={{ color: "red" }}
                        type="primary" onClick={() => {
                          this.handleSubmit()


                        }}>
                        Submit
          </button>



                    </center>

                  </div>

                </div>
              )}
          </Hoc>
        ) : null
        }
      </Hoc>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentAssignment: state.assignments.currentAssignment,
    loading: state.assignments.loading,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getASNTSDetail: (token, id) => dispatch(getASNTSDetail(token, id)),
    createGradedASNT: (token, asnt) => dispatch(createGradedASNT(token, asnt))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentDetail);
