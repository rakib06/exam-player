import React from "react";
import { Radio } from "antd";

const RadioGroup = Radio.Group;

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};

class Choices extends React.Component {
  render() {
    const { questionId } = this.props;
    const { usersAnswers } = this.props;
    const { isSubmit } = this.props;
    const { answer } = this.props;

    return (
      <RadioGroup
        onChange={(e, qId) => this.props.change(e, questionId)}
        value={
          usersAnswers[questionId] !== undefined &&
            usersAnswers[questionId] !== null
            ? usersAnswers[questionId]
            : usersAnswers[questionId] = "blank"
        }
      >
        {this.props.choices.map((c, index) => {
          return (
            <Radio style={radioStyle} value={c} key={index} >
              {c}



              {isSubmit === "Yes" && usersAnswers[questionId] === answer && c === answer ? <span style={{ color: "green" }}> &#10004; </span> : ""}

              {isSubmit === "Yes" && usersAnswers[questionId] !== answer && c === answer ? <span style={{ color: "purple" }}>  &#10004; &#10175; </span> : ""
              }
              {isSubmit === "Yes" && usersAnswers[questionId] === c && usersAnswers[questionId] !== "blank" && c !== answer ? <span style={{ color: "red" }}>  &#10008; </span> : ""}

              {console.log(c)}
            </Radio>
          );
        })
        }
      </RadioGroup >
    );
  }
}

export default Choices;
