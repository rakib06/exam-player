import React from "react";
import { connect } from "react-redux";
import { Card, Skeleton, message } from "antd";
// import Questions from "./Questions";
import Options from "../components/Options";
import { getASNTSDetail } from "../store/actions/assignments";
import { createGradedASNT } from "../store/actions/gradedAssignments";
import Hoc from "../hoc/hoc";
import { Button } from "antd";

class Answer extends React.Component {
    state = {
        usersAnswers: {}
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
        message.success("Thank you ! Check your profile for result!");
        const { usersAnswers } = this.state;
        const asnt = {
            username: this.props.username,
            asntId: this.props.currentAssignment.id,
            answers: usersAnswers
        };
        this.props.createGradedASNT(this.props.token, asnt);
        this.props.history.push("/");
    }

    render() {
        const { currentAssignment } = this.props;

        const { title } = currentAssignment;
        //const { time_in_min } = currentAssignment;
        const { total_marks } = currentAssignment;
        const { usersAnswers } = this.state;
        return (
            <Hoc>
                {Object.keys(currentAssignment).length > 0 ? (
                    <Hoc>

                        {this.props.loading ? (
                            <Skeleton active />
                        ) : (




                                <div >
                                    <center>


                                        <h2  >
                                            {title} <br></br>
                                            <small> Total marks : {total_marks} </small>
                                        </h2>
                                        <p> Answer Sheet</p>
                                    </center>

                                    {currentAssignment.questions.map(q => {
                                        return (

                                            <Card


                                                key={q.id}

                                            >
                                                <strong> {`${q.order}. ${q.question}`}</strong>
                                                <br></br>
                                                <div>
                                                    <Options
                                                        questionId={q.order}
                                                        choices={q.choices}
                                                        answer={q.answer}
                                                        usersAnswers={usersAnswers}
                                                    />
                                                </div>

                                            </Card>

                                        );


                                    })}
                                    <br>
                                    </br>


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
)(Answer);
