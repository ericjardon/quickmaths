import React, { FC } from 'react'
import { ScoreTagProps } from '../interfaces'
import { BsStarFill } from 'react-icons/bs';

const ScoreTag: FC<ScoreTagProps> = ({
    score,
}) => {
    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: '22px' }}>
            Score: <span style={{ marginLeft: '8px', color: '#D4AF37' }}><BsStarFill /></span> {score}
        </div>
    )
}

export default ScoreTag;