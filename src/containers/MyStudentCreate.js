import React from "react";
import { Form, Input, Button, message, List } from "antd";

import { connect } from "react-redux";
import { createVRF } from "../store/actions/mystudents";
const FormItem = Form.Item;

class VerifyCreate extends React.Component {
  formRef = React.createRef();

  onRoomChange = (value) => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === "SSC" ? "Good Job" : "Good Luck"}!`,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        const vrf = {
          student: this.props.username,
          // bujhte hibe
          code: values.code,
          class_id: values.class_id,
        };
        this.props.createVRF(this.props.token, vrf);
        message.success("Thank you!  Please wait for verification");
        //this.props.history.push("/");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label={""}>
          <center>
            <b> Account Verification for {this.props.username} </b>
          </center>
          <center>
            <span> Account Verification Code </span>
          </center>

          {getFieldDecorator(`code`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                message: "Please input verification code",
              },
            ],
          })(<Input placeholder="Write teacher verification code here" />)}
        </FormItem>
        <FormItem label={""}>
          <center>
            <span> Class / Classroom ID </span>
          </center>

          {getFieldDecorator(`class_id`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                message: "Please input your classroom ID or class",
              },
            ],
          })(
            <Input placeholder=" classroom ID or class ( SSC/HSC/9/10/Admission etc.)" />
          )}
        </FormItem>
        <FormItem>
          <Button type="danger" htmlType="submit">
            Submit
          </Button>
        </FormItem>
        <List>
          <p>
            <b style={{ fontSize: "17px" }}>
              <a href="https://www.facebook.com/groups/2693927037547637/">
                {" "}
                Join Facebook Group | পছন্দের-সব.কম
              </a>
              <p>
                প্রিয় শহরের প্রিয় শপ থেকে সরাসরি হোম ডেলিভারি। বই,
                ইলেক্ট্রনিক্স, মোবাইল, কম্পিটার এক্সেসরিজ, ড্রেস, এবং সবকিছুই
                পাচ্ছেন ফেইসবুক গ্রূপ বা আমাদের ওয়েবসাইট থেকে।{" "}
              </p>
            </b>
          </p>
        </List>
      </Form>
    );
  }
}
const WrappedVerifyCreate = Form.create()(VerifyCreate);

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    loading: state.assignments.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createVRF: (token, vrf) => dispatch(createVRF(token, vrf)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedVerifyCreate);
