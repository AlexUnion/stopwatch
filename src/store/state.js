import {RESET, TICK, WAIT} from "./actions";

const state = {
    h: 0,
    m: 0,
    s: 0,
}

export function stateReducer(action) {
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
        case WAIT: {
            return {...state};
        }
        default:
            return {...state};
    }
}