function shuntingYard(expression) {
    const output = [];
    const operators = [];
    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 3 };
    const associativity = { '+': 'L', '-': 'L', '*': 'L', '/': 'L', '^': 'R' };

    expression.split(/\s+/).forEach(token => {
        if (!isNaN(token)) {
            output.push(token);
        } else if (token in precedence) {
            while (operators.length &&
                   operators[operators.length - 1] !== '(' &&
                   ((associativity[token] === 'L' && precedence[token] <= precedence[operators[operators.length - 1]]) ||
                    (associativity[token] === 'R' && precedence[token] < precedence[operators[operators.length - 1]]))) {
                output.push(operators.pop());
            }
            operators.push(token);
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length && operators[operators.length - 1] !== '(') {
                output.push(operators.pop());
            }
            operators.pop(); // Remove '(' from the stack
        }
    });

    while (operators.length) {
        output.push(operators.pop());
    }

    return output.join(' ');
}

// console.log(shuntingYard("3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3"));
// Output: "3 4 2 * 1 5 - 2 3 ^ ^ / +"
