import React, { Component } from 'react'
export class Message extends Component {
    constructor() {
        super()
        this.state = {
            message: "Message visitor"
        }
    }
    changeMessage() {
        this.setState({
            message: "Thank you"
        })
    }
    render() {
        return (
            <div>
                <h1>{this.state.message}</h1>
                <button onClick={() => this.changeMessage()}> Subscribe </button>
            </div>

        )
    }
}
export default Message