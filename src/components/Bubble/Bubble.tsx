import React, { useState, useEffect, FC } from 'react'
//import { Addition, Division, Product } from '../../utils/math'
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
    operation,
}) => {
    const [color, setColor] = useState("F0F0F0");
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);


    useEffect(() => {
        setColor(getRandomColor());
        const { x, y } = getRandomPosition();
        setX(x);
        setY(y);
    }, [])


    return (
        <div className={styles.bubble} style={{
            position: 'absolute',
            top: y,
            right: x,
            background: color,
        }}>
            <label className={styles['bubble-text']}>
                {operation.toString()}
            </label>
        </div>
    )
}




export default Bubble;

