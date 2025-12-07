import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Simple input reader for Advent of Code puzzles
 * Reads .txt files from day folders
 */
export class InputReader {
  private filePath: string;

  constructor(dayFolder: string, fileName: string = 'input.txt') {
    this.filePath = join(dayFolder, 'resources', fileName);
  }

  readRaw(): string {
    try {
      return readFileSync(this.filePath, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to read input file: ${this.filePath}. ${error}`);
    }
  }

  readLines(keepEmpty: boolean = false): string[] {
    const content = this.readRaw().trim();
    const lines = content.split('\n').map(line => line.trim());
    
    return keepEmpty ? lines : lines.filter(line => line.length > 0);
  }

  readCommaSeparated(): string[] {
    const content = this.readRaw().trim();
    return content.split(',').map(item => item.trim()).filter(item => item.length > 0);
  }

  /**
   * Helper method to create an InputReader for a specific day
   */
  static forDay(dayNumber: number, fileName: string = 'input.txt'): InputReader {
    const possibleFolders = [
      `src/day${dayNumber}`,
      `src/day${dayNumber.toString().padStart(2, '0')}`,
    ];

    if (dayNumber === 1) {
      possibleFolders.push('src/day1-secret-entrance');
    }
    if (dayNumber === 2) {
      possibleFolders.push('src/day2-gift-shop');
    }
    if (dayNumber === 3) {
      possibleFolders.push('src/day3-lobby');
    }
    if (dayNumber === 4) {
      possibleFolders.push('src/day4-printing-department');
    }
    if (dayNumber === 5) {
      possibleFolders.push('src/day5-cafeteria');
    }

    for (const folder of possibleFolders) {
      try {
        const reader = new InputReader(folder, fileName);
        reader.readRaw();
        return reader;
      } catch {
        continue;
      }
    }

    throw new Error(`Could not find input file for day ${dayNumber}. Tried folders: ${possibleFolders.join(', ')}`);
  }
}

export const readInput = {
  lines: (dayNumber: number, keepEmpty: boolean = false) =>
    InputReader.forDay(dayNumber).readLines(keepEmpty),
  raw: (dayNumber: number) => InputReader.forDay(dayNumber).readRaw(),
  commaSeparated: (dayNumber: number) => InputReader.forDay(dayNumber).readCommaSeparated(),
};