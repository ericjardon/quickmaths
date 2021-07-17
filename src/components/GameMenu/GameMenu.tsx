import React, { useState, useEffect, FC } from 'react'
import { GameMenuProps } from '../interfaces';
import styles from './gamemenu.module.css';

const GameMenu: FC<GameMenuProps> = ({
    status,
    startNextRound,
}) => {

    if (status === "active")
        return (
            <></>
        )

    if (status === "endRound")
        return (
            <div className={styles.endRound}>
                Time's Up!

                <button onClick={() => startNextRound()}>Next Round</button>
            </div>
        )

    else {
        return (
            <div>ERROR</div>
        )
    }
}

export default GameMenu;