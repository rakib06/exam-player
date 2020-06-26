import React, { Component } from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class VerifyCreate extends React.Component {
  formRef = React.createRef();

  onRoomChange = (value) => {
    this.formRef.current.setFieldsValue({
      note: `Hi, ${value === "male" ? "man" : "lady"}!`,
    });
  };

  onFinish = (values) => {
    console.log(values);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onFill = () => {
    this.formRef.current.setFieldsValue({
      note: "Hello world!",
      Room: "male",
    });
  };

  render() {
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onFinish={this.onFinish}
      >
        <Form.Item
          name="code"
          label="Verification Code"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Please contact your teacher for this code" />
        </Form.Item>
        <Form.Item
          name="class"
          label="Classroom "
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={this.onRoomChange}
            allowClear
          >
            <Option value="Admission">Admission</Option>
            <Option value="HSC">HSC</Option>
            <Option value="SSC">SSC</Option>
            <Option value="Other">other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.Room !== currentValues.Room
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("Room") === "other" ? (
              <Form.Item
                name="customizeRoom"
                label="Customize Room"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="danger" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedVerifyCreate = Form.create()(VerifyCreate);

export default WrappedVerifyCreate;
