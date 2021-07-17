import React, { useState, useEffect, FC } from 'react'
import { Addition, Division, getRandomOperation, Product } from '../../utils/math'
import { BubbleProps } from '../interfaces'
import styles from './bubble.module.css';

const bubbleSize: number = 120;
const containerHeight: number = document.getElementById('bubbles-container')?.clientHeight || 450;
const containerWidth: number = document.documentElement.clientWidth;
const maxTop = containerHeight - bubbleSize;
const maxLeft = containerWidth - bubbleSize;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomPosition() {
    let x = Math.min(Math.floor((Math.random() * containerWidth) + 1), maxLeft);
    let y = Math.min(Math.floor((Math.random() * containerHeight) + 1), maxTop);

    return { x, y };
}

const Bubble: FC<BubbleProps> = ({
    //operation,
    target,
    lifespan,
    selfDestruct,
}) => {
    const [color, setColor] = useState<string>("F0F0F0");
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [ttl, setTTL] = useState<number>(lifespan);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [operation, setOperation] = useState<Addition | Product | Division>(getRandomOperation(target))
    const [visible, setVisible] = useState(false);

    /* On Mount */
    useEffect(() => {
        setColor(getRandomColor());
        const { x, y } = getRandomPosition();
        setX(x);
        setY(y);
        setVisible(true);
    }, [])

    /* Bubble Countdown Timer */
    useEffect(() => {
        if (ttl > 0) {
            const timerId = setTimeout(() => {
                setTTL(ttl => ttl - 1)
            }, 1000);
            return () => {
                clearTimeout(timerId);
            }
        } else if (ttl === 0) {
            selfDestruct();
        }

    }, [ttl]);


    return (
        <div className={styles.bubble} style={{
            position: 'absolute',
            top: y,
            right: x,
            background: color,
        }}>
            <label className={visible ? styles['bubble-text'] : styles['invisible']}>
                {operation.toString()}
            </label>
        </div>
    )
}




export default Bubble;