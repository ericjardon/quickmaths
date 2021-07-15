import React, { useState, useEffect, FC } from 'react'
import { TimeBoxProps } from '../interfaces';
import styles from './timebox.module.css'

const roundSeconds = 15;

const Timebox: FC<TimeBoxProps> = ({
    target,
    roundHasEnded,
}) => {

    const [timer, setTimer] = useState<number>(roundSeconds);

    const calculatedWidth = `${Math.floor((timer / roundSeconds) * 100)}%`

    useEffect(() => {

        if (timer > 0) {
            const timerId = setTimeout(() => {
                setTimer(timer => timer - 0.25)
            }, 250);
            return () => {
                clearTimeout(timerId);
            }
        } else {
            roundHasEnded();
        }

    }, [timer]);

    return (
        <div className={styles.timebox}>
            <p className={styles.targetText}>{target}</p>
            <div className={styles.timebarParent}>
                <div className={styles.timebar} style={{ width: calculatedWidth }}>
                    &nbsp;
                </div>
            </div>
        </div>
    )
}


export default Timebox;