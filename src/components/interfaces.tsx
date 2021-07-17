import { Addition, Division, Product } from "../utils/math";

export interface ScoreTagProps {
    score: number;
}

export interface BubbleProps {
    target: number,
    lifespan: number;
    multiplier: number;
    addToScore: (x: number) => void;
}

export interface TimeBoxProps {
    target: number;
    createBubble: () => void;
    roundHasEnded: () => void;
}

export interface GameMenuProps {
    status: string;
    round: number;
    startNextRound: () => void;
}