import { Addition, Division, Product } from "../utils/math";

export interface ScoreTagProps {
    score: number;
}

export interface BubbleProps {
    operation: Addition | Division | Product;
    lifespan: number;
    selfDestruct: () => void;
}

export interface TimeBoxProps {
    target: number;
    roundHasEnded: () => void;
}

export interface GameMenuProps {
    status: string;
}