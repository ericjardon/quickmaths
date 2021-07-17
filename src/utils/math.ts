export class Addition {

    result: number;
    operandA: number;
    operandB: number;
    signA: number;

    constructor(target: number, range: number = 50) {
        this.result = target;

        this.signA = Math.random() < 0.5 ? -1 : 1;

        this.operandA = (Math.round((Math.random() * range) + 1)) * this.signA;

        this.operandB = target - this.operandA;
    }

    toString() {
        return `${this.operandA} ${this.operandB < 0 ? '- ' : '+ '}${Math.abs(this.operandB)}`;
    }
}

export class Division {

    result: number;
    operandA: number;
    operandB: number;
    signA: number;

    constructor(target: number, range = 12) {
        this.result = target;

        this.signA = Math.random() < 0.5 ? -1 : 1;

        this.operandA = (Math.round((Math.random() * range) + 1)) * this.signA;

        this.operandB = target * (this.operandA);
    }

    toString() {
        return `${this.operandB < 0 ? '(' : ''}${this.operandB}${this.operandB < 0 ? ')' : ''} \u00F7 ${this.operandA < 0 ? '(' : ''}${this.operandA}${this.operandA < 0 ? ')' : ''}`;
    }

}


export class Product {

    result: number;
    signA: number;
    operandA: number;  // factor of result
    operandB: number;  // quotient

    static getFactors = (target: number) => {

        let factors = [1];
        const ceil = Math.ceil(target ** 0.5)
        for (let i = 2; i <= ceil; i++) {
            if (target % i === 0) {
                factors.push(i);
            }
        }
        return factors;
    }

    constructor(target: number, range = 100) {
        // find a factor of target
        this.result = target;
        this.signA = Math.random() < 0.5 ? -1 : 1;
        let factors = Product.getFactors(target);

        // Randomly pick a factor with random sign
        let index = Math.floor(Math.random() * factors.length);
        this.operandA = factors[index] * this.signA;

        // Operand is the quotient
        this.operandB = target / this.operandA;
    }

    toString() {
        return `${this.operandA < 0 ? '(' : ''}${this.operandA}${this.operandA < 0 ? ')' : ''} \u00d7 ${this.operandB < 0 ? '(' : ''}${this.operandB}${this.operandB < 0 ? ')' : ''}`;
    }
}

export const getRandomOperation = (target: number) => {
    let choice = Math.floor((Math.random() * 3) + 1);

    switch (choice) {
        case 1:
            return new Addition(target);
        case 2:
            return new Division(target);
        case 3:
            return new Product(target);
        default:
            return new Addition(target);
    }
}


export const test = () => {
    const a = new Addition(5);

    const d = new Division(35);

    const m = new Product(72);

    console.log(a.toString(), " = ", a.result);
    console.log(d.toString(), " = ", d.result);
    console.log(m.toString(), " = ", m.result);
}


export const getTargetNumber = () => {
    const val = Math.floor(Math.random() * 1000);
    const sign = Math.random() < 0.5 ? -1 : 1

    return sign * val;
}