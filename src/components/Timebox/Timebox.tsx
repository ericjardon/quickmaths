import React, { useState, useEffect, FC } from 'react'
import { TimeBoxProps } from '../interfaces';
import styles from './timebox.module.css'

const roundSeconds = 20;

const Timebox: FC<TimeBoxProps> = ({
    status,
    target,
    roundHasEnded,
    createBubble,
    intervalSeconds = 2000,
}) => {

    const [timer, setTimer] = useState<number>(0);

    // Should run on every new round on status change
    useEffect(() => {
        if (status === 'active') {
            setTimer(roundSeconds);
        }
    }, [status])

    // Should update timer every second unless inactive
    useEffect(() => {
        if (status !== 'active') return;

        if (timer > 0) {

            if ((timer * 1000) % intervalSeconds === 0) {
                console.log("Timebox creates bubble");
                createBubble();
            }

            const timerId = setTimeout(() => {
                setTimer(timer => timer - 0.25)
            }, 250);
            return () => {
                clearTimeout(timerId);
            }
        }

        if (timer === 0 && status === 'active') {
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