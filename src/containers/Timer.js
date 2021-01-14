import React, { Component } from 'react'


class Timer extends Component {






    constructor(props) {
        super(props)
        this.state = {
            count: 1,
            count2: 1
        }
    }


    render() {
        const { count } = this.state
        const { count2 } = this.state
        return (
            <div>
                <p>

                    <strong style={{ color: 'red', justifySelf: 'center', justifyItems: 'center' }}>  {Math.floor(count / 60)} min(s) {count - (Math.floor(count / 60)) * 60} sec to finish </strong>
                    <br></br>{" "}
                    <strong style={{ color: 'green', justifyItems: 'center' }}> Total Time: {Math.floor(count2 / 60)} min(s) {count2 - (Math.floor(count2 / 60)) * 60} sec </strong>



                </p>
            </div >
        )
    }
    /// setInterval
    // clearInterval
    componentDidMount() {
        const { startCount } = this.props
        this.setState({
            count: startCount,

        })
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({
                count: prevState.count - 1,
                count2: startCount
                // count: this.state.count + 1
                // 
            }))
        }, 1000) // mili seconds

    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
}

export default Timer