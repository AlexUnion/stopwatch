import React, { useState, useEffect, useRef } from 'react';
import Timer from "./components/timer/timer.component";
import { fromEvent } from "rxjs";

import './App.css';

import timeDispatcher from "./store/time";
import {timeInterval} from "rxjs/operators";

const init = {
    h: 0,
    m: 0,
    s: 0,
}

let isPlay = false;
let clicksAction$ = null;

function handleStartStop() {
    if (!isPlay) {
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

    const waitRef = useRef(null);
    const [currentTime, setTime] = useState(init);

    const observer = {
        next: (data) => {
            setTime(data);
        }
    }

    useEffect(() => {
        timeDispatcher.subscribe(observer);

        clicksAction$ = fromEvent(waitRef.current, 'click');
        clicksAction$
            .pipe(timeInterval())
            .subscribe((x) => {
                const { interval } = x;
                if (interval > 300) {
                    timeDispatcher.wait();
                    isPlay = !isPlay;
                }
            });
    }, []);

    return (
        <div className="App">
            <Timer time={currentTime}/>
                <div className="btnContainer">
                <button type='button' onClick={handleStartStop}>Start/Stop</button>
                <button type='button' onClick={() => handleWait()} ref={waitRef}>Wait</button>
                <button type='button' onClick={() => handleReset()}>Reset</button>
            </div>
        </div>
    );
}

export default App;
