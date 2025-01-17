import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import { MDBContainer, MDBFooter } from "mdbreact";

const { Header, Content } = Layout;

class CustomLayout extends React.Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            {this.props.isAuthenticated ? (
              <Menu.Item key="10">
                <Link to="/exam">Exam</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="1">
                <Link to="/login">Login</Link>
              </Menu.Item>
            )}

            {this.props.token !== null ? (
              <Menu.Item key="4">
                <Link to={`/profile/${this.props.userId}`}>Result</Link>
              </Menu.Item>
            ) : null}

            {this.props.token !== null && this.props.is_teacher ? (
              <Menu.Item key="5">
                <Link to="/create">Create Exam </Link>
              </Menu.Item>
            ) : null}

            {this.props.token !== null && this.props.is_teacher === false ? (
              <Menu.Item key="66">
                <Link to="/verify"> Verify </Link>
              </Menu.Item>
            ) : null}

            {this.props.isAuthenticated ? (
              <Menu.Item key="3" onClick={this.props.logout}>
                Logout
              </Menu.Item>
            ) : /* </Menu.Item><Menu.Item key="3">
                <Link to="/logout"> Logout</Link>

              </Menu.Item>
              */

            null}

            {this.props.isAuthenticated ? null : (
              <Menu.Item key="9">
                <Link to="/signup">Signup</Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Exam Player </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
            {this.props.children}
          </div>
        </Content>

        <MDBFooter color="red" className="font-small pt-3 mt-2">
          <div className="footer-copyright text-center">
            <MDBContainer fluid>
              &copy; {new Date().getFullYear()} <b> LinB1 </b>
            </MDBContainer>
          </div>
        </MDBFooter>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    is_teacher: state.auth.is_teacher,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomLayout)
);
