export class CircuitManager {
    parent: number[];
    size: number[];

    constructor(n: number) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = Array(n).fill(1);
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]!);
        }
        return this.parent[x]!;
    }

    connect(a: number, b: number): boolean {
        const rootA = this.find(a);
        const rootB = this.find(b);

        if (rootA === rootB) return false; // same circuit

        if (this.size[rootA]! < this.size[rootB]!) {
            this.parent[rootA] = rootB;
            this.size[rootB]! += this.size[rootA]!;
        } else {
            this.parent[rootB] = rootA;
            this.size[rootA]! += this.size[rootB]!;
        }
        return true;
    }
}