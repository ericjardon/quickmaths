import React, { FC } from 'react'
import { ScoreTagProps } from '../interfaces'
import { BsStarFill } from 'react-icons/bs';
import styles from './scoretag.module.css'

const ScoreTag: FC<ScoreTagProps> = ({
    score,
}) => {
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: '22px', color: '#fff' }}>
            Score: <span style={{ marginLeft: '8px', marginRight: '4px', color: '#DAA520' }}><BsStarFill /></span> {score}
        </div>
    )
}

export default ScoreTag;