import React, { FC } from 'react'
import { ScoreTagProps } from '../interfaces'
import { BsStarFill } from 'react-icons/bs';
import styles from './scoretag.module.css'

const ScoreTag: FC<ScoreTagProps> = ({
    score,
}) => {
    return (
        <div className={styles.scoretag}>
            Score: <span className={styles.star}><BsStarFill /></span> {score}
        </div>
    )
}

export default ScoreTag;