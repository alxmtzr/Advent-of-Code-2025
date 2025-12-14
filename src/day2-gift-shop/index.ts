import { InputReader } from '../utils/InputReader.js';

interface Range {
    startRange: number;
    endRange: number;
}

function parseInput(input: string[]): Range[] {
    return input.map(line => {
        const [start, end] = line.split('-').map(Number);
        return { startRange: start || 0, endRange: end || 0 };
    });
}

function getRanges(): Range[] {
    const reader = InputReader.forPath('src/day2-gift-shop');
    return parseInput(reader.readCommaSeparated());
}

function isInvalidIDWhenRepeatedTwice(id: number): boolean {
    const str = id.toString();
    const len = str.length;

    if (len % 2 !== 0) return false;
    
    const half = len / 2;
    const firstHalf = str.substring(0, half);
    const secondHalf = str.substring(half);
    
    return firstHalf === secondHalf;
}

function calculateAllInvalidIdsWhenRepeatedTwice(ranges: Range[]): number {
    let totalInvalidIds = 0;

    for (const range of ranges) {
        for (let id = range.startRange; id <= range.endRange; id++) {
            if (isInvalidIDWhenRepeatedTwice(id)) {
                totalInvalidIds += id;
            }
        }
    }
    return totalInvalidIds;
}

function isInvalidIDWhenRepeatedAtLeastTwice(id: number): boolean {
    const str = id.toString();
    const len = str.length;

    let chunks: number[] = getPossibleChunkSizes(id);

    for (const chunkSize of chunks) {
        const chunk = str.substring(0, chunkSize);
        let repeatedStr = '';
        const repeatCount = len / chunkSize;

        for (let i = 0; i < repeatCount; i++) {
            repeatedStr += chunk;
        }
        if (repeatedStr === str) {
            return true;
        }
    }
    
    return false;
}

function getPossibleChunkSizes(id: number): number[] {
    const str = id.toString();
    const len = str.length;
    const chunkSizes: number[] = [];
    
    for (let chunkSize = 1; chunkSize < len; chunkSize++) {
        if (len % chunkSize === 0) {
            chunkSizes.push(chunkSize);
        }
    }
    
    return chunkSizes;
}

function calculateAllInvalidIdsWhenRepeatedAtLeastTwice(ranges: Range[]): number {
    let totalInvalidIds = 0;

    for (const range of ranges) {
        for (let id = range.startRange; id <= range.endRange; id++) {
            if (isInvalidIDWhenRepeatedAtLeastTwice(id)) {
                totalInvalidIds += id;
            }
        }
    }
    return totalInvalidIds;
}

function main() {
    const ranges = getRanges();

    // part 1
    const totalInvalidIdsWhenRepeatedTwice = calculateAllInvalidIdsWhenRepeatedTwice(ranges);
    console.log(`Part 1: Total sum of all invalid gift card IDs: ${totalInvalidIdsWhenRepeatedTwice}`);

    // part 2
    const totalInvalidIdsWhenRepeatedAtLeastTwice = calculateAllInvalidIdsWhenRepeatedAtLeastTwice(ranges);
    console.log(`Part 2: Total sum of all invalid gift card IDs: ${totalInvalidIdsWhenRepeatedAtLeastTwice}`);
}

main();