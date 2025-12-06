import { readInput } from '../utils/InputReader.js';

function getPaperGrid(): string[][] {
    const lines = readInput.lines(4);
    const grid: string[][] = lines.map((line: string) => line.split(''));

    return grid;
}

function printPaperGrid(grid: string[][]) {
    for (const row of grid) {
        console.log(row.join(''));
    }
}

printPaperGrid(getPaperGrid());
