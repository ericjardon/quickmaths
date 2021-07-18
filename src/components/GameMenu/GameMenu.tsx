import React, { useState, useEffect, FC } from 'react'
import { GameMenuProps } from '../interfaces';
import styles from './gamemenu.module.css';

const GameMenu: FC<GameMenuProps> = ({
    status,
    round,
    startNextRound,
}) => {

    if (status === "active")
        return (
            <></>
        )

    if (status === "welcome")
        return (
            <div className={styles.welcomeMenu}>
                <h2>Welcome to Quick Maths</h2>

                <ul>
                    <li>Test your skills by clicking on the bubbles that equal the target at the bottom</li>
                    <li>You play for 5 rounds, each with a different target</li>
                    <li>A correct bubble gives adds 10 pts multiplied by the round number</li>
                    <li>An incorrect bubble will decrease your score by 1 point</li>
                </ul>

                <button onClick={() => startNextRound()}>Start Game</button>
            </div>
        )

    if (status === "endRound")
        return (
            <div className={styles.endRound}>
                <p>Time's Up!</p>
                <p>Your round: {round}</p>
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