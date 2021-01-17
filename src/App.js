import React, { useState, useEffect, useRef } from 'react';
import Timer from "./components/timer/timer.component";
import { fromEvent } from "rxjs";
import { timeInterval } from "rxjs/operators";
import './App.css';
import timeDispatcher from "./store/time";

function handleStartStop() {
    timeDispatcher.play();
}
function handleReset() {
    timeDispatcher.resetAndStart();
}

function App() {

    const waitRef = useRef(null);
    const [currentTime, setTime] = useState({
        h: 0,
        m: 0,
        s: 0,
    });

    useEffect(() => {
        const observer = {
            next: (data) => {
                setTime(data);
            }
        }
        timeDispatcher.subscribe(observer);

        const clicksAction$ = fromEvent(waitRef.current, 'click');
        clicksAction$
            .pipe(timeInterval())
            .subscribe((x) => {
                const { interval } = x;
                if (interval > 299) {
                    timeDispatcher.wait();
                }
            });
    }, []);

    return (
        <div className="App">
            <Timer time={currentTime}/>
                <div className="btnContainer">
                <button type='button' onClick={handleStartStop}>Start/Stop</button>
                <button type='button' ref={waitRef}>Wait</button>
                <button type='button' onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
}

export default App;
