import React, { useState, useEffect } from 'react'
import { classicNameResolver } from 'typescript';
import { getTargetNumber } from '../../utils/math';
import styles from './timebox.module.css'

const roundSeconds = 15;

const Timebox = () => {

    const [timer, setTimer] = useState<number>(roundSeconds);
    const [target, setTarget] = useState<number>();


    const calculatedWidth = `${Math.floor((timer / roundSeconds) * 100)}%`

    useEffect(() => {
        const target = getTargetNumber();
        setTarget(target);
    }, [])

    useEffect(() => {
        console.log("Timer", timer);
        let timerId: any = null;
        if (timer > 0) {
            timerId = setTimeout(() => setTimer(timer => timer - 1), 1000);
        }

        return () => {
            clearTimeout(timerId);
        }

    }, [timer]);

    return (
        <div className={styles.timebox}>
            <p>{target}</p>
            <div className={styles.timebarParent}>
                <span className={styles.timebar} style={{ width: calculatedWidth }}></span>
            </div>
        </div>
    )
}


export default Timebox;