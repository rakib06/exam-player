import React from "react";
import { Form, Input, Button, Spin } from "antd";
import Icon from "@ant-design/icons";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";


const FormItem = Form.Item;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(values.username, values.password);
        this.props.history.push("/exam");
      }
    });
  };

  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {errorMessage}
        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : (
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div className="b">
                <FormItem>
                  <strong> Username  </strong>
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Please input your username!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      placeholder="Username"
                    />
                  )}
                </FormItem>

                <FormItem>
                  <strong> Password  </strong>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </FormItem>

                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginRight: "10px" }}
                  >
                    Login
              </Button>

                  <NavLink style={{ marginRight: "10px" }} to="/signup/">
                    {" "}
                    <br></br>
                Don't have an account?
                <br></br>
                Tap to Sign Up
              </NavLink>

                </FormItem>
              </div>
            </Form>
          )}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
