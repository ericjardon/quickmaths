"use strict";
/*
Utility classes for generating Addition, Division and Multiplication expressions.

Given a target we generate an expression from three possible operations: f={addition, substraction, multiplication}
First we generate a random operand A, and then the corresponding operand B so that f(a,b) equals the target.
With 50% probability we induce error to either operand.

getRandomOperation will arbitrarily return an Addition, Division or Multiplication expression.
Approximately half of the generated operations are correct (equivalent to target).
*/
exports.__esModule = true;
exports.getTargetNumber = exports.test = exports.getRandomOperation = exports.Product = exports.Division = exports.Addition = void 0;
var errVariance = 3;
var errProbability = 0.35;
function random(range) {
    return (Math.round((Math.random() * range) + 1));
}
function randomSign() {
    return (Math.random() < 0.5 ? -1 : 1);
}
var Addition = /** @class */ (function () {
    function Addition(target, range) {
        if (range === void 0) { range = 50; }
        this.signA = randomSign();
        this.operandA = random(range) * this.signA;
        this.operandB = target - this.operandA;
        /* Generate error of +/- 3 with 0.5 probability to either operand */
        if (Math.random() < errProbability) {
            var randomError = random(errVariance) * randomSign();
            // Tweak operand A or operand B
            if (Math.random() < 0.5) {
                this.operandA = this.operandA + randomError;
            }
            else {
                this.operandB = this.operandB + randomError;
            }
        }
        this.result = this.operandA + this.operandB;
    }
    Addition.prototype.toString = function () {
        return this.operandA + " " + (this.operandB < 0 ? '- ' : '+ ') + Math.abs(this.operandB);
    };
    return Addition;
}());
exports.Addition = Addition;
var Division = /** @class */ (function () {
    function Division(target, range) {
        if (range === void 0) { range = 12; }
        this.result = target;
        this.signA = randomSign();
        this.operandA = random(range) * this.signA;
        this.operandB = target * (this.operandA);
        // Generate error of +/- 3 with 0.5 probability on either operand
        if (Math.random() < errProbability) {
            var randomError = random(errVariance) * randomSign();
            // Tweak operand A or operand B
            if (Math.random() < 0.5) {
                this.operandA = this.operandA + randomError;
            }
            else {
                this.operandB = this.operandB + randomError;
            }
        }
        this.result = this.operandB / this.operandA;
    }
    Division.prototype.toString = function () {
        return "" + (this.operandB < 0 ? '(' : '') + this.operandB + (this.operandB < 0 ? ')' : '') + " \u00F7 " + (this.operandA < 0 ? '(' : '') + this.operandA + (this.operandA < 0 ? ')' : '');
    };
    return Division;
}());
exports.Division = Division;
var Product = /** @class */ (function () {
    function Product(target, range) {
        if (range === void 0) { range = 100; }
        // find a factor of target
        this.result = target;
        this.signA = randomSign();
        var factors = Product.getFactors(target);
        // Randomly pick a factor with random sign
        var index = Math.floor(Math.random() * factors.length);
        this.operandA = factors[index] * this.signA;
        // Operand is the quotient
        this.operandB = target / this.operandA;
        // Generate error of +/- 3 with 0.5 probability on either operand
        if (Math.random() < 0.5) {
            var randomError = random(errVariance) * randomSign();
            // Tweak operand A or operand B
            if (Math.random() < errProbability) {
                this.operandA = this.operandA + randomError;
            }
            else {
                this.operandB = this.operandB + randomError;
            }
        }
        this.result = this.operandB * this.operandA;
    }
    Product.prototype.toString = function () {
        return "" + (this.operandA < 0 ? '(' : '') + this.operandA + (this.operandA < 0 ? ')' : '') + " \u00D7 " + (this.operandB < 0 ? '(' : '') + this.operandB + (this.operandB < 0 ? ')' : '');
    };
    Product.getFactors = function (target) {
        var factors = [1];
        var ceil = Math.ceil(Math.pow(target, 0.5));
        for (var i = 2; i <= ceil; i++) {
            if (target % i === 0) {
                factors.push(i);
            }
        }
        return factors;
    };
    return Product;
}());
exports.Product = Product;
var getRandomOperation = function (target) {
    var choice = Math.floor((Math.random() * 3) + 1);
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
};
exports.getRandomOperation = getRandomOperation;
var test = function () {
    var vals = [5, 20, -50];
    console.log(vals);
    console.log("\nTest addition");
    var a = null;
    vals.forEach(function (val) {
        a = new Addition(val);
        console.log(a.operandA + " + " + a.operandB + " = " + (a.operandA + a.operandB));
        console.log("To string:", a.toString(), " = ", a.result);
        console.log("Target: " + val + ", Result: " + a.result);
    });
    console.log('\nTest Division');
    vals.forEach(function (val) {
        a = new Division(val);
        console.log(a.operandB + " \u00F7 " + a.operandA + " = " + a.operandB / a.operandA);
        console.log("To string:", a.toString(), " = ", a.result);
        console.log("Target: " + val + ", Result: " + a.result);
    });
    console.log('\nTest Product');
    vals.forEach(function (val) {
        a = new Product(val);
        console.log(a.operandA + " * " + a.operandB + " = " + a.operandA * a.operandB);
        console.log("To string:", a.toString(), " = ", a.result);
        console.log("Target: " + val + ", Result: " + a.result);
    });
};
exports.test = test;
var getTargetNumber = function () {
    var val = Math.floor(Math.random() * 1000);
    var sign = randomSign();
    return sign * val;
};
exports.getTargetNumber = getTargetNumber;
exports.test();
