import { Subject } from 'rxjs';
import { TICK, RESET } from "./actions";

const action$ = new Subject();

function createInterval(func = () => {}, time) {
    const intervalId = setInterval(() => {
        func();
    }, time);
    return () => {
        clearInterval(intervalId);
    }
}

const state = {
    h: 0,
    m: 0,
    s: 0,
}

function stateReducer(state, action) {
    switch (action) {
        case TICK: {
            state.s++;
            if (state.s >= 60) {
                state.m++;
                state.s -= 60;
            }
            if (state.m >= 60) {
                state.h++;
                state.m -= 60;
            }
            return {...state};
        }
        case RESET: {
            state.h = 0;
            state.m = 0;
            state.s = 0;
            return {...state};
        }
        default:
            return {...state};
    }
}

const timeDispatcher = {
    isPlay: false,
    deleteInterval: null,
    subscribe: (observer) => action$.subscribe(observer),
    init() {
        if (!this.deleteInterval) {
            this.deleteInterval = createInterval(() => {
                console.log('new value');
                const newState = stateReducer(state, TICK);
                action$.next(newState);
            }, 1000);
        }
    },
    reset() {
        if (this.deleteInterval) {
            console.log('unsubscribed');
            this.deleteInterval();
            this.deleteInterval = null;
            const newState = stateReducer(state, RESET);
            action$.next(newState);
        }
    },
}

export default timeDispatcher;
