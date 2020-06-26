import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { List, Skeleton, Divider } from "antd";
import * as actions from "../store/actions/assignments";
import Hoc from "../hoc/hoc";

class AssignmentList extends React.PureComponent {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getASNTS(this.props.token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getASNTS(newProps.token);
      }
    }
  }

  renderItem(item) {
    return (
      <div className="card">
        <p style={{ color: "grey", textAlign: "center" }}>
          <small> {item.batch}</small>
        </p>
        <Link to={`/assignments/${item.id}`}>
          <List.Item
            style={{ color: "black", fontSize: "17px", textAlign: "center" }}
          >
            <b
              style={{
                color: "black",
              }}
            >
              {item.title}
            </b>
            <small
              style={{
                color: "grey",
                marginLeft: "auto",
                marginRight: "auto",
                paddingRight: "auto",
              }}
            >
              <span>
                {" Total marks: "}
                {item.total_marks}
                {"    Time: "}
                {item.time_in_min} {"Min(s)"}
              </span>
            </small>
          </List.Item>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <Hoc>
        {this.props.loading ? (
          <Skeleton active />
        ) : (
          <div>
            <Divider orientation="left">Live Exams</Divider>
            <List
              size="large"
              footer={
                <div style={{ textAlign: "center" }}>
                  <p>
                    <b>
                      {" "}
                      Verify your account with the verification code from your
                      teacher{" "}
                    </b>
                  </p>
                  <p style={{ color: "purple" }}>
                    <b>
                      আপনার শিক্ষকের কাছ থেকে ভেরিফিকেশন কোডটি নিয়ে আপনার
                      একাউন্টটি ভেরিফাই করে নিন
                    </b>
                  </p>
                  <p>
                    <a href="https://pochonder-shob.com/"> পছন্দের-সব.কম </a>
                  </p>
                  <p>
                    <b style={{ fontSize: "17px" }}>
                      <a href="https://www.facebook.com/groups/2693927037547637/">
                        {" "}
                        Join our Facebook Group" "}
                      </a>
                      প্রিয় শহরের প্রিয় শপ থেকে সরাসরি হোম ডেলিভারি। বই,
                      ইলেক্ট্রনিক্স, মোবাইল, কম্পিটার এক্সেসরিজ, ড্রেস, এবং
                      সবকিছুই পাচ্ছেন ফেইসবুক গ্রূপ বা আমাদের ওয়েবসাইট থেকে।{" "}
                    </b>
                  </p>
                  Stay Home, Stay Safe
                </div>
              }
              bordered
              dataSource={this.props.assignments}
              renderItem={(item) => this.renderItem(item)}
            />
          </div>
        )}
      </Hoc>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    assignments: state.assignments.assignments,
    loading: state.assignments.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getASNTS: (token) => dispatch(actions.getASNTS(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentList);
