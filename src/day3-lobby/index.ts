import { readInput } from '../utils/InputReader.js';


function getBanks(): string[] {
    return readInput.lines(3);
}

function calculateTotalOutputJoltage(numOfTurnedOnBatteries: number): number {
    return getBanks().reduce(
        (sum, bank) => sum + calculateLargestPossibleJoltageOfBank(bank, numOfTurnedOnBatteries),
        0
    );
}

function calculateLargestPossibleJoltageOfBank(bank: string, k: number): number {
    const result: number[] = [];
    let start = 0;
    const n = bank.length;

    for (let remaining = k; remaining > 0; remaining--) {
        let maxDigit = 0;
        let maxIndex = start;

        for (let i = start; i <= n - remaining; i++) {
            const batteryJoltage = Number(bank[i]);
            if (batteryJoltage > maxDigit) {
                maxDigit = batteryJoltage;
                maxIndex = i;
            }
        }

        result.push(maxDigit);
        start = maxIndex + 1;
    }

    return Number(result.join(''));
}


function main() {
    const resultPart1 = calculateTotalOutputJoltage(2);
    console.log(`Part 1: Total Output Joltage: ${resultPart1}`);

    const resultPart2 = calculateTotalOutputJoltage(12);
    console.log(`Part 2: Total Output Joltage: ${resultPart2}`);
}

main();