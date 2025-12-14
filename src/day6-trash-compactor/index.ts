import { InputReader } from '../utils/InputReader.js';

function getMathWorksheet() {
    const reader = InputReader.forPath('src/day6-trash-compactor');
    const lines = reader.readLines();
    const numberLines = lines.slice(0, lines.length - 1); 
    const operatorLine = lines[lines.length - 1]; 

    const workSheet: number[][] = numberLines.map(line =>
        line.trim().split(/\s+/).map(Number)
    );

    const operators = operatorLine!.trim().split(/\s+/); 
    return { workSheet, operators };
}

function calculateGrandTotal(): number {
    const { workSheet, operators } = getMathWorksheet();
    let result = 0;
    const countOfProblems = workSheet[0]?.length ?? 0;
    const countOfRows = workSheet.length;

    for (let i = 0; i < countOfProblems; i++) {
        const operator = operators[i]!;
        const numbers: number[] = [];
        for (let j = 0; j < countOfRows; j++) {
            numbers.push(Number(workSheet[j]![i]));
        }
        result += solveMathProblem(operator, numbers);
    }
    return result;
}

function solveMathProblem(operator: string, numbers: number[]): number {
    switch(operator) {
        case '+': return numbers.reduce((sum, n) => sum + n, 0);
        case '*': return numbers.reduce((prod, n) => prod * n, 1);
        default: throw new Error(`Unknown operator: ${operator}`);
    }
}

function calculateGrandTotalPart2(): number {
    const reader = InputReader.forPath('src/day6-trash-compactor');
    const lines = reader.readLines();
    const maxLength = Math.max(...lines.map(line => line.length));
    
    const charGrid: string[][] = [];
    for (const line of lines) {
        charGrid.push(line.padEnd(maxLength, ' ').split(''));
    }
    
    // rotate array left 90 degrees
    const rotatedGrid: string[][] = [];
    for (let col = maxLength - 1; col >= 0; col--) {
        const newRow: string[] = [];
        for (let row = 0; row < charGrid.length; row++) {
            newRow.push(charGrid[row]![col]!);
        }
        rotatedGrid.push(newRow);
    }
    
    const problems: {numbers: number[], operator: string}[] = [];
    let currentNumbers: number[] = [];
    
    for (const row of rotatedGrid) {
        const operator = row[row.length - 1]?.trim(); // operator is in last column

        const digitChars = row.slice(0, row.length - 1);
        const numberStr = digitChars.join('').trim();
        
        if (numberStr && numberStr !== '') {
            const number = parseInt(numberStr);
            if (!isNaN(number)) {
                currentNumbers.push(number);
            }
        }
        
        // create problem if operator found
        if (operator && operator !== '') {
            if (currentNumbers.length > 0) {
                problems.push({numbers: currentNumbers, operator: operator});
                currentNumbers = [];
            }
        }
    }
    
    let total = 0;
    for (const problem of problems) {
        const result = solveMathProblem(problem.operator, problem.numbers);
        total += result;
    }
    
    return total;
}

function main() {
    const resultPart1 = calculateGrandTotal();
    console.log(`Part 1: ${resultPart1}`);
    
    const resultPart2 = calculateGrandTotalPart2();
    console.log(`Part 2: ${resultPart2}`);
}

main();