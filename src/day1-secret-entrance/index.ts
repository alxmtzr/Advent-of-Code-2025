import { readInput } from '../utils/InputReader.js';

const START_POSITION: number = 50;

type Direction = 'L' | 'R';

interface Rotation {
    direction: Direction;
    steps: number;
}

function parseInput(lines: string[]): Rotation[] {
  return lines
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      const dir = line[0] as Direction;
      const steps = parseInt(line.slice(1), 10);
      if (dir !== 'L' && dir !== 'R') {
        throw new Error(`Invalid row: "${line}"`);
      }
      if (Number.isNaN(steps)) {
        throw new Error(`Invalid number in line: "${line}"`);
      }
      return { direction: dir, steps };
    });
}

function passwordPart1(rotations: Rotation[], start: number = START_POSITION): number {
  let position: number = start;
  let countZeros: number = 0;

  for (const { direction, steps } of rotations) {
    if (direction === 'R') {
      position = (position + steps) % 100;
    } else {
      position = (position - (steps % 100) + 100) % 100;
    }

    if (position === 0) {
      countZeros++;
    }
  }

  return countZeros;
}

function zerosDuringRotation(position: number, steps: number, direction: Direction): number {
  let k0: number;
  if (direction === 'R') {
    k0 = (100 - position) % 100;
  } else {
    k0 = position % 100;
  }
  if (k0 === 0) k0 = 100;

  if (steps < k0) return 0;
  return 1 + Math.floor((steps - k0) / 100);
}

function passwordPart2(rotations: Rotation[], start: number = START_POSITION): number {
  let position: number = start;
  let countZeros: number = 0;

  for (const { direction, steps } of rotations) {
    countZeros += zerosDuringRotation(position, steps, direction);

    if (direction === 'R') {
      position = (position + steps) % 100;
    } else {
      position = (position - (steps % 100) + 100) % 100;
    }
  }

  return countZeros;
}

function main() {
  const lines: string[] = readInput.lines(1);
  const rotations = parseInput(lines);

  const part1 = passwordPart1(rotations);
  const part2 = passwordPart2(rotations);

  console.log(`Part 1 (End == 0): ${part1}`);
  console.log(`Part 2 (all clicks == 0): ${part2}`);
}

main();
