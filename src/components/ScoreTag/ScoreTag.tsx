import React, { useState, useEffect, FC } from 'react'
import { ScoreTagProps } from '../interfaces'
import { BsStarFill } from 'react-icons/bs';
import styles from './scoretag.module.css'

const ScoreTag: FC<ScoreTagProps> = ({
    score,
    scoreIncreased,
}) => {

    const [colorClass, setColorClass] = useState(styles.scoretag);

    useEffect(() => {
        // change from colored class to normal scoretag class
        setColorClass(scoreIncreased ? styles['green-score'] : styles['red-score'])

        setTimeout(() => {
            setColorClass(styles.scoretag);
        }, 200);

    }, [scoreIncreased, score])


    return (
        <div className={colorClass}>
            Score: <span className={styles.star}><BsStarFill /></span> {score}
        </div>
    )
}

export default ScoreTag;