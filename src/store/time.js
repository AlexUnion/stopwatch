import { Subject } from 'rxjs';
import { stateReducer } from "./state";
import { TICK, RESET, WAIT } from "./actions";
import createInterval from "./createInterval";

const action$ = new Subject();

const timeDispatcher = {
    disState: {
        isPlay: false,
        isInterval: false,
        deleteIntervalFunc: () => {},
        toggleInterval(f) {
            this.deleteIntervalFunc = f;
            this.isInterval = true;
        },
        clearInterval() {
            if (this.isInterval) {
                this.deleteIntervalFunc();
                this.isInterval = false;
            }
        },
    },
    start() {
        this.disState.isPlay = true;
        const func = createInterval(
            () => action$.next(stateReducer(TICK))
        );
        this.disState.toggleInterval(func);
    },
    stop() {
        this.disState.isPlay = false;
        this.disState.clearInterval();
    },
    subscribe: (observer) => action$.subscribe(observer),
    play() {
        if (!this.disState.isPlay) {
            action$.next(stateReducer(RESET));
            this.start();
        } else {
            this.reset();
        }
    },
    reset() {
        this.stop();
        action$.next(stateReducer(RESET));
    },
    wait() {
        if (this.disState.isPlay) {
            this.stop();
            action$.next(stateReducer(WAIT));
        } else {
            this.start();
        }
    },
    resetAndStart() {
        this.reset();
        this.play();
    }
}

export default timeDispatcher;
