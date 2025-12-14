import { InputReader } from '../utils/InputReader.js';

function readTachyonManifold(): string[][] {
    const reader = InputReader.forPath('src/day7-laboratories');
    const lines = reader.readLines();
    return lines.map(line => line.split('')); 
}

function printManifold(manifold: string[][]): void {
    for (const row of manifold) {
        console.log(row.join('')); 
    }
}

function getTotalSplitCount(): number {
    let manifold: string[][] = readTachyonManifold();
    const rows = manifold.length;
    const columns = manifold[0]?.length ?? 0;
    let result = 0;

    for (let i = 0; i < rows - 1; i++) {
        for (let j = 0; j < columns; j++) {
            const currentValue = manifold[i]![j];
            if (currentValue === 'S' || currentValue === '|') {
                const nextValue = manifold[i + 1]![j];

                if (beamCanAdvance(nextValue!)) {
                    manifold[i + 1]![j] = '|';
                }

                if (beamEncountersSplitter(nextValue!)) {
                    result++;
                    splitBeam(i, j, manifold);
                }
            }
        }
    }

/*     printManifold(manifold); */
    return result;
}

// helpers part 1
function splitBeam(rowIndex: number, columnIndex: number, manifold: string[][]) {
    const nextRow = rowIndex + 1;
    if (nextRow >= manifold.length) return manifold;

    const leftCol = columnIndex - 1;
    if (leftCol >= 0 && beamCanAdvance(manifold[nextRow]![leftCol]!)) {
        manifold[nextRow]![leftCol] = '|';
    }

    const rightCol = columnIndex + 1;
    if (rightCol < manifold[nextRow]!.length && beamCanAdvance(manifold[nextRow]![rightCol]!)) {
        manifold[nextRow]![rightCol] = '|';
    }

    return manifold;
}

function beamCanAdvance(value: string): boolean {
    return value === '.';
}

function beamEncountersSplitter(value: string): boolean {
    return value === '^';
}

// part 2
function getTotalTimelineCount(): number {
    const manifold = readTachyonManifold();
    const startCol = manifold[0]!.indexOf('S');

    const timelineCache = new Map<string, number>();

    function recurse(row: number, col: number): number {
        const rows = manifold.length;
        const columns = manifold[0]!.length;

        if (row >= rows || col < 0 || col >= columns) return 1; // if outside of matrix, timeline is finished

        const key = `${row},${col}`;
        if (timelineCache.has(key)) return timelineCache.get(key)!;

        const cell = manifold[row]![col];
        let total = 0;

        if (cell === '^') {
            // split beam: beide Wege
            if (col > 0) total += recurse(row + 1, col - 1);
            if (col < columns - 1) total += recurse(row + 1, col + 1);
        } else {
            // beam goes straight down
            total = recurse(row + 1, col);
        }

        timelineCache.set(key, total);
        return total;
    }

    return recurse(1, startCol); 
}

function main() {
    const resultPart1 = getTotalSplitCount();
    console.log(`Part 1: Total split count: ${resultPart1}`);

    const resultPart2 = getTotalTimelineCount();
    console.log(`Part 2: Total timeline count: ${resultPart2}`);
}

main();
