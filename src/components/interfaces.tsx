import { Addition, Division, Product } from "../utils/math";

export interface ScoreTagProps {
    score: number;
}

export interface BubbleProps {
    operation: Addition | Division | Product;
}

export interface TimeBoxProps {
    target: number;
}