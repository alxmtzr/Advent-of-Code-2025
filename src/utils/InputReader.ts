import { readFileSync } from 'fs';
import { join } from 'path';

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

  static forPath(folderPath: string, fileName: string = 'input.txt'): InputReader {
    return new InputReader(folderPath, fileName);
  }
}