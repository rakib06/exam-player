import React from "react";
import { Form, Input, Button } from "antd";
import Icon from "@ant-design/icons";
import Hoc from "../hoc/hoc";

const FormItem = Form.Item;

let id = 0;

class QuestionForm extends React.Component {
  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    if (keys.length === 1) return;
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(++id);
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (

      <FormItem label={index === 0 ? "" : ""} key={k}>
        <strong> {index === 0 ? "Choices (A)" : ""}</strong>
        <strong> {index === 1 ? "Choices (B)" : ""}</strong>
        <strong> {index === 2 ? "Choices (C)" : ""}</strong>
        <strong> {index === 3 ? "Choices (D)" : ""}</strong>
        <strong> {index === 4 ? "Choices (E)" : ""}</strong>
        <strong> {index === 5 ? "Choices (F)" : ""}</strong>
        {getFieldDecorator(`questions[${this.props.id}]choices[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input a choice to the question"
            }
          ]
        })(

          <Input placeholder="Options/ Choice" />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </FormItem>
    ));
    return (
      <Hoc>
        <strong>
          <h3 style={{ color: 'red' }}>
            Querstion {this.props.id + 1}
          </h3>

        </strong>

        <FormItem >
          {getFieldDecorator(`question[${this.props.id}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                message: "Please input a question"
              }
            ]
          })(<Input placeholder="Add a question" />)}
        </FormItem>
        <FormItem label="">
          <strong style={{ color: 'green' }}> Answer (সঠিক উত্তর) </strong>
          {getFieldDecorator(`answers[${this.props.id}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                message: "Please input an answer to this question"
              }
            ]
          })(<Input placeholder="What is the answer?" />)}
        </FormItem>
        {formItems}
        <FormItem>
          <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
            <Icon type="plus" /> Add an Option / Choice
          </Button>
        </FormItem>
      </Hoc>
    );
  }
}

export default QuestionForm;
