import { readInput } from '../utils/InputReader.js';

function getMathWorksheet() {
    const lines = readInput.lines(6);
    const numberLines = lines.slice(0, lines.length - 1); 
    const operatorLine = lines[lines.length - 1]; 

    const workSheet: number[][] = numberLines.map(line =>
        line.trim().split(/\s+/).map(Number)
    );

    const operators = operatorLine!.trim().split(/\s+/); 
    return { workSheet, operators };
}

function printMathWorkSheet(workSheet: string[][]) {
    for (const row of workSheet) {
        console.log(row.join(''));
    }
}

function calculateGrandTotal(): number {
    const { workSheet, operators } = getMathWorksheet();
    let result = 0;
    const countOfProblems = workSheet[0]?.length ?? 0; // count of columns
    const countOfRows = workSheet.length;

    for (let i = 0; i < countOfProblems; i++) { // iterate columns
        const operator = operators[i]!; // operator in last row
        const numbers: number[] = [];
        for (let j = 0; j < countOfRows; j++) { // iterate rows (without last row)
            numbers.push(Number(workSheet[j]![i]));
        }
        result += solveMathProblem(operator!, numbers);
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

function main() {
    const resultPart1 = calculateGrandTotal();
    console.log(`Part 1: Grand total found by adding together all of the answers to the individual problems: ${resultPart1}`);
}

main();