import { InputReader } from '../utils/InputReader.js';

interface IdRange {
    startRange: number,
    endRange: number
}

function parseInput() {
    const reader = InputReader.forPath('src/day5-cafeteria');
    const lines = reader.readLines(true); // keepEmpty = true -> keep empty line
    const emptyLineIndex = lines.findIndex(line => line === '');

    // fill ranges
    const rangeLines = lines.slice(0, emptyLineIndex);
    const ranges: IdRange[] = rangeLines.map(line => {
        const [start, end] = line.split('-').map(Number);
        return { startRange: start!, endRange: end! };
    });

    // fill ids
    const idLines = lines.slice(emptyLineIndex + 1);
    const ids: number[] = idLines.map(Number);

    return { ranges, ids };
}

function calculateAmountOfFreshIngredientIds(): number {
    const { ranges, ids } = parseInput();
    let result = 0;

    for (const id of ids) {
        for (const range of ranges) {
            if (id >= range.startRange && id <= range.endRange) {
                result++;
                break;
            }
        }
    }

    return result;
}

function calculateAmountOfFreshIngredientIdsInIdRanges(): number {
    const ranges = parseInput().ranges;

    // sort by startRange
    const sorted = ranges.sort((a, b) => a.startRange - b.startRange);

    // merge overlapping ranges
    const merged: IdRange[] = [];
    for (const range of sorted) {
        if (merged.length === 0) {
            merged.push({ ...range });
        } else {
            const last = merged[merged.length - 1];
            if (range.startRange <= last!.endRange + 1) {
                last!.endRange = Math.max(last!.endRange, range.endRange);
            } else {
                merged.push({ ...range });
            }
        }
    }

    let result = 0;
    for (const range of merged) {
        result += range.endRange - range.startRange + 1;
    }

    return result;
}

function main() {
    const resultPart1 = calculateAmountOfFreshIngredientIds();
    console.log(`Part 1: Amount of fresh ingredient ids: ${resultPart1}`);

    const resultPart2 = calculateAmountOfFreshIngredientIdsInIdRanges();
    console.log(`Part 1: Amount of fresh ingredient ids according to fresh ingredient id ranges: ${resultPart2}`);
}

main();

