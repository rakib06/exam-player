import React from "react";
import { Steps, Button } from "antd";
import { ProgressTimer } from "react-progress-timer";
const Step = Steps.Step;


class Questions extends React.Component {
  state = {
    current: 0,

  };

  next() {
    const current = this.state.current + 1;

    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    const { questions } = this.props;
    return (
      <div>


        {
          < Steps current={current}>
            {questions.map((q, index) => (
              <strong>
                {//current} of {questions.length
                  //Total Questions : {questions.length}
                }
              </strong>

            ))}
          </Steps>
        }

        <div>{questions[current]}</div>

        <div>

          {current === 0 && (
            <Button type="danger" >
              Start
            </Button>

          )}
          {current > 0 && (
            <Button type="danger" onClick={() => this.prev()}>
              Prev
            </Button>

          )} {"  "}

          {current < questions.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === questions.length - 1 && (
            <Button type="primary" onClick={() => this.props.submit()}>
              Submit
            </Button>
          )}

        </div>
      </div >
    );
  }
}

export default Questions;
