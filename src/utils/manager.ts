/* GAME MANAGER */

export class Game {
    score: number;
    status: string;
    rounds: number;


    constructor() {
        this.score = 0;
        this.status = 'active';
        this.rounds = 10;
    }
}