import React, { useState, useEffect, FC } from 'react'
import { TimeBoxProps } from '../interfaces';
import styles from './timebox.module.css'

const roundSeconds = 15;

const Timebox: FC<TimeBoxProps> = ({
    target,
    roundHasEnded,
    createBubble,
}) => {

    const [timer, setTimer] = useState<number>(0);
    useEffect(() => {
        setTimer(roundSeconds);
    }, [target])

    useEffect(() => {

        if (timer > 0) {

            if ((timer * 1000) % 2000 === 0) {
                console.log("Timebox creates bubble");
                createBubble();
            }

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

    const calculatedWidth = `${Math.floor((timer / roundSeconds) * 100)}%`;

    return (
        <div className={styles.timebox}>
            <p className={styles.targetText}>{target}</p>
            <div className={styles.timebarParent}>
                <div className={styles.timebar}
                    style={{
                        width: calculatedWidth,
                        backgroundColor: timer < Math.floor(roundSeconds / 3.0) ? 'red' : 'dodgerblue'
                    }}>
                    &nbsp;
                </div>
            </div>
        </div>
    )
}


export default Timebox;