import React from "react";
import { Radio } from "antd";

const RadioGroup = Radio.Group;

const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
};
//const { isSubmit } = this.props;
//{ isSubmit === "Yes" && c === answer ? " << " : "" }

class Options extends React.Component {
    render() {
        const { questionId } = this.props;
        const { usersAnswers } = this.props;
        const { answer } = this.props;
        return (
            <RadioGroup

                value={
                    usersAnswers[questionId] !== undefined &&
                        usersAnswers[questionId] !== null
                        ? usersAnswers[questionId]
                        : usersAnswers[questionId] = answer
                }
            >
                {this.props.choices.map((c, index) => {
                    return (
                        <Radio style={radioStyle} value={c} key={index} >
                            {index === 0 ? "A. " : ""}
                            {index === 1 ? "B. " : ""}
                            {index === 2 ? "C. " : ""}
                            {index === 3 ? "D. " : ""}
                            {index === 4 ? "E. " : ""}
                            {c}


                            {console.log(c)}
                        </Radio>
                    );
                })}
            </RadioGroup>
        );
    }
}

export default Options;
