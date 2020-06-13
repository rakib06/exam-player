import React from 'react'




import './myStyles.css'
import ReactTypingEffect from 'react-typing-effect';
function Stylesheet() {
    return (
        <div>
            <ReactTypingEffect
                className='primary1'
                //text={new Date().toLocaleDateString()} //text=["Hello.", "World!"]
                //staticText={new Date().toLocaleDateString()}
                staticText="Live Exams: "
                text="Tap to start >>"


            />
            {/*<h5 className='primary'> <b> Live Exams {new Date().toLocaleDateString()}</b> </h5>*/}
        </div>
    )
}

export default Stylesheet
