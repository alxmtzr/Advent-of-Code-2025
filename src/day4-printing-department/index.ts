import { InputReader } from '../utils/InputReader.js';

function getPaperGrid(): string[][] {
    const reader = InputReader.forPath('src/day4-printing-department');
    const lines = reader.readLines();
    const grid: string[][] = lines.map((line: string) => line.split(''));

    return grid;
}

function printPaperGrid(grid: string[][]) {
    for (const row of grid) {
        console.log(row.join(''));
    }
}

function calculateAmountOfRollsThatCanBeAccessed(): number {
    let paperGrid: string[][] = getPaperGrid();
    if (!paperGrid) return 0;

    let result = 0;

    for (let i = 0; i < paperGrid.length; i++) {
        const row = paperGrid[i]!;
        for (let j = 0; j < row.length; j++) {
            let cell = row[j]!;
            if (hasCellRoll(cell)) {
                const indexOfCell = { row: i, col: j };
                if (rollCanBeAccessed(paperGrid, indexOfCell)) {
                    result++;
                    paperGrid[i]![j] = 'x';
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

function removeAllAccessibleRolls(): number {
    let paperGrid: string[][] = getPaperGrid();
    let totalRemoved = 0;
    let removedThisRound: number;

    do {
        removedThisRound = 0;

        for (let i = 0; i < paperGrid.length; i++) {
            for (let j = 0; j < paperGrid[i]!.length; j++) {
                if (hasCellRoll(paperGrid[i]![j]!)) {
                    const indexOfCell = { row: i, col: j };
                    if (rollCanBeAccessed(paperGrid, indexOfCell)) {
                        paperGrid[i]![j] = 'x';
                        removedThisRound++;
                    }
                }
            }
        }

        totalRemoved += removedThisRound;
    } while (removedThisRound > 0); 

    return totalRemoved;
}

function main() {
    const resultPart1 = calculateAmountOfRollsThatCanBeAccessed();
    console.log(`Part 1: Total mount of rolls that can be accessed: ${resultPart1}`);

    const resultPart2 = removeAllAccessibleRolls();
    console.log(`Part 2: Total amount of rolls that can be removed: ${resultPart2}`);
}

main();