
export interface ScoreTagProps {
    score: number;
    scoreIncreased: boolean;
}

export interface BubbleProps {
    target: number,
    lifespan: number;
    multiplier: number;
    updateScore: (x: number) => void;
}

export interface TimeBoxProps {
    status: string;
    target: number;
    createBubble: () => void;
    roundHasEnded: () => void;
    intervalSeconds: number;
}

export interface GameMenuProps {
    status: string;
    round: number;
    startNextRound: () => void;
}