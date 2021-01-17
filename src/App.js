import React, { useState } from 'react';
import Timer from "./components/timer/timer.component";

import './App.css';

import { Observable } from 'rxjs';
import timeDispatcher from "./store/time";

const init = {
    h: 0,
    m: 0,
    s: 0,
}

let isPlay = false;

function handleStartStop(observer) {
    if (!isPlay) {
        timeDispatcher.subscribe(observer);
        timeDispatcher.init();
    } else {
        timeDispatcher.reset()
    }
    isPlay = !isPlay;
}
function handleWait() {

}
function handleReset() {

}

function App() {

    const [currentTime, setTime] = useState(init);

    const observer = {
        next: (data) => {
            setTime(data);
        }
    }

    return (
        <div className="App">
            <Timer time={currentTime}/>
                <div className="btnContainer">
                <button type='button' onClick={() => {handleStartStop(observer)}}>Start/Stop</button>
                <button type='button' onClick={handleWait}>Wait</button>
                <button type='button' onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
}

export default App;
