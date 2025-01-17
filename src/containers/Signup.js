import React from "react";
import { Form, Input, Button, Select } from "antd";
import { Icon } from "antd";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_student = false;
        if (values.userType === "student") is_student = true;
        this.props.onAuth(
          values.username,
          values.mobile,
          values.password,
          values.confirm,
          is_student
        );
        this.props.history.push("/exam");

      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="b">
          <Form.Item>

            <strong> Username  </strong>
            <br></br>
            <small>
              Your name and a number without space
          </small>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "Please input your username without space !" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Ex: Sakib75 "
              />
            )}
          </Form.Item>

          <FormItem>
            <strong> Valid Mobile Number </strong>
            {getFieldDecorator("mobile", {
              rules: [

                {
                  required: true,
                  message: "Please input your Mobile Number!"
                }
              ]
            })(
              <Input
                prefix={<Icon type="mobile" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Mobile Number"
              />
            )}
          </FormItem>

          <FormItem>
            <strong> Password </strong>
            <br></br>
            <small> Minimum length: 8, (letter & digit)</small>
            <br></br>
            <small> <b> *** আপনার পাসওয়ার্ডে অবশ্যই একটি "@" যুক্ত করতে হবে, , অন্যথায় রেজিস্ট্রেশন ব্যর্থ হবে! </b> </small>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Ex: sakib@7575"
              />
            )}
          </FormItem>

          <FormItem>
            <strong>Confirm your password</strong> <br></br>
            <small> Please remember/note down </small>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="Password"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </FormItem>

          <FormItem>
            <strong> Student/Teacher</strong>
            {getFieldDecorator("userType", {
              rules: [
                {
                  required: true,
                  message: "Please select a user!"
                }
              ]
            })(
              <Select placeholder="Select a user type">
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
              </Select>
            )}
          </FormItem>

          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Signup
          </Button>

            <NavLink style={{ marginRight: "12px" }} to="/login/">
              {" "}
            I've an account
          </NavLink>
          </FormItem>
        </div>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, mobile, password1, password2, is_student) =>
      dispatch(
        actions.authSignup(username, mobile, password1, password2, is_student)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
