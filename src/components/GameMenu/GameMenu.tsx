import React, { FC } from 'react'
import { GameMenuProps } from '../interfaces';
import styles from './gamemenu.module.css';

const GameMenu: FC<GameMenuProps> = ({
    status,
    round,
    startNextRound,
    totalBubbles,
    totalCorrect,
    totalIncorrect,
}) => {

    if (status === "active")
        return (
            <></>
        )

    if (status === "welcome")
        return (
            <div className={styles.welcomeMenu}>
                <h2>Quick Maths: a Cognify spin-off</h2>

                <ul>
                    <li>Test your skills by clicking on the bubbles that equal the target at the bottom</li>
                    <li>You play for 5 rounds, each with a different target</li>
                    <li>A correct bubble gives adds 10 pts multiplied by the round number</li>
                    <li>An incorrect bubble will decrease your score by 5 point</li>
                </ul>

                <button id="startButton" className="menuButton" onClick={() => startNextRound()}>Start Game</button>
            </div>
        )

    if (status === "endRound")
        return (
            <div className={styles.endRound}>
                <p>Time's Up!</p>
                <p style={{ marginBottom: '16px' }}>Your round: {round}</p>
                <button className="menuButton" onClick={() => startNextRound()}>Next Round</button>
            </div>
        )

    if (status === "finished")
        return (
            <div className={styles.welcomeMenu}>
                <h2>Game Over!</h2>
                <ul>
                    <li>You clicked on {totalCorrect} correct operations</li>
                    <li>You clicked on {totalIncorrect} incorrect operations</li>
                    <li>You accuracy rate is %{Math.round((totalBubbles / totalCorrect) * 1000) / 10}</li>
                </ul>
                <button className="menuButton" >View Scoreboard</button>
            </div>
        )

    else {
        return (
            <div>ERROR</div>
        )
    }
}

export default GameMenu;