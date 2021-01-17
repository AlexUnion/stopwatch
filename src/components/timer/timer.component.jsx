import React from 'react';
import style from './timer.module.css';

const Timer = ({ time }) => {
    const { h, m, s } = time;

    const hStr = h > 9 ? h : '0' + h;
    const mStr = m > 9 ? m : '0' + m;
    const sStr = s > 9 ? s : '0' + s;

    const timeStr = `${hStr}:${mStr}:${sStr}`;

    return (
        <div className={style.container}>
            {
                timeStr
            }
        </div>
    )
}

export default Timer;