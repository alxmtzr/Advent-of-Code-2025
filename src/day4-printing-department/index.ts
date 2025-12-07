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

function calculateAmountOfRollsThatCanBeAccessed(): number {
    const paperGrid: string[][] = getPaperGrid();
    if (!paperGrid) return 0;

    let result = 0;

    for (let i = 0; i < paperGrid.length; i++) {
        const row = paperGrid[i]!;
        for (let j = 0; j < row.length; j++) {
            const cell = row[j]!;
            if (hasCellRoll(cell)) {
                const indexOfCell = { row: i, col: j };
                if (rollCanBeAccessed(paperGrid, indexOfCell)) {
                    result++;
                }
            }
        }
    }


    return result;
}

function rollCanBeAccessed(paperGrid: string[][], indexOfCell: { row: number; col: number }): boolean {
    let count = 0;

    for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {
            // skip cell itself
            if (dRow === 0 && dCol === 0) continue;

            const newRow = indexOfCell.row + dRow;
            const newCol = indexOfCell.col + dCol;

            if (newRow >= 0 && newRow < paperGrid.length &&
                newCol >= 0 && newCol < paperGrid[newRow]!.length) {
                
                if (hasCellRoll(paperGrid[newRow]![newCol]!)) {
                    count++;
                }
            }
        }
    }

    return count < 4;
}


function hasCellRoll(cell: string): boolean {
    return cell === "@";
}


function main() {
    const resultPart1 = calculateAmountOfRollsThatCanBeAccessed();
    console.log(`Part 1: Amount of roll that can be accessed: ${resultPart1}`);
}

main();