/*
Utility classes for generating Addition, Division and Multiplication expressions.

Given a target we generate an expression from three possible operations: f={addition, substraction, multiplication} 
First we generate a random operand A, and then the corresponding operand B so that f(a,b) equals the target.
With 50% probability we induce error to either operand.

getRandomOperation will arbitrarily return an Addition, Division or Multiplication expression.
Approximately half of the generated operations are correct (equivalent to target).
*/

const errVariance = 3;
const errProbability = 0.35;

function random(range: number) {
    return (Math.round((Math.random() * range) + 1))
}

function randomSign() {
    return (Math.random() < 0.5 ? -1 : 1);
}

export class Addition {

    result: number;
    operandA: number;
    operandB: number;
    signA: number;

    constructor(target: number, range: number = 50) {

        this.signA = randomSign();

        this.operandA = random(range) * this.signA;

        this.operandB = target - this.operandA;

        /* Generate error of +/- 3 with 0.5 probability to either operand */
        if (Math.random() < errProbability) {

            const randomError = random(errVariance) * randomSign();
            // Tweak operand A or operand B
            if (Math.random() < 0.5) {
                this.operandA = this.operandA + randomError;
            } else {
                this.operandB = this.operandB + randomError;
            }
        }

        this.result = this.operandA + this.operandB
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

        this.signA = randomSign();
        // dont let operandA be zero
        this.operandA = random(range) * this.signA;

        this.operandB = target * (this.operandA);

        // Generate error of +/- 3 with 0.5 probability on either operand
        if (Math.random() < errProbability) {

            const randomError = random(errVariance) * randomSign();

            // Tweak operand A or operand B
            if (Math.random() < 0.5) {
                this.operandA = this.operandA + randomError;
            } else {
                this.operandB = this.operandB + randomError;
            }
        }

        this.result = this.operandB / this.operandA

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
        this.signA = randomSign();
        let factors = Product.getFactors(target);

        // Randomly pick a factor with random sign
        let index = Math.floor(Math.random() * factors.length);
        this.operandA = factors[index] * this.signA;

        // Operand is the quotient
        this.operandB = target / this.operandA;

        // Generate error of +/- 3 with 0.5 probability on either operand
        if (Math.random() < 0.5) {

            const randomError = random(errVariance) * randomSign();

            // Tweak operand A or operand B
            if (Math.random() < errProbability) {
                this.operandA = this.operandA + randomError;
            } else {
                this.operandB = this.operandB + randomError;
            }
        }

        this.result = this.operandB * this.operandA;

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

    const vals = [5, 20, -50];
    console.log(vals)

    console.log("\nTest addition")
    let a = null;
    vals.forEach(val => {
        a = new Addition(val);

        console.log(`${a.operandA} + ${a.operandB} = ${a.operandA + a.operandB}`);

        console.log("To string:", a.toString(), " = ", a.result);
        console.log(`Target: ${val}, Result: ${a.result}`)
    })

    console.log('\nTest Division')
    vals.forEach(val => {
        a = new Division(val);

        console.log(`${a.operandB} \u00F7 ${a.operandA} = ${a.operandB / a.operandA}`);

        console.log("To string:", a.toString(), " = ", a.result);
        console.log(`Target: ${val}, Result: ${a.result}`)
    })

    console.log('\nTest Product')
    vals.forEach(val => {
        a = new Product(val);

        console.log(`${a.operandA} * ${a.operandB} = ${a.operandA * a.operandB}`);

        console.log("To string:", a.toString(), " = ", a.result);
        console.log(`Target: ${val}, Result: ${a.result}`)
    })

}


export const getTargetNumber = () => {
    const val = Math.floor(Math.random() * 1000);
    const sign = randomSign();

    return sign * val;
}

test();