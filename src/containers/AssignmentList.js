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
                <div style={{ textAlign: "center" }}>Stay Home, Stay Safe</div>
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
