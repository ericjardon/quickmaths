import React, { useState, useEffect, FC } from 'react'
import { Addition, Division, Product } from '../../utils/math'
import { BubbleProps } from '../interfaces'

const Bubble: FC<BubbleProps> = ({
    operation,
}) => {
    const [color, setColor] = useState("F0F0F0");
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);


    useEffect(() => {
        setColor(getRandomColor());
        setX(Math.floor((Math.random() * 100) + 1));
        setY(Math.floor((Math.random() * 100) + 1));
    }, [])

    return (
        <div className="bubble" style={{ position: 'absolute', top: y + '%', right: x + '%', background: color }}>
            {operation.toString()}
        </div>
    )
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


export default Bubble;

