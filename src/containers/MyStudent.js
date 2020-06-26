import React from "react";
import { connect } from "react-redux";
import { List, Typography, Divider, Skeleton } from "antd";
import * as actions from "../store/actions/mystudents";
import Hoc from "../hoc/hoc";
class MyStudentList extends React.PureComponent {
  componentDidMount() {
    if (this.props.token !== undefined && this.props.token !== null) {
      this.props.getMyStu(this.props.token);
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
        this.props.getMyStu(newProps.token);
      }
    }
  }
  renderItem(item) {
    return (
      <div className="card">
        <List.Item style={{ color: "black", fontSize: "17px" }}>
          <b>{item.username}</b>
        </List.Item>
      </div>
    );
  }
  render() {
    return (
      <Hoc>
        {this.props.loading ? (
          <Skeleton active />
        ) : (
          <List
            size="large"
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={this.props.mystudents}
            renderItem={(item) => (
              <List.Item>{this.renderItem(item)}</List.Item>
            )}
          />
        )}
      </Hoc>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    mystudents: state.mystudents.mystudents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyStu: (token) => dispatch(actions.getMyStu(token)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyStudentList);
