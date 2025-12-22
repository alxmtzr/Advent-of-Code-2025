import { InputReader } from "../utils/InputReader.js";
import { CircuitManager } from "./CircuitManager.js";

interface Point { // = JunctionBox
    x: number,
    y: number,
    z: number
}

interface Edge {
    a: number, // index of point array
    b: number, // index of point array
    dist: number
}

function getJunctionBoxes(): Point[] {
    const reader = InputReader.forPath('src/day8-playground');
    const lines = reader.readLines();
    return lines.map(line => {
        const [x, y, z] = line.split(',').map(Number);
        return { x: x!, y: y!, z: z! };
    });
}

function part1(): number {
    const points = getJunctionBoxes();
    const edges: Edge[] = calculateDistances(points);
    edges.sort((a, b) => a.dist - b.dist); // sort ascending dist
    
    const circuitManager = new CircuitManager(points.length);
    for (let i = 0; i < 1000 && i < edges.length; i++) {
        circuitManager.connect(edges[i]!.a, edges[i]!.b);
    }

    // count size of circuits
    const circuitSizes = new Map<number, number>();
    for (let i = 0; i < points.length; i++) {
        const root = circuitManager.find(i);
        circuitSizes.set(root, (circuitSizes.get(root) ?? 0) + 1);
    }

    // three largest circuits
    const sizes = Array.from(circuitSizes.values()).sort((a, b) => b - a);
    return sizes[0]! * sizes[1]! * sizes[2]!;
}

function calculateDistances(points: Point[]): Edge[] {
    let edges = [];
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i]!.x - points[j]!.x;
            const dy = points[i]!.y - points[j]!.y;
            const dz = points[i]!.z - points[j]!.z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

            edges.push({
                a: i,
                b: j,
                dist: dist
            });
        }
    }
    return edges;
}

function part2(): number {
    const points = getJunctionBoxes();
    const edges = calculateDistances(points);
    edges.sort((a, b) => a.dist - b.dist);

    const circuitManager = new CircuitManager(points.length);

    let lastEdge: Edge | null = null;

    for (const edge of edges) {
        const merged = circuitManager.connect(edge.a, edge.b);
        if (merged) lastEdge = edge; // store last edge which connects points

        // check if all points are connected
        if (circuitManager.size[circuitManager.find(edge.a)] === points.length) {
            break;
        }
    }

    return points[lastEdge!.a]!.x * points[lastEdge!.b]!.x;
}


function main() {
    const resultPart1 = part1();
    console.log(`Part 1: Sizes of three largest curcuits multiplied together: ${resultPart1}`);

    const resultPart2 = part2();
    console.log(`Part 2: X coordinates of the last two junction boxes you need to connect multiplied together: ${resultPart2}`);
}

main();