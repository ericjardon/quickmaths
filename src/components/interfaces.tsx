import { Addition, Division, Product } from "../utils/math";

export interface ScoreTagProps {
    score: number;
}

export interface BubbleProps {
    target: number,
    lifespan: number;
    //operation: Addition | Division | Product;
    selfDestruct: () => void;
}

export interface TimeBoxProps {
    target: number;
    roundHasEnded: () => void;
}

export interface GameMenuProps {
    status: string;
    startNextRound: () => void;
}