import React, { useState, useEffect } from 'react'
import { getRandomOperation, } from '../../utils/math'
import styles from './bubble.module.css';
import useSound from 'use-sound';
import bubblePopSound from '../../sounds/bubble_pop.mp3';

const bubbleSize = 145;
const containerHeight = document.getElementById('bubbles-container')?.clientHeight || 450;
const containerWidth = document.documentElement.clientWidth;
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

const Bubble = ({
    target,
    lifespan,
    updateScore,
    multiplier,
}) => {
    const [playPop] = useSound(bubblePopSound, { volume: '0.25' })

    const [color, setColor] = useState("F0F0F0");
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [ttl, setTTL] = useState(lifespan);
    // eslint-disable-next-line no-unused-vars
    const [operation, setOperation] = useState(getRandomOperation(target))
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(true);

    /* Set color and position on Mount */
    useEffect(() => {
        setColor(getRandomColor());
        const { x, y } = getRandomPosition();
        setX(x);
        setY(y);
        setVisible(true);
    }, []);

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

    const selfDestruct = () => {
        setActive(false);
    }

    const handleBubbleClick = () => {
        console.log(`Clicked: <${operation.toString()}> = ${operation.result}`)
        playPop();

        if (operation.result === target) {
            updateScore(multiplier);

        } else {
            updateScore(Math.floor(multiplier / -2.0));

        }
        setActive(false);
    }


    return (
        active ? (
            <div className={styles.bubble} onClick={handleBubbleClick}
                style={{
                    position: 'absolute',
                    top: y,
                    right: x,
                    background: color,
                }}>
                <label className={visible ? styles['bubble-text'] : styles['invisible']}>
                    {operation.toString()}
                </label>
            </div>
        ) : (
            <></>
        )
    )
}




export default Bubble;