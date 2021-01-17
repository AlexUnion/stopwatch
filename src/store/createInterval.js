export default function createInterval(func = () => {}, time = 1000) {
    const intervalId = setInterval(() => {
        func();
    }, time);
    return function () {
        clearInterval(intervalId);
    };
};